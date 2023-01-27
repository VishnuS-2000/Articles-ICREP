import NavBar from "../components/navbar"
import Footer from "../components/footer"

import { useState } from "react"
import useNotification from "../hooks/useNotification"
import { Notification } from "../components/Notification"

import {FormControl,FormLabel,Input,InputGroup,InputLeftAddon,Textarea,FormErrorMessage} from "@chakra-ui/react"
import axios from "../axios"
import moment from "moment"

import Link from "next/link"
export default function Contribute(){

    const [manuscript,setManuscript]=useState({
        name:'',
        phone:'',
        email:'',
        bio:'',
        
      })
  
      const fields = ['name','phone','email','bio']
      const [errorFields,setErrorFields]=useState([false,false,false,false])
    
    
      const [file,setFile]=useState(null)
      const [accepted,setAccepted]=useState(false)
      const [imageAccepted,setImageAccepted]=useState(false)
      const [image,setImage]=useState(null)
    
      const {notification,setNotification}=useNotification()
      
  
      const validateFields=()=>{
        var valid=true
        fields.map((field,index)=>{
            if(!manuscript[field]){
              setErrorFields((prev)=>{
                prev[index]=true;
                valid=false
                return prev;
              })
            }
        })
        
        return valid
  
      }
    
    
      const handleChange=({target})=>{
          
        setAccepted(false)
        if(target.files.length){
            const raw=target.files[0]
    
            if(raw.type== 'application/msword' || raw.type=='application/vnd.openxmlformats-officedocument.wordprocessingml.document'||raw.type=='application/vnd.oasis.opendocument.text'){
    
              const url=URL.createObjectURL(target.files[0])
              setFile({
                  raw:raw,
                  url:url
              })
              setAccepted(true)
    
              // console.log(url)
            }
    
          }
  
  
      }


      const handleImageUpload =({target})=>{
        setImageAccepted(false)

        if(target.files.length){
            const raw=target.files[0]
          

            if(raw.type== 'image/png' || raw.type=='image/jpg'||raw.type=='image/jpeg'){
    
              const url=URL.createObjectURL(target.files[0])
              setImage({
                  raw:raw,
                  url:url
              })
              setImageAccepted(true)
    
              // console.log(url)
            }
    
          }
       
      }
    


      const uploadDocument=async()=>{
    
        try{
    
          const response=await axios.post(`/app/contribution/image/upload`,{file:file.raw},{
            headers:{
                "Content-Type": "multipart/form-data",
            }
          
        })
    
        
        if(response.status==200){
  
        return response?.data
        
        }
  
        }
    
        catch(err){
            
            setNotification({status:'error',message:'Document Upload Failed!',createdAt:moment()})
        }
    
        }


        const uploadImage=async()=>{
    
          try{
      
            const response=await axios.post(`/app/contribution/image/upload`,{file:image.raw},{
              headers:{
                  "Content-Type": "multipart/form-data",
              }
            
          })
      
          
          
          if(response.status==200){
    
          return response?.data
          
          }
    
          }
      
          catch(err){
              
              setNotification({status:'error',message:'Document Upload Failed!',createdAt:moment()})
          }
      
          }


    
     

    
      const handleSubmit=async(e)=>{
          e.preventDefault()
        
          try{
            
            if(!validateFields()){
              return 
          }
  
          if(!file?.raw){
            return 
          }

  
        
            var documentId={},imageId={}
          
            
            documentId=await uploadDocument()
            imageId=await uploadImage()
            // console.log(documentId,imageId)
            
            const response=await axios.post(`/app/contribution`,{ 
              name:manuscript.name,
              contact:'+91 '+manuscript.phone,
              email:manuscript.email,
              bio:manuscript.bio,
              file:documentId?.id,
              image:imageId?.id
            })
  
            if(response.status==204){
              setNotification({status:'error',message:'Contribution Already Exists',createdAt:moment()})
            }
  
            if(response?.status==200){
              setNotification({status:'success',message:'Successfully Contributed',createdAt:moment()})
            }
  
            setManuscript({
              name:'',
              phone:'',
              email:'',
              bio:'',
              
            })
  
            setAccepted(false)
            setFile(null)
            setImage(null)
        
    
        }
          
    
        catch(err){
          console.log(err)
          setNotification({status:'error',message:'Try Again Later',createdAt:moment()})
        }
    
      }
    
   

    return <>
    <NavBar/>
        <div className="flex flex-col min-h-screen  w-full pb-12  ">

        <div className="flex desktop:px-20 left-[100px] items-center bg-gradient-to-r space-x-8 from-primary to-black p-5  w-full ">
            
            
            
            <Link href={`/`}>
      
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#fff" className="w-6 h-6 tablet:h-7 tablet:w-7 ">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
</svg>



</Link>

            
<h1 className="text-base tablet:text-lg  font-[500] text-white ">Contribute</h1>

         
            </div>
      <div className="flex flex-col py-5 px-5 flex-col tablet:px-12 desktop:px-20 space-y-5  ">
            
    

    
      {notification?.createdAt&&<Notification options={notification}/>}
  
  
      <form onSubmit={handleSubmit}>
        <div className=''>
          <h1 className='text-sm tablet:text-base desktop:text-lg font-[600]'>Submit Your Manuscript</h1>
          <p className='text-sm tablet:text-sm  text-slate-600'>Please fill your correct details.</p>
          </div>
    

          <Input id='image-upload-button' type='file' placeholder='upload' className='hidden' onChange={handleImageUpload} />
    <label htmlFor="image-upload-button">
        
          <div  className="relative w-[100px] ">
    {image?.url?<img src={image?.url} className="w-[60px] h-[60px] rounded-full"/>:<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12">
  <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
</svg>}

    <button type="button" className="">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 absolute right-[40px] top-[30px] ">
  <path d="M12 9a3.75 3.75 0 100 7.5A3.75 3.75 0 0012 9z" />
  <path fillRule="evenodd" d="M9.344 3.071a49.52 49.52 0 015.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 01-3 3h-15a3 3 0 01-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 001.11-.71l.822-1.315a2.942 2.942 0 012.332-1.39zM6.75 12.75a5.25 5.25 0 1110.5 0 5.25 5.25 0 01-10.5 0zm12-1.5a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
</svg>
    </button>
    </div>

    </label>


  <div className="py-5 tablet:py-8 desktop:py-5 space-y-3 tablet:space-y-5 desktop:space-y-4">
      <FormControl isInvalid={errorFields[0]}>
  
      <h1 className="text-sm tablet:text-base font-[500] mb-2">Full Name</h1>
        <Input  className="text-sm   tablet:text-sm border border-slate-400"   value={manuscript.name} onChange={(e)=>{setManuscript({...manuscript,name:e.target.value}); if(errorFields[0]&&e.target.value){setErrorFields((prev)=>{prev[0]=false; return prev})}}}/>
      {errorFields[0]&&<FormErrorMessage>Name of Contributor required</FormErrorMessage>}
      </FormControl>
  
  
  
      <FormControl isInvalid={errorFields[1]}>
  
      <h1 className="text-sm tablet:text-base font-[500] mb-2">Phone Number(+91 )</h1>
        <InputGroup>
        <Input type='tel'  className="text-sm   tablet:text-sm border border-slate-400"  value={manuscript.phone} onChange={(e)=>{setManuscript({...manuscript,phone:e.target.value}); if(errorFields[1]&&e.target.value){setErrorFields((prev)=>{prev[1]=false; return prev})}}}/>
        </InputGroup>
    
        {errorFields[1]&&<FormErrorMessage>Phone Number required</FormErrorMessage>}
  
    </FormControl>
  
    <FormControl isInvalid={errorFields[2]}>
    <h1 className="text-sm tablet:text-base font-[500] mb-2">Email</h1>
        <InputGroup>

        <Input type='email' className="text-sm   tablet:text-sm border border-slate-400"     value={manuscript.email} onChange={(e)=>{setManuscript({...manuscript,email:e.target.value}); if(errorFields[2]&&e.target.value){setErrorFields((prev)=>{prev[2]=false; return prev})}}}/>
        </InputGroup>
  
        {errorFields[2]&&<FormErrorMessage>Email required</FormErrorMessage>}
  
    </FormControl>
  
  
  
    <FormControl isInvalid={errorFields[3]}>

    <h1 className="text-sm tablet:text-base font-[500] mb-2">Bio</h1>
        <Textarea  className="text-sm   tablet:text-sm border border-slate-400" resize="none"   value={manuscript.bio} onChange={(e)=>{setManuscript({...manuscript,bio:e.target.value}); if(errorFields[3]&&e.target.value){setErrorFields((prev)=>{prev[3]=false; return prev})}}}/>
        {errorFields[3]&&<FormErrorMessage>Bio required</FormErrorMessage>}
  
    </FormControl>
  
  
  
    <FormControl>
    <h1 className="text-sm tablet:text-base font-[500] mb-2">File</h1>
        <Input type='file' placeholder='document'  required={true} onChange={handleChange} />
        {!accepted&&<p className='text-red-600 font-[500] text-sm'>File not accepted,Try Again</p>}
        <p className='text-slate-600 text-sm'>Accepted File types : .doc,.docx,.odt</p>
        </FormControl>
      
  
        </div>
      
        {accepted?<button type='submit' color="" variant='solid' className='bg-primary  px-2 py-2 text-sm text-white rounded-md'>Submit</button>:<button type='submit' className="px-2 rounded-md py-2 text-gray-200"  disabled={true} variant='solid'>Submit</button>}

     
        </form>
  
</div>


        </div>
<Footer/>
    </>
}
      