import { Input,InputGroup,InputLeftElement, FormLabel, FormControl } from "@chakra-ui/react";
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import { useState,useCallback } from "react";
import Link from "next/link"


/*Admin Login UI */
const ForgotPassword=()=>{

    const [showPassword,setShowPassword]=useState(false)
    const [notification,setNotification]=useState({
        title:null,
        description:null,
        status:null,
        createdAt:null
    })

    const handleSubmit=useCallback((e)=>{
        e.preventDefault()
        
      

    },[])
    

    return <div className=" min-h-screen tablet:bg-gradient-to-r from-primary to-blue-800 flex flex-col w-full  justify-center tablet:items-center">

        <form onSubmit={handleSubmit}>


        <div className='fixed top-0 right-0 left-0  desktop:relative tablet:top-[-50px]'>
        </div>



        <div className="flex flex-col w-full bg-white p-5  space-y-5 tablet:px-10 tablet:py-24  tablet:drop-shadow-lg  tablet:rounded-md tablet:w-[560px]   tablet:space-y-12">
            <div className="space-y-6">
            <Link href={`/admin/login`} className="flex items-center space-x-3 desktop:space-x-5">
                <ArrowBackIosNewIcon className="w-[20px] h-[20px]"/>
                <h1 className="text-lg font-[500]">Back</h1>
            </Link>
            <h1 className="text-2xl font-bold">Forgot Password</h1>

            </div>
            <FormControl>
                <FormLabel>Username</FormLabel>
                <InputGroup>

                    <InputLeftElement children={<button className="text-slate-500 "><AlternateEmailIcon/></button>}/>
                    <Input variant="filled" type="email"/>
            
                </InputGroup>

            </FormControl>

        
            <button className="bg-gradient-to-r from-indigo-900 to-primary font-semibold text-white p-2 font-xl rounded-full drop-shadow">Send Link</button>
        </div>
        </form>
    </div>
    

}

export default ForgotPassword;