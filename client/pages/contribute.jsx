import NavBar from "../components/navbar"
import Footer from "../components/footer"

import { useState,useCallback } from "react"
import useNotification from "../hooks/useNotification"
import { Notification } from "../components/Notification"

import {FormControl,FormLabel,Input,InputGroup,InputLeftAddon,Textarea,FormErrorMessage,Select} from "@chakra-ui/react"
import axios from "../axios"
import moment from "moment"

import Head from "next/head"
import { useForm } from "react-hook-form"
import { useDropzone } from "react-dropzone"
import useSWR from "swr"

import { useRouter } from "next/router"

export default function Contribute(){


  const fetcher=async(args)=>{
    const response=await axios.get(args.url,{
      headers:args.options
    })

    return response?.data?.result
  }


    const router=useRouter()

  
      const [validFile,setValidFile]=useState(true)

      const {register,handleSubmit,formState:{errors}}=useForm()
      const {data,error}=useSWR({url:'/contribution/references'},fetcher)
    
      const [file,setFile]=useState(null)
    
      const {notification,setNotification}=useNotification()
      const [stage,setStage]=useState(0)
      const [receipt,setReceipt]=useState(null)
      const acceptedFileTypes=["application/msword","application/vnd.oasis.opendocument.text","application/vnd.openxmlformats-officedocument.wordprocessingml.document"]
      
      const onDrop = useCallback(acceptedFiles => {
        if(acceptedFileTypes.includes(acceptedFiles[0]?.type)){
            setValidFile(true)
            setFile(acceptedFiles[0])
        }
        else{
            setValidFile(false)
            
        }
      }, [])

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})


      
    const resetFile=()=>setFile(null)
      
    

      const uploadFile=async({folderId,name})=>{
        try{
    
          const response=await axios.post(`/contribution/file`,{file:file,folderId:folderId,name:name},{
            headers:{
                "Content-Type": "multipart/form-data",
            }
          
        })
        
        if(response.status==200){

        return response?.data    
        }
  
        }
    
        catch(err){
            setNotification({status:'error',message:'File Upload Failed',createdAt:moment()})
        }
    
        }
        
        
    
      const submitContribution=async(data)=>{

        try{
          if(!file){
            return 
          }

          const [announcementId,folderId]=data?.reference?.split(',')
          var documentId={}
                        
            documentId=await uploadFile({folderId,name:`${data?.name}_${moment()}`})
            const response=await axios.post(`/contribution`,{ 
              reference:announcementId, 
              name:data?.name,
              contact:data?.phone,
              email:data?.email,
              bio:data?.bio,
              file:documentId?.id
            })

           
  
           
  
            if(response?.status==200){
              setReceipt({id:response?.data?.result?.id,name:response?.data?.result?.name})
              setStage(1)            }

              if(response.status==204){
                setStage(2)
              }
  
  
            setFile(null)
        
    
        }
          
    
        catch(err){
          console.log(err)
          setNotification({message:'Try Again later',status:'error',createdAt:moment()})
        }
    
      }
    

 
      



    return <>
    <Head>
      <title>Contribute</title>
    </Head>
    <NavBar/>
    {notification?.createdAt&&<Notification options={notification}/>}
        <div className="flex flex-col min-h-screen  w-full  bg-slate-50 ">

        <div className="flex  desktop:px-20 left-[100px] items-center bg-gradient-to-r space-x-8 from-primary to-black p-5  w-full ">
            
            
            
            <a onClick={()=>{router.back()}} className="cursor-pointer">
      
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#fff" className="w-6 h-6 tablet:h-7 tablet:w-7 ">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
</svg>



