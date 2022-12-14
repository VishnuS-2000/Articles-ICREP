import { useState } from "react"
import { Layout } from "./Layout"
import { Tabs, TabList, TabPanels, Tab, TabPanel, FormLabel, FormErrorMessage, useDisclosure, Textarea } from '@chakra-ui/react'
import { FormControl,InputGroup,Input } from "@chakra-ui/react"
import { useAuth } from "../../hooks/useAuth"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"

import useNotification from "../../hooks/useNotification"
import moment from "moment/moment"
import { FormHelperText } from "@mui/material"
import axios from "../../axios"

import { useRouter } from "next/router"

import { Avatar } from "@chakra-ui/react"

export const Settings=()=>{
    
    const {auth}=useAuth()
    console.log(auth)
    return <Layout heading={'Settings'}>
        
        <div className="py-5 tablet:py-8 ">
            <Tabs>
                    <TabList>
                            <Tab>General</Tab>
                            <Tab>Security</Tab>
                    </TabList>


            <TabPanels>
                    <TabPanel>
                        <General role={auth?.role} />
                    </TabPanel>

                    <TabPanel>
                        <Security username={auth?.username}/>
                    </TabPanel>

            </TabPanels>

    
            </Tabs>
        </div>
    
    </Layout>
}



const General=({role,lastLogin})=>{



    const [account,setAccount]=useState({ 
         
        image:null
    })


    const handleChange=()=>{

    }


    return <div className="flex flex-col">
        <form className="space-y-5  tablet:space-y-8">
     
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
         
            
        <FormControl>
            <FormLabel>Display Name</FormLabel>
            <Input  variant="filled" />        
        </FormControl>

        <FormControl>
            <FormLabel>Bio</FormLabel>
            <Textarea resize="none" rows={6} variant="filled" />        
        </FormControl>


           <FormControl>
                <FormLabel>Role</FormLabel>
                <Input value={role} variant="filled" disabled/>
            </FormControl>


            <div className="space-y-3">
            <h1 className="text-black">Last Login</h1>
            <p className="text-gray-400 italic">Time{lastLogin}</p>
            </div>

            </form>

        </div>

}

