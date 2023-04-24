import NavBar from "../components/navbar"
import Footer from "../components/footer"

import { useState } from "react"
import useNotification from "../hooks/useNotification"
import { Notification } from "../components/Notification"

import {FormControl,FormLabel,Input,InputGroup,InputLeftAddon,Textarea,FormErrorMessage,Select} from "@chakra-ui/react"
import axios from "../axios"
import moment from "moment"

import Link from "next/link"
import { useForm } from "react-hook-form"
export default function Contribute(){

    const [manuscript,setManuscript]=useState({
        name:'',
        phone:'',
        email:'',
        bio:'',
        
      })
  
      const fields = ['name','phone','email','bio']



      const {register,handleSubmit,formState:{errors}}=useForm()
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


    
     

    
      const contributeManuscript=async(e)=>{
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
    

      console.log(errors)
 
      



    return <>
    <NavBar/>
        <div className="flex flex-col min-h-screen  w-full  bg-slate-50 ">

        <div className="flex desktop:px-20 left-[100px] items-center bg-gradient-to-r space-x-8 from-primary to-black p-5  w-full ">
            
            
            
            <Link href={`/`}>
      
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#fff" className="w-6 h-6 tablet:h-7 tablet:w-7 ">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
</svg>



</Link>

            
<h1 className="text-base tablet:text-lg  font-[500] text-white ">Contribute</h1>

         
            </div>

      <div className="flex flex-col justify-center h-screen ">
      
      <div className="flex flex-col py-8 px-5 flex-col tablet:px-12 desktop:px-16 space-y-5 bg-white rounded-md drop-shadow desktop:max-w-[40%]">
            
      
      {notification?.createdAt&&<Notification options={notification}/>}
  
  
      <form onSubmit={handleSubmit(contributeManuscript)}>
        <div className=''>
          <h1 className='text-sm tablet:text-base desktop:text-lg font-[600]'>Submit Your Manuscript</h1>
          <p className='text-sm tablet:text-sm  text-slate-600'>Please fill your correct details.</p>
          </div>
    



      <Input id='image-upload-button' type='file' placeholder='upload' className='hidden' onChange={handleImageUpload} />
    <label htmlFor="image-upload-button">
        
          <div  className="relative w-[100px] ">
    {image?.url&&<img src={image?.url} className="w-[80px] h-[80px] rounded-full"/>}

   
    </div>

    </label>


  <div className="py-5 tablet:py-8 desktop:py-5 space-y-3 tablet:space-y-5 desktop:space-y-4">
      


      <FormControl isInvalid={errors?.reference}>
      <h1 className="text-sm  font-[500] mb-2">
        Contribution Name
        <span className="ml-1 text-red-500">*</span>
      </h1>
          <Select {...register("reference",{required:true})}>
            <option disabled>Select a Reference</option>
            <option>Applications are Invited,April 19th 2023</option>
          </Select>
      </FormControl>
      
      
      
      <FormControl isInvalid={errors?.name}>
  
      <h1 className="text-sm  font-[500] mb-2">Full Name
      <span className="ml-1 text-red-500">*</span>
      </h1>
        <Input size="sm"  className="text-sm   tablet:text-sm border border-slate-400"  {...register("name",{required:true})}/>
        {errors?.name?.type=="required"&&<FormErrorMessage>Name of Contributor required</FormErrorMessage>}
      </FormControl>
  
  
  
      <FormControl isInvalid={errors?.phone}>
  
      <h1 className="text-sm font-[500] mb-2">Phone Number(+91 )
      <span className="ml-1 text-red-500">*</span>

      </h1>
        <InputGroup>
        <Input type='tel'  className="text-sm   tablet:text-sm border border-slate-400"  {...register("phone",{required:true})}/>
        </InputGroup>
    
        {errors?.phone?.type=="required"&&<FormErrorMessage>Phone Number Required</FormErrorMessage>}
  
    </FormControl>
  
    <FormControl isInvalid={errors?.email}>
    <h1 className="text-sm  font-[500] mb-2">Email
    <span className="ml-1 text-red-500">*</span>

    </h1>
        <InputGroup>

        <Input type='email' className="text-sm   tablet:text-sm border border-slate-400"  {...register("email",{required:true})}    />
        </InputGroup>
  
        {errors?.email?.type=="required"&&<FormErrorMessage>Phone Number Required</FormErrorMessage>}
  
    </FormControl>
  
  
  
  
  
  
  
  
        </div>
      
        <button type='submit' color="" variant='solid' className='bg-gradient-to-r from-primary to-black px-2 py-2 text-sm text-white rounded-md'>Submit</button>
     
        </form>

        </div>
  
</div>



        </div>
<Footer/>
    </>
}
      