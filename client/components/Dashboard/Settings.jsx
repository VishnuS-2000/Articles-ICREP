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
    // console.log(auth)
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

    return <div className="space-y-8">
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
            
            
            </div>

}