const Security=({username})=>{
    
    const [email,setEmail]=useState('')
    const [oldPassword,setOldPassword]=useState('')
    const [newPassword,setNewPassword]=useState('')
    const [confirmPassword,setConfirmPassword]=useState('')

    const [success,setSuccess]=useState(false)
    const [otp,setOtp]=useState(null)
    const axiosPrivate=useAxiosPrivate()

    const {notification,setNotification}=useNotification()

    const [errorFields,setErrorFields]=useState([false,false,false,false])

    const router=useRouter()

    const sendOtp=async(newEmail)=>{
        const  response=await axiosPrivate.post('/auth/verifyEmail',{
            email:username,
            newEmail:newEmail,
        })
        
        try{
        if(response?.status==200){
            setNotification({message:'OTP Sent',createdAt:moment(),status:'success'})
            return response?.data
        }

    }
    catch(err){
        return err
    }

    }


    const handleEmailChange=async(e)=>{
        e.preventDefault();
            

        try{
        if(!email){
        
            setNotification({message:"Missing Fields",status:'error',createdAt:moment()})
            setErrorFields((prev)=>{
                

                prev[0]=true
                return prev
            })
            return
        }

        if(email===username){
            
            setNotification({message:"New Email same as Current",status:'error',createdAt:moment()})
            setErrorFields((prev)=>{
                
                prev[0]=true
                return prev
            })
            setEmail(null)
            return
        }

        const result=await sendOtp(email)
        if(result){
            setSuccess(true)

            
        }


    }

    catch(err){
        console.log(err)
        setNotification({message:'Try Again Later',status:'error',createdAt:moment()})
    }
        

    }

    const handleEmailVerify=async(e)=>{
        e.preventDefault()

            try{
        if(!otp){
            setNotification({status:'error',createdAt:moment(),message:'OTP missing'})
            setErrorFields((prev)=>{
                prev[4]=true;
                return prev
            })
        
            return
        }
        
        const response = await axiosPrivate.post('/auth/changeEmail',{
            code:otp,
            username:username,
        })

        if(response?.status==200){
            setNotification({message:'Email Changed',status:'success',createdAt:moment()});
            setSuccess(false)
            setEmail(null)
            router.replace('/admin/login')           

        }
        
    
    } catch(err){
        console.log(err)
        setNotification({message:'Try again later',status:'error',createdAt:moment()})
    }

    }


    const handlePasswordChange=(e)=>{
        e.preventDefault()
        if(!oldPassword||!newPassword||!confirmPassword){
            setNotification({status:'error',message:'Missing Fields',createdAt:moment()})
            setErrorFields((prev)=>{
                if(!oldPassword){
                    prev[1]=true
                }  
                if(!newPassword){
                    prev[2]=true
                }
                if(!confirmPassword){
                    prev[3]=true;
                }

                return prev
            })
            return
        }
        else if(oldPassword==newPassword){
            alert("New Password same as old password")
            return
        }

        else if(newPassword!==confirmPassword){
            alert("Confirm Password and Password do not match")    
            return
        }


    }

    return <div className="space-y-8">
        {!success?<form className="space-y-5" onSubmit={handleEmailChange}>
        <FormControl>
                <FormLabel>Email</FormLabel>
                <Input variant="filled" value={username} disabled/>
            </FormControl>
        <h1 className="text-lg font-[600]">Change Email</h1>
            <FormControl isInvalid={errorFields[0]}>
                <FormLabel>New Email</FormLabel>
                <Input variant="filled" type="email" value={email} onChange={({target})=>{setEmail(target.value); if(target.value){setErrorFields((prev)=>{prev[0]=false; return prev})}}}/>
                {errorFields[0]&&<FormErrorMessage>Email is required</FormErrorMessage>}

            </FormControl>

            <button type="submit" className="flex text-base justify-evenly py-1  drop-shadow px-3 rounded-full text-white bg-gradient-to-r from-primary to-indigo-800 items-center" >
            Verify</button>
        </form>:<form className="space-y-5" onSubmit={handleEmailVerify}>
        <FormControl>
                <FormLabel>Current Email</FormLabel>
                <Input variant="filled" value={username} disabled/>
            </FormControl>
        <h1 className="text-lg font-[600]">Change Email</h1>
            <FormControl isInvalid={errorFields[4]}>
                <FormLabel>OTP</FormLabel>
                <Input variant="filled" type="number" value={otp} onChange={({target})=>{setOtp(target.value); if(target.value){setErrorFields((prev)=>{prev[4]=false; return prev})}}}/>
                {errorFields[4]&&<FormErrorMessage>Otp is required,sent to email</FormErrorMessage>}

                <div className="space-x-3 flex p-1">

                <button type="button" className="text-sm text-secondary" onClick={async()=>{await setSuccess(false)}}>Back</button>
                <button  type="button" className="text-sm text-secondary" onClick={async()=>{await sendOtp(email)}}>Resend Code</button>

                </div>
            </FormControl>

            <button type="submit" className="flex text-base justify-evenly py-1  drop-shadow px-3 rounded-full text-white bg-gradient-to-r from-primary to-indigo-800 items-center" onClick={handleEmailVerify}>
            Reset</button>
        </form>}

            <form className="space-y-5" onSubmit={handlePasswordChange}>
                <h1 className="text-lg font-[600]">Change Password</h1>
            <FormControl isInvalid={errorFields[1]}>
                <FormLabel>Previous Password</FormLabel>
                <Input type="password" variant="filled" onChange={({target})=>{setOldPassword(target.value); if(target.value){setErrorFields((prev)=>{prev[1]=false; return prev})}}}/>
                {errorFields[1]&&<FormErrorMessage>Previous password is required</FormErrorMessage>}
            </FormControl>

            <FormControl isInvalid={errorFields[2]}>
                <FormLabel>New Password</FormLabel>
                <Input type="password" variant="filled" onChange={({target})=>{setNewPassword(target.value); if(target.value){setErrorFields((prev)=>{prev[2]=false; return prev})}}} />
                {errorFields[2]&&<FormErrorMessage>New Password is required</FormErrorMessage>}
            </FormControl>

            <FormControl isInvalid={errorFields[2]}>
                <FormLabel>Confirm New Password</FormLabel>
                <Input type="password" variant="filled" onChange={({target})=>{setConfirmPassword(target.value); if(target.value){setErrorFields((prev)=>{prev[3]=false; return prev})}}}/>
                {errorFields[3]&&<FormErrorMessage>Passwords must match</FormErrorMessage>}
            </FormControl>

            <button type="submit" className="flex text-base justify-evenly py-1  drop-shadow px-3 rounded-full text-white bg-gradient-to-r from-primary to-indigo-800 items-center" >
            Change
            </button>

            </form>
            
            
            </div>

}