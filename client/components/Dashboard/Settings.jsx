import { useState } from "react"
import { Layout } from "./Layout"
import { Tabs, TabList, TabPanels, Tab, TabPanel, FormLabel, FormErrorMessage, useDisclosure, Textarea,InputRightElement, Spinner } from '@chakra-ui/react'
import { FormControl,InputGroup,Input } from "@chakra-ui/react"
import { useAuth } from "../../hooks/useAuth"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"

import useNotification from "../../hooks/useNotification"
import moment from "moment/moment"
import { FormHelperText } from "@mui/material"
import axios, { axiosPrivate } from "../../axios"

import { useRouter } from "next/router"

import { Avatar } from "@chakra-ui/react"
import { useEffect } from "react"

export const Settings=()=>{
    
    const {auth}=useAuth()
    return <Layout heading={'Settings'}>
        
        <div className="py-5 tablet:py-8 ">
            <Tabs>
                    <TabList>
                            <Tab className="text-sm">Security</Tab>
                    </TabList>


            <TabPanels>
                  

                    <TabPanel>
                        <Security username={auth?.username}/>
                    </TabPanel>

            </TabPanels>

    
            </Tabs>
        </div>
    
    </Layout>
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


    const handlePasswordChange=async(e)=>{
        e.preventDefault()

        try{
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
            setNotification({status:'error',message:"New Password and Previous Password same",createdAt:moment()})
            return
        }

        else if(newPassword!==confirmPassword){

            setNotification({status:'error',message:"Passwords must match",createdAt:moment()})    
            return
        }

        else{


            const response=await axiosPrivate.post('/auth/account/changePassword',{
                username:username,
                password:oldPassword,
                newPassword:newPassword
            }) 

            if(response.status==200){
                setNotification({status:'success',message:'Password changed',createdAt:moment()})
            }

        }
    }
    catch(err){
        console.log(err)
        if(err?.response?.status==401)
        {
            setNotification({status:'error',message:'Unauthorized',createdAt:moment()})

        }
        else{
       
        setNotification({status:'error',message:'Try Again Later',createdAt:moment()})

        }
    }


    }

    return <div className="space-y-8 desktop:max-w-[650px]">
        {!success?<form className="space-y-5" onSubmit={handleEmailChange}>
        <FormControl>
                <h1 className="text-sm font-[600]">Email</h1>
                <Input variant="filled" value={username} disabled/>
            </FormControl>
        <h1 className="text-base font-[600]">Change Email</h1>
            <FormControl isInvalid={errorFields[0]}>
            <h1 className="text-sm font-[600]">Email</h1>
                <Input variant="filled" type="email" value={email} onChange={({target})=>{setEmail(target.value); if(target.value){setErrorFields((prev)=>{prev[0]=false; return prev})}}}/>
                {errorFields[0]&&<FormErrorMessage>Email is required</FormErrorMessage>}

            </FormControl>

            <button type="submit" className="flex  text-sm justify-evenly py-2  drop-shadow px-6 rounded-md text-white bg-gradient-to-r from-primary to-indigo-800 items-center" >
            Verify</button>
        </form>:<form className="space-y-5" onSubmit={handleEmailVerify}>
        <FormControl>
                <FormLabel>Current Email</FormLabel>
                <Input variant="filled" value={username} disabled/>
            </FormControl>
        <h1 className="text-base font-[600]">Change Email</h1>
            <FormControl isInvalid={errorFields[4]}>
                <FormLabel>OTP</FormLabel>
                <Input variant="filled" type="number" value={otp} onChange={({target})=>{setOtp(target.value); if(target.value){setErrorFields((prev)=>{prev[4]=false; return prev})}}}/>
                {errorFields[4]&&<FormErrorMessage>Otp is required,sent to email</FormErrorMessage>}

                <div className="space-x-3 flex p-1">

                <button type="button" className="text-sm text-secondary" onClick={async()=>{await setSuccess(false)}}>Back</button>
                <button  type="button" className="text-sm text-secondary" onClick={async()=>{await sendOtp(email)}}>Resend Code</button>

                </div>
            </FormControl>

            <button type="submit" className="flex text-base justify-evenly py-2  drop-shadow px-6 rounded-md text-white bg-gradient-to-r from-primary to-indigo-800 items-center" onClick={handleEmailVerify}>
            Reset</button>
        </form>}

            <form className="space-y-5" onSubmit={handlePasswordChange}>
                <h1 className="text- font-[600]">Change Password</h1>
            <FormControl isInvalid={errorFields[1]}>
            <h1 className="text-sm font-[600]">Previous Password</h1>
                <Input type="password" variant="filled" onChange={({target})=>{setOldPassword(target.value); if(target.value){setErrorFields((prev)=>{prev[1]=false; return prev})}}}/>
                {errorFields[1]&&<FormErrorMessage>Previous password is required</FormErrorMessage>}
            </FormControl>

            <FormControl isInvalid={errorFields[2]}>
            <h1 className="text-sm font-[600]">New Password</h1>
                <Input type="password" variant="filled" onChange={({target})=>{setNewPassword(target.value); if(target.value){setErrorFields((prev)=>{prev[2]=false; return prev})}}} />
                {errorFields[2]&&<FormErrorMessage>New Password is required</FormErrorMessage>}
            </FormControl>

            <FormControl isInvalid={errorFields[2]}>
            <h1 className="text-sm font-[600]">Confirm Password</h1>
                <Input type="password" variant="filled" onChange={({target})=>{setConfirmPassword(target.value); if(target.value){setErrorFields((prev)=>{prev[3]=false; return prev})}}}/>
                {errorFields[3]&&<FormErrorMessage>Passwords must match</FormErrorMessage>}
            </FormControl>

            <button type="submit" className="flex text-sm justify-evenly py-2  drop-shadow px-6 rounded-md text-white bg-gradient-to-r from-primary to-indigo-800 items-center" >
            Change
            </button>

            </form>
            
            <a role="button" target="_blank"  rel="noreferrer" href={`https://docs.google.com/spreadsheets/d/1eXsG0PgdF7mPI4m_D673uxsr-nESvKBV4R47sxZFbUE/edit?usp=sharing`} className="absolute top-[25px] right-[25px] font-[500] flex space-x-3"><span>Report Bug</span>
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 0c53 0 96 43 96 96v3.6c0 15.7-12.7 28.4-28.4 28.4H188.4c-15.7 0-28.4-12.7-28.4-28.4V96c0-53 43-96 96-96zM41.4 105.4c12.5-12.5 32.8-12.5 45.3 0l64 64c.7 .7 1.3 1.4 1.9 2.1c14.2-7.3 30.4-11.4 47.5-11.4H312c17.1 0 33.2 4.1 47.5 11.4c.6-.7 1.2-1.4 1.9-2.1l64-64c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3l-64 64c-.7 .7-1.4 1.3-2.1 1.9c6.2 12 10.1 25.3 11.1 39.5H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H416c0 24.6-5.5 47.8-15.4 68.6c2.2 1.3 4.2 2.9 6 4.8l64 64c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0l-63.1-63.1c-24.5 21.8-55.8 36.2-90.3 39.6V240c0-8.8-7.2-16-16-16s-16 7.2-16 16V479.2c-34.5-3.4-65.8-17.8-90.3-39.6L86.6 502.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l64-64c1.9-1.9 3.9-3.4 6-4.8C101.5 367.8 96 344.6 96 320H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H96.3c1.1-14.1 5-27.5 11.1-39.5c-.7-.6-1.4-1.2-2.1-1.9l-64-64c-12.5-12.5-12.5-32.8 0-45.3z"/></svg>
            </a>
            </div>

}