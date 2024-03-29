import {useState,useContext} from "react"
import { AuthorContext } from "../CurrentProvider"

import { FormControl,FormLabel,Input,Textarea,Avatar,Select, FormHelperText, FormErrorMessage,InputRightElement,InputGroup } from "@chakra-ui/react"
import { useCurrent } from "../useCurrent"
import useAxiosPrivate from "../../../hooks/useAxiosPrivate"
import { Spinner } from "@chakra-ui/react"

import useNotification from "../../../hooks/useNotification"
import moment from "moment"
import Image from "next/image"

export const EditAuthor=({toggler})=>{
    const {current}=useCurrent()
    const axiosPrivate=useAxiosPrivate()

    const [author,setAuthor]=useState({
        firstName:current?.author.name.split(' ')[0],
        lastName:current?.author.name.split(' ')[1],
        email:current?.author.email,
        designation:current?.author.designation,
        bio:current?.author?.bio,
        specialization:current?.author.specialization,
        image:current?.author.photo?{url:`${process.env.NEXT_PUBLIC_BACKEND_IMAGE_URL}/${current?.author.photo}`}:null
    })

    const [errorFields,setErrorFields]=useState([false,false,false,false,false])
    const [changes,setChanges]=useState({
        firstName:null,
        lastName:null,
        email:null,
        designation:null,
        bio:null,
        specialization:null,
        image:{}      
    })

    const {setNotification}=useNotification()
    
    const [loading,setLoading]=useState(false)


    const acceptedFileTypes=['image/png','image/jpg','image/jpeg']

    const handleChange=({target})=>{
        if(acceptedFileTypes.includes(target.files[0]?.type)){
            const raw=target.files[0]
            const url=URL.createObjectURL(target?.files[0])
            setChanges({...changes,image:{raw,url}})
        }   
        else{
            setNotification({message:'Invalid File type',createdAt:moment(),status:'error'})
        }
    }


    const handleSubmit = async(e)=>{
        e.preventDefault()
        setLoading(true)
        try{

            let fileName=null
            
            if(author?.image!==current?.author.photo){

            const imageResult=await axiosPrivate.post('/author/image',{
                file:author?.image?.raw
            },{
                headers:{'Content-Type':'multipart/form-data'}
            })
            if(imageResult?.status==200){
                fileName=imageResult?.data?.result
            }
            else{
                setNotification({message:'File upload Failed',createdAt:moment(),status:'error'})
                return
            }
                }


            const imageURL=author?.image?.url.replace('${process.env.NEXT_PUBLIC_BACKEND_IMAGE_URL}/','')
            const response=await axiosPrivate.put(`/author/${current?.author?.id}`,{
                name:author.firstName+' '+author.lastName,
                email:author.email,
                designation:author.designation,
                bio:author.bio,
                specialization:author.specialization,
                photo:fileName?fileName:imageURL
            })
            if(response?.status==200){
                setLoading(false)
                setNotification({message:'Author Updated',createdAt:moment(),status:'success'})
                toggler(0)
            }

        }   
        catch(err){ 
            setLoading(false)
            setNotification({message:'Try Again Later',createdAt:moment(),status:'error'})

            console.error(err)
            
        }
    }




return <div className="flex flex-col py-4 space-y-3  tablet:space-y-6 desktop:space-y-3 ">


    <form className="flex flex-col  h-full space-y-4  tablet:space-y-12 w-full desktop:w-[650px] desktop:space-y-6" onSubmit={handleSubmit} >

    <Input id='upload-button' type='file' placeholder='upload' className='hidden' onChange={handleChange} />
    <label htmlFor="upload-button">

    <div  className="relative w-[100px] flex">

    {changes?.image?<Image  src={changes?.image} alt="author" width={60} height={60} className="w-[60px] h-[60px] rounded-full"/>:author?.image.url?<Image src={author?.image?.url} width={60} height={60} alt="author" className="w-[60px] h-[60px] rounded-full"/>:<Avatar name={`${author?.firstName} ${author?.lastName}`} size="md" />}

    <button type="button" className="">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 absolute right-[40px] top-[30px] ">
  <path d="M12 9a3.75 3.75 0 100 7.5A3.75 3.75 0 0012 9z" />
  <path fillRule="evenodd" d="M9.344 3.071a49.52 49.52 0 015.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 01-3 3h-15a3 3 0 01-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 001.11-.71l.822-1.315a2.942 2.942 0 012.332-1.39zM6.75 12.75a5.25 5.25 0 1110.5 0 5.25 5.25 0 01-10.5 0zm12-1.5a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
</svg>
    </button>

    </div>

    </label>

        
    {changes?.image?.raw&&<div className="flex absolute left-[120px] items-center">
                <button type="button" className="text-green-600 p-1" onClick={()=>{setAuthor({...author,image:changes?.image}); setChanges({...changes,image:null})}}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
</svg>
                </button>
                <button type="button" className="text-red-600" onClick={()=>{setChanges({...changes,image:null})}}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg>

                </button>
            </div>}

   


        <div className="flex   space-x-5 w-full">
        <FormControl isRequired="true" isInvalid={errorFields[0]}>
        <h1 className="text-secondary text-sm font-[600]">First Name <span className="text-red-500">*</span></h1>
       <InputGroup>
            <Input variant="filled" type="text" value={changes?.firstName?changes?.firstName:author?.firstName} disabled={changes?.firstName?false:true}  onChange={({target})=>setChanges({...changes,firstName:target.value})}/>
            
            <InputRightElement>
            {changes?.firstName?<div className="flex mr-3 items-center">
                <button type="button" className="text-green-600 p-1" onClick={()=>{setAuthor({...author,firstName:changes?.firstName}); setChanges({...changes,firstName:null})}}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
</svg>
                </button>
                <button type="button" className="text-red-600" onClick={()=>{setChanges({...changes,firstName:null})}}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg>

                </button>
            </div>:<button onClick={()=>{setChanges({...changes,firstName:author?.firstName})}}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
    </svg>

            </button>}
            </InputRightElement>
            </InputGroup>
            {errorFields[0]&&<FormErrorMessage>First Name Required</FormErrorMessage>}

        </FormControl>

        <FormControl isRequired="true" isInvalid={errorFields[1]}>
        <h1 className="text-secondary text-sm font-[600]">Last Name <span className="text-red-500">*</span></h1>
        <InputGroup>
            <Input variant="filled" type="text" value={changes?.lastName?changes?.lastName:author?.lastName} disabled={changes?.lastName?false:true}  onChange={({target})=>setChanges({...changes,lastName:target.value})}/>
            
            <InputRightElement>
            {changes?.lastName?<div className="flex mr-3 items-center">
                <button type="button" className="text-green-600 p-1" onClick={()=>{setAuthor({...author,lastName:changes?.lastName}); setChanges({...changes,lastName:null})}}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
</svg>
                </button>
                <button type="button" className="text-red-600" onClick={()=>{setChanges({...changes,lastName:null})}}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg>

                </button>
            </div>:<button type="button" onClick={()=>{setChanges({...changes,lastName:author?.lastName})}}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
    </svg>

            </button>
}
            </InputRightElement>
            </InputGroup>
            
            {errorFields[1]&&<FormErrorMessage>Last Name Required</FormErrorMessage>}
            </FormControl>

            

    </div>
    <div>
    <FormControl isRequired="true" isInvalid={errorFields[2]}>
    <h1 className="text-secondary text-sm font-[600]">Email<span className="text-red-500">*</span></h1>
            
            <InputGroup>
            <Input variant="filled" type="text" value={changes?.email?changes?.email:author?.email} disabled={changes?.email?false:true}  onChange={({target})=>setChanges({...changes,email:target.value})}/>
            
            <InputRightElement>
            {changes?.email?<div className="flex mr-3 items-center">
                <button type="button" className="text-green-600 p-1" onClick={()=>{setAuthor({...author,email:changes?.email}); setChanges({...changes,email:null})}}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
</svg>
                </button>
                <button type="button" className="text-red-600" onClick={()=>{setChanges({...changes,email:null})}}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg>

                </button>
            </div>:<button type="button" onClick={()=>{setChanges({...changes,email:author?.email})}}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
    </svg>

            </button>}
            </InputRightElement>
            </InputGroup>
            
            {errorFields[2]&&<FormErrorMessage>A Valid Email is required</FormErrorMessage>}

            </FormControl>

            </div>

    <FormControl isRequired="true" >
    <h1 className="text-secondary text-sm font-[600]">Designation <span className="text-red-500">*</span></h1>
        <Select variant="filled" value={author?.designation} onChange={({target})=>{setAuthor({...author,designation:target.value})}} >
            <option disabled></option>
            <option value={'faculty'} >Faculty</option>
            <option value={'student'} >Student</option>
            <option value={'others'}>Others</option>

        </Select>
        {errorFields[3]&&<FormErrorMessage>No Designation selected</FormErrorMessage>}
    </FormControl>
    <FormControl isRequired="true" isInvalid={errorFields[4]}>
    <h1 className="text-secondary text-sm font-[600]">Bio <span className="text-red-500">*</span></h1>

    <InputGroup>
            <Textarea variant="filled" type="text" resize="none" rows={8} value={changes?.bio?changes?.bio:author?.bio} disabled={changes?.bio?false:true}  onChange={({target})=>setChanges({...changes,bio:target.value})}/>
            
            <InputRightElement >
            {changes?.bio?<div className="flex mr-3 items-center">
                <button type="button" className="text-green-600 p-1" onClick={()=>{setAuthor({...author,bio:changes?.bio}); setChanges({...changes,bio:null})}}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
</svg>
                </button>
                <button type="button" className="text-red-600" onClick={()=>{setChanges({...changes,bio:null})}}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg>

                </button>
            </div>:<button type="button" onClick={()=>{setChanges({...changes,bio:author?.bio})}}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
    </svg>

            </button>}
            </InputRightElement>
            </InputGroup>
    {errorFields[4]&&<FormErrorMessage>Bio is required</FormErrorMessage>}
    </FormControl>

    <FormControl>
    <h1 className="text-secondary text-sm font-[600]">Specializations</h1>
            <Input variant="filled" value={author?.specialization} onChange={({target})=>{setAuthor({...author,specialization:target.value})}}/>
    </FormControl>
   

        <button  type="submit" className={`p-2  my-2 rounded-md w-[120px]  relative  text-sm flex justify-center font-[500] drop-shadow cursor-pointer drop-shadow items-center bg-gradient-to-r from-primary to-indigo-800 text-white `} >
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