import { useCallback,useState } from 'react'
import {useForm} from 'react-hook-form'
import { FormControl,InputGroup,Input,RadioGroup,Radio,FormErrorMessage,Textarea,Spinner} from '@chakra-ui/react'
import {useDropzone} from 'react-dropzone'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'
import axios from '../../../axios'
import useNotification from '../../../hooks/useNotification'
import moment from 'moment'

export const CreateAnnouncement=()=>{

    const [loading,setLoading]=useState(false)
    const [validFile,setValidFile]=useState(true)
    const [file,setFile]=useState(null)
    const [acceptContributions,setAcceptContributions]=useState(null)
    const [errorFields,setErrorFields]=useState([false])
    const axiosPrivate=useAxiosPrivate()
    const onDrop = useCallback(acceptedFiles => {
        if(acceptedFiles[0]?.type=="application/pdf"){
            setValidFile(true)
            setFile(acceptedFiles[0])
        }
        else{
            setValidFile(false)
            
        }
      }, [])

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
    const {register,handleSubmit,formState:{errors}}=useForm()
    const {setNotification}=useNotification()


    const saveNotice=async(data)=>{
        try{
        
        if(!acceptContributions){
            setErrorFields((prev)=>{
                prev[0]=true
                return prev
            })
            return 
        }

        setLoading(true)
        
        var fileId=null
        if(file){
            const response=await axiosPrivate.post('/announcement/document',{
                file:file                
            },{
                headers:{'Content-Type':'multipart/form-data'}
            })

            if(response.status==200){
                fileId=response.data.result
            }
            else{
                setLoading(false)
                setNotification({message:'File upload failed',status:'error',createdAt:moment()})
                return 
            }

        }
        const response=await axiosPrivate.post('/announcement',{
            title:data?.title,
            description:data?.description,
            file:fileId,
            dated:data?.dated,
            acceptContributions:acceptContributions
        })

        if(response?.status==200){
            setNotification({message:'Notice Published',createdAt:moment(),status:'success'})
        }
    
        }catch(err){
            console.log(err)        
            setNotification({message:'Try again Later',createdAt:moment(),status:'error'})
            
        }

        setLoading(false)
    


    }

    const resetFile=()=>{setFile(null)}


    
    

    return <div className='flex flex-col py-4 desktop:w-[650px]'>
        <form onSubmit={handleSubmit(saveNotice)} className='py-6 flex flex-col space-y-6'>
            
            <FormControl isInvalid={errors?.title}>
            <h1 className="text-secondary text-sm font-[600]">Title <span className="text-red-500">*</span></h1>
                <Input variant="filled" type="text" size="sm" {...register("title",{required:true})}/>
                
                {errors?.title?.type=="required"&&<FormErrorMessage>Title Required</FormErrorMessage>}
            </FormControl>

            


            <FormControl isInvalid={errors?.dated}>
            <h1 className="text-secondary text-sm font-[600]">Dated <span className="text-red-500">*</span></h1>
                <Input variant="filled" type="date" size="sm" {...register("dated",{required:true})}/>
                {errors?.dated?.type=="required"&&<FormErrorMessage>Release Date Required</FormErrorMessage>}

            </FormControl>


            <FormControl isInvalid={errors?.description}>
            <h1 className="text-secondary text-sm font-[600]">Description <span className="text-red-500">*</span></h1>
                <Textarea variant="filled" rows={10} size="sm" {...register("description",{required:true})}/>
                {errors?.description?.type=="required"&&<FormErrorMessage>Description Required</FormErrorMessage>}

            </FormControl>

            <FormControl isInvalid={errorFields[0]}>
            <h1 className="text-secondary text-sm font-[600]">Accept Contributions <span className="text-red-500">*</span></h1>
                <RadioGroup onChange={setAcceptContributions} value={acceptContributions} className='space-x-5'>
                    <Radio value={'true'}>
                         True       
                    </Radio>
                    <Radio value={'false'}>
                        False
                    </Radio>    

                </RadioGroup>
                {errors?.dated?.type=="required"&&<FormErrorMessage>Accept Contributions Required</FormErrorMessage>}
            {errorFields[0]&&<FormErrorMessage>Please select a option</FormErrorMessage>}
            </FormControl>
            
        <FormControl>
        <h1 className="text-secondary text-sm font-[600] my-2">File </h1>

            {!file?<div {...getRootProps()} className={`flex bg-slate-100 flex-col py-5 justify-center items-center border border-2 border-dashed ${validFile?'border-blue-500':'border-red-500'}`}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>{`Drag 'n' drop some files here, or click to select files`}</p>
          
      }
      {!validFile&&<p className='text-red-500'>Invalid PDF File</p>}
    </div>:<div className='flex  py-5 items-center justify-between'>
                <div className='flex flex-col desktop:flex-row desktop:space-x-3'>
                <a href={`${URL.createObjectURL(file)}`} download className=' flex flex-col desktop:flex-row space-x-1'>
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

</button>        </div>}


    <button type="submit" className={`p-2  my-5 rounded-md w-[120px]  relative  text-sm flex justify-center font-[500] drop-shadow cursor-pointer drop-shadow items-center bg-gradient-to-r from-primary to-indigo-800 text-white `} >
        {loading?
        <div className="space-x-3 flex">
            <p>Please Wait...</p>
            <Spinner color='white'/>
        </div>:
        <p>
        Save
        </p>
        }
        
    </button>

    </FormControl>

            <button type="submit"></button>

        </form>

    </div>


}