</a>

            
<h1 className="text-base tablet:text-lg  font-[500] text-white ">Contribute</h1>

         
            </div>

      <div className="flex flex-col desktop:py-8 h-screen ">
      
      <div className="flex flex-col py-5 desktop:py-8 w-[95%] px-8 flex-col tablet:px-12 desktop:px-16 space-y-5 bg-white rounded-md drop-shadow desktop:w-[40%] relative desktop:left-[30%] left-[2%]">
            
      
  
  
      {stage==0&&<form onSubmit={handleSubmit(submitContribution)}>
        <div className=''>
          <h1 className='text-base desktop:text-lg font-[600]'>Submit Your Manuscript</h1>
          <p className='text-sm tablet:text-base  text-slate-600'>Please fill your correct details.</p>
          </div>
    



   


  <div className="py-3 space-y-3 tablet:space-y-5 desktop:space-y-4">
      


      <FormControl isInvalid={errors?.reference}>
      <h1 className="text-sm  font-[500] mb-2">
        Reference
        <span className="ml-1 text-red-500">*</span>
      </h1>
          <Select size="sm" placeholder="Select a Reference" {...register("reference",{required:true})}>
            {data?.rows?.map((element,index)=>{
              return <option key={index} value={`${element?.id},${element?.folderId}`}>{element?.title}</option>

            })}
            </Select>

          {errors?.reference?.type=="required"&&<FormErrorMessage>Reference required</FormErrorMessage>}

      </FormControl>
      
      
      
      <FormControl isInvalid={errors?.name}>
  
      <h1 className="text-sm  font-[500] mb-2">Full Name
      <span className="ml-1 text-red-500">*</span>
      </h1>
        <Input size="sm"  className="text-sm   tablet:text-sm border border-slate-400"  {...register("name",{required:true})}/>
        {errors?.name?.type=="required"&&<FormErrorMessage>Name of Contributor required</FormErrorMessage>}
      </FormControl>
  
  
  
      <FormControl isInvalid={errors?.phone}>
  
      <h1 className="text-sm font-[500] mb-2">Phone Number
      <span className="ml-1 text-red-500">*</span>

      </h1>
        <InputGroup>
        <Input size="sm" type='tel'  className="text-sm   tablet:text-sm border border-slate-400"  {...register("phone",{required:true})}/>
        </InputGroup>
    
        {errors?.phone?.type=="required"&&<FormErrorMessage>Phone Number Required</FormErrorMessage>}
  
    </FormControl>
  
    <FormControl isInvalid={errors?.email}>
    <h1 className="text-sm  font-[500] mb-2">Email
    <span className="ml-1 text-red-500">*</span>

    </h1>
        <InputGroup>

        <Input size="sm" type='email' className="text-sm   tablet:text-sm border border-slate-400"  {...register("email",{required:true})}    />
        </InputGroup>
  
        {errors?.email?.type=="required"&&<FormErrorMessage>Email Required</FormErrorMessage>}
  
    </FormControl>

    <FormControl isInvalid={errors?.bio}>
    <h1 className="text-sm  font-[500] mb-2">Bio
    <span className="ml-1 text-red-500">*</span>

    </h1>
        <InputGroup>

        <Textarea cols={5} resize="none" variant={`outline`} size="sm" type='email' className="text-sm   tablet:text-sm "  {...register("bio",{required:true})}    />
        </InputGroup>
  
        {errors?.bio?.type=="required"&&<FormErrorMessage>Bio Required</FormErrorMessage>}
  
    </FormControl>
  
  
    <FormControl>
    <h1 className="text-secondary text-sm font-[600] my-2">File </h1>

{!file?<div {...getRootProps()} className={` px-5 text-sm flex flex-col py-5 justify-center items-center border border-2 border-dashed ${validFile?'border-blue-500':'border-red-500'}`}>
<input {...getInputProps()} />
{
isDragActive ?
<p>Drop the files here ...</p> :
<p>{`Drag 'n' drop some files here, or click to select files`}</p>

}
{!validFile&&<p className='text-red-500'>Invalid Doc File</p>}
</div>:<div className='flex  py-5 items-center justify-between'>
    <div className='flex flex-col desktop:flex-row desktop:space-x-3'>
    <a href={`${URL.createObjectURL(file)}`} download className=' flex text-gray-700 flex-col desktop:flex-row space-x-1'>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
<path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
</svg>

        <span>{file?.name}</span>
        </a>

        <h1 className=' flex'>

        <span>{(file?.size/1000000)} mb</span>
        </h1>


</div>


<button type="button" className='font-[500] text-base bg-red-100 rounded-full p-1 hover:bg-red-200' onClick={resetFile}>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
  <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
</svg>

</button>
</div>}

    </FormControl>
  
  
  
  
  
        </div>
      
        <button type='submit' color="" variant='solid' className='bg-gradient-to-r from-primary to-black px-2 py-2 text-sm text-white rounded-md'>Submit</button>
     
        </form>}


      {stage==1&&<div className="flex flex-col py-20 min-h-[60%] items-center">
      
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16 desktop:w-24 desktop:h-24 text-green-500 ">
  <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
</svg>
    

    <h1 className="text-xl desktop:text-2xl font-[400] text-green-500 py-5 ">Successfully Contributed</h1>
    <p><span className="font-[500]">Contributor Name:</span> {receipt?.name}</p>
    <p><span className="font-[500]">Contribution Id:</span> {receipt?.id}</p>


      </div>}

      {stage==2&&<div className="flex flex-col py-20 min-h-[60%] items-center">
      
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16 desktop:w-24 desktop:h-24 text-yellow-500 ">
  <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
</svg>
    

    <h1 className="text-xl desktop:text-2xl font-[400] text-yellow-500 py-5 ">Updated Contribution</h1>
    <p className="italic">File updated Successfully</p>

      </div>}


      

        </div>
  
</div>



        </div>
<Footer/>
    </>
}
      