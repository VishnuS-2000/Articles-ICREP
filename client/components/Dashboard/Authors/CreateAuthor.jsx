import {useState,useCallback} from "react"

import { FormControl,FormLabel,Input,Textarea,Avatar,Select, FormErrorMessage,useDisclosure, Spinner } from "@chakra-ui/react"
import useAxiosPrivate from "../../../hooks/useAxiosPrivate"


import moment from "moment"
import useNotification from "../../../hooks/useNotification"
import Image from "next/image"

export const CreateAuthor=({toggler})=>{


    const { isOpen, onOpen, onClose } = useDisclosure()

    const [loading,setLoading]=useState(false)


    const axiosPrivate=useAxiosPrivate()
    
    const [author,setAuthor]=useState({
        firstName:'',
        lastName:'',
        email:null,
        designation:'faculty',
        bio:null,
        specializations:null,
        image:null
    })

    const fields=['firstName', 'lastName', 'email', 'designation','bio']
    const [errorFields,setErrorFields]=useState([false,false,false,false,false])

   const {Notification,setNotification}=useNotification()

    const acceptedFileTypes=['image/png','image/jpg','image/jpeg']

    const handleChange=({target})=>{
        if(acceptedFileTypes.includes(target.files[0]?.type)){
            const raw=target.files[0]
            const url=URL.createObjectURL(target?.files[0])
            setAuthor({...author,image:{raw,url}})
        }
        else{

            setNotification({message:'Invalid File Type',status:'error',createdAt:moment()})
        }
    }

    const validateFields=()=>{
        let valid=true
        fields.map((field,index)=>{
            if(!author[field]){
                valid=false
                setErrorFields((prev)=>{
                        prev[index]=true
                        
                        return prev
                })
                setNotification({message:`Missing Fields`,status:'error',createdAt:moment()})
            }
        })
        return valid
    }


    const handleSubmit = async(e)=>{
        e.preventDefault()
        try{
            
            // Checking Error Fields

        if(validateFields()){
        

        setLoading(true)

        let fileName=null
        if(author?.image?.raw){
        const imageResult=await axiosPrivate.post('/author/image',{
            file:author?.image?.raw
        },{
            headers:{'Content-Type':'multipart/form-data'}
        })
        if(imageResult?.status==200){
            fileName=imageResult?.data?.result
        }
        else{
            setNotification({message:`Missing Fields`,status:'error',createdAt:moment()})
            return
        }
            }

            const result=await axiosPrivate.post('/author',{
                name:author?.firstName+" "+author?.lastName,
                email:author?.email,
                designation:author?.designation,
                bio:author?.bio,
                specialization:author?.specializations,
                photo:fileName
            })


            if(result?.status==201){
                setNotification({message:'Author Created',status:'success',createdAt:moment()}) 
                toggler(0)
                setLoading(false)

            }
        
        }
    }catch(err){
        console.log(err)
        setLoading(false)
        if(err?.response?.status==422){
            setNotification({message:'Constraints Violated',status:'error',createdAt:moment()})
        }
        else{
            setNotification({message:'Try again later',status:'error',createdAt:moment()})
        }      
        
    }
    }




return <div className="flex flex-col py-4 space-y-3 tablet:space-y-6 desktop:space-y-3 ">
    
    


    <form className="flex flex-col relative  h-full space-y-4  tablet:space-y-12 w-full desktop:w-[650px] desktop:space-y-6" onSubmit={handleSubmit} >

    <Input id='upload-button' type='file' placeholder='upload' className='hidden' onChange={handleChange} />
    <label htmlFor="upload-button">

    <div  className="relative w-[100px]">
    {author?.image?.url?<Image alt="author" src={author?.image?.url} className="w-[60px] h-[60px] rounded-full"/>:<Avatar name={`${author?.firstName} ${author?.lastName}`} size="md" />}
    <button type="button" className="">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 absolute right-[40px] top-[30px] ">
  <path d="M12 9a3.75 3.75 0 100 7.5A3.75 3.75 0 0012 9z" />
  <path fillRule="evenodd" d="M9.344 3.071a49.52 49.52 0 015.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 01-3 3h-15a3 3 0 01-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 001.11-.71l.822-1.315a2.942 2.942 0 012.332-1.39zM6.75 12.75a5.25 5.25 0 1110.5 0 5.25 5.25 0 01-10.5 0zm12-1.5a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
</svg>
    </button>
    </div>

    </label>
   


        <div className="flex   space-x-5 w-full">
        <FormControl  isInvalid={errorFields[0]}>
            <h1 className="text-secondary text-sm font-[600]">First Name <span className="text-red-500">*</span></h1>
       
            <Input variant="filled" type="text" value={author?.firstName} onChange={({target})=>{setAuthor({...author,firstName:target.value}); if(target.value && errorFields[0]){setErrorFields((prev)=>{prev[0]=false; return prev})} }}/>

            {errorFields[0]&&<FormErrorMessage>First Name Required</FormErrorMessage>}

        </FormControl>

        <FormControl  isInvalid={errorFields[1]}>
        <h1 className="text-secondary text-sm font-[600]">Last Name <span className="text-red-500">*</span></h1>
            <Input variant="filled" type="text" value={author?.lastName} onChange={({target})=>{setAuthor({...author,lastName:target.value}); if(target.value && errorFields[1] ){setErrorFields((prev)=>{prev[1]=false; return prev})}}}/>
            
            {errorFields[1]&&<FormErrorMessage>Last Name Required</FormErrorMessage>}
            </FormControl>

            

    </div>
    <div>
    <FormControl  isInvalid={errorFields[2]}>
        <h1 className="text-secondary text-sm font-[600]">Email  <span className="text-red-500">*</span></h1>
            <Input variant="filled" type="email" value={author?.email} onChange={({target})=>{setAuthor({...author,email:target.value}); if(target.value && errorFields[2]){setErrorFields((prev)=>{prev[2]=false; return prev})} } }/>
            {errorFields[2]&&<FormErrorMessage>A Valid Email is required</FormErrorMessage>}

            </FormControl>

            </div>

    <FormControl  >
    <h1 className="text-secondary text-sm font-[600]">Designation  <span className="text-red-500">*</span></h1>
        <Select variant="filled" className="text-sm" value={author?.designation} onChange={({target})=>{setAuthor({...author,designation:target.value}); if(target.value && errorFields[3]){setErrorFields((prev)=>{prev[3]=false; return prev}) }} }>

            <option value={'faculty'} className="text-sm">Faculty</option>
            <option value={'student'} className="text-sm">Student</option>
            <option value={'others'} className="text-sm">Others</option>
        </Select>
        {errorFields[3]&&<FormErrorMessage>No Designation selected</FormErrorMessage>}
    </FormControl>
    <FormControl  isInvalid={errorFields[4]}>
    <h1 className="text-secondary text-sm font-[600]">Bio  <span className="text-red-500">*</span></h1>
    <Textarea variant="filled" resize="none" rows={6} value={author?.bio} onChange={({target})=>{setAuthor({...author,bio:target.value}); if(target.value && errorFields[4]){setErrorFields((prev)=>{prev[4]=false; return prev}) }  }} />
    {errorFields[4]&&<FormErrorMessage>Bio is required</FormErrorMessage>}
    </FormControl>

    <FormControl>
    <h1 className="text-secondary text-sm font-[600]">Specializations  </h1>
            <Input variant="filled" value={author?.specializations} onChange={({target})=>{setAuthor({...author,specializations:target.value})}}/>
    </FormControl>

    <button disabled={errorFields.includes(true)} type="submit" className={`p-2  my-2 rounded-md w-[120px]  relative  text-sm flex justify-center font-[500] drop-shadow cursor-pointer drop-shadow items-center bg-gradient-to-r from-primary to-indigo-800 text-white `} >
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

    
    </form>


    
</div>
}