import {useState,useCallback} from "react"

import { FormControl,FormLabel,Input,Textarea,Avatar,Select, FormHelperText, FormErrorMessage } from "@chakra-ui/react"
export const CreateArticle=()=>{

    
    const [account,setAccount]=useState({
        firstName:'',
        lastName:'',
        email:null,
        designation:null,
        bio:null,
        specializations:null,
        image:null
    })

    const [errorFields,setErrorFields]=useState([false,false,false,false,false])


    const acceptedFileTypes=['image/png','image/jpg','image/jpeg']

    const handleChange=({target})=>{
        if(acceptedFileTypes.includes(target.files[0]?.type)){
            const raw=target.files[0]
            const url=URL.createObjectURL(target?.files[0])
            setAccount({...account,image:{raw,url}})
        }
        else{
            alert("Invalid file type" )
        }
    }


    const handleSubmit = (e)=>{
        e.preventDefault()
        console.log(account)
        alert('submitted')
    }




return <div className="flex flex-col py-4 space-y-3 h-full tablet:space-y-6 desktop:space-y-3 ">
    <h1 className="text-lg font-[600]">Create Author</h1>


    <form className="flex flex-col  h-full py-4 space-y-4  tablet:space-y-12 w-full desktop:w-[650px] desktop:space-y-6" onSubmit={handleSubmit} >

    <Input id='upload-button' type='file' placeholder='upload' className='hidden' onChange={handleChange} />
    <label htmlFor="upload-button">

    <div  className="relative w-[100px]">
    {account?.image?.url?<img src={account?.image?.url} className="w-[60px] h-[60px] rounded-full"/>:<Avatar name={`${account?.firstName} ${account?.lastName}`} size="md" />}
    <button type="button" className="">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 absolute right-[40px] top-[30px] ">
  <path d="M12 9a3.75 3.75 0 100 7.5A3.75 3.75 0 0012 9z" />
  <path fillRule="evenodd" d="M9.344 3.071a49.52 49.52 0 015.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 01-3 3h-15a3 3 0 01-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 001.11-.71l.822-1.315a2.942 2.942 0 012.332-1.39zM6.75 12.75a5.25 5.25 0 1110.5 0 5.25 5.25 0 01-10.5 0zm12-1.5a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
</svg>
    </button>
    </div>

    </label>
   


        <div className="flex   space-x-5 w-full">
        <FormControl isRequired="true" isInvalid={errorFields[0]}>
            <FormLabel className="text-secondary">First Name</FormLabel>
       
            <Input variant="filled" type="text" value={account?.firstName} onChange={({target})=>{setAccount({...account,firstName:target.value})}}/>

            {errorFields[0]&&<FormErrorMessage>First Name Required</FormErrorMessage>}

        </FormControl>

        <FormControl isRequired="true" isInvalid={errorFields[1]}>
        <FormLabel className="text-secondary">Last Name</FormLabel>
            <Input variant="filled" type="text" value={account?.lastName} onChange={({target})=>{setAccount({...account,lastName:target.value})}}/>
            
            {errorFields[1]&&<FormErrorMessage>Last Name Required</FormErrorMessage>}
            </FormControl>

            

    </div>
    <div>
    <FormControl isRequired="true" isInvalid={errorFields[2]}>
        <FormLabel className="text-secondary">Email</FormLabel>
            <Input variant="filled" type="email" value={account?.email} onChange={({target})=>{setAccount({...account,email:target.value})}}/>
            {errorFields[2]&&<FormErrorMessage>A Valid Email is required</FormErrorMessage>}

            </FormControl>

            </div>

    <FormControl isRequired="true" >
        <FormLabel>Designation</FormLabel>
        <Select variant="filled" value={account?.designation} onChange={({target})=>{setAccount({...account,designation:target.value})}} >
            <option disabled></option>
            <option value={'faculty'} >Faculty</option>
            <option value={'student'} >Student</option>
        </Select>
        {errorFields[3]&&<FormErrorMessage>No Designation selected</FormErrorMessage>}
    </FormControl>
    <FormControl isRequired="true" isInvalid={errorFields[4]}>
    <FormLabel>Bio</FormLabel>
    <Textarea variant="filled" resize="none" rows={6} value={account?.bio} onChange={({target})=>{setAccount({...account,bio:target.value})}} />
    {errorFields[4]&&<FormErrorMessage>Bio is required</FormErrorMessage>}
    </FormControl>

    <FormControl>
        <FormLabel className="text-secondary">Specializations</FormLabel>
            <Input variant="filled" value={account?.specializations} onChange={({target})=>{setAccount({...account,specializations:target.value})}}/>
    </FormControl>

    <button type="submit" className={`p-2 w-full rounded-full flex justify-center font-[600] drop-shadow cursor-pointer drop-shadow items-center bg-gradient-to-r from-primary to-indigo-800 text-white `} >Save</button>

    
    </form>


    
</div>
}