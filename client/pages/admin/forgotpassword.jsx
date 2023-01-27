import { Input,InputGroup,InputLeftElement, FormLabel, FormControl,InputRightElement } from "@chakra-ui/react";
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import PasswordIcon from '@mui/icons-material/Password';
import { useState,useCallback } from "react";
import Link from "next/link"

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import KeyIcon from '@mui/icons-material/Key';

import LockIcon from "@mui/icons-material/Lock";

import axios from "../../axios"
import useNotification from "../../hooks/useNotification";

import { Notification } from "../../components/Notification";
import moment from "moment"
import { useRouter } from "next/router";

/*Admin Login UI */
const ForgotPassword=()=>{

    const [username,setUsername]=useState(null)
    const [otp,setOtp]=useState(null)
    const [otpSent,setOtpSent]=useState(false)
    const [otpVerified,setOtpVerified]=useState(false)
    const [account,setAccount]=useState({})
    const [showPassword,setShowPassword]=useState(false)
    const [notification,setNotification]=useState(false)

    const router=useRouter()


    const sendCode=async()=> {
        try{
            const result=await axios.post('/auth/sendotp',{
                username:username
            })

            if(result?.status==200){
                setOtpSent(true)
            }

        }catch(err){
            if(err?.response?.status==404){
                setNotification({status: 'error',message:'No Account found',createdAt: moment()});

            }
            else{
                setNotification({status: 'error',message:'Try again later',createdAt: moment()});
            }
        }
    }

    const handleSubmit=useCallback(async(e)=>{
        e.preventDefault()

        await sendCode()
        // console.log(username)
        
    
      

    },[username])

    const verifyOtp=useCallback(async(e)=>{
        e.preventDefault()

        // console.log(username)
        
        try{
            const result=await axios.post('/auth/verifyotp',{
                username:username,
                otp:otp
            })

            if(result?.status==200){
                setOtpVerified(true)
            }

        }catch(err){
            if(err?.response?.status==404){
                setNotification({status: 'error',message:'Not Found',createdAt: moment()});
            }
            else if(err?.response?.status==401){
                setNotification({status: 'error',message:'Unauthorized',createdAt: moment()});
            }
            else{
                setNotification({status: 'error',message:'Internal Server Error',createdAt: moment()});
            }
        }
      

    },[otp])


    const changePassword=async(e)=>{
        e.preventDefault()

        try{

            if(account.password!==account.confirm){
                setNotification({status: 'error',message:'Password & Confirm Password do not match',createdAt: moment()});
                return 
            }

            const result=await axios.post('/auth/resetPassword',{
                username:username,
                password:account.password
            })

            if(result?.status == 200){
                setNotification({status: 'success',message:'Password Reset Successfully',createdAt: moment()});
                router.push('/admin/login')
            }


        }
        catch(err){
            if(err?.status==400){
                setNotification({status: 'error',message:'Bad Request',createdAt: moment()});
            }
            else if(err?.status==401){
                setNotification({status: 'error',message:'Unauthorized',createdAt: moment()});
            }
            else{
                setNotification({status: 'error',message:'Internal Server Error',createdAt: moment()});
            }

        }

    }
    
    

    return <div className=" min-h-screen tablet:bg-gradient-to-r from-primary to-black flex flex-col w-full  justify-center tablet:items-center">


        <div className='fixed top-0 right-0 left-0  desktop:relative tablet:top-[-50px]'>
        </div>

        {notification?.createdAt&&<Notification options={notification}/>}

    

        <div className="flex flex-col w-full bg-white p-5  space-y-8 tablet:px-10 tablet:py-24  tablet:drop-shadow-lg  tablet:rounded-md tablet:w-[560px]   tablet:space-y-12">
           
        {!otpSent?<form onSubmit={handleSubmit} className="space-y-12 ">
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

                    <InputLeftElement>
                    <button className="text-slate-500 "><AlternateEmailIcon/></button>
                    
                    </InputLeftElement>
                    <Input variant="filled" type="email" value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
            
                </InputGroup>

            </FormControl>

        

            <button className="bg-gradient-to-r from-indigo-900 to-primary font-semibold text-white p-2 w-full font-xl rounded-full drop-shadow">Send Link</button>
            </form>:!otpVerified?<form onSubmit={verifyOtp} className="space-y-12">

            <div className="space-y-6">
            <button  className="flex items-center space-x-3 desktop:space-x-5" onClick={()=>{setOtp(null); setOtpSent(false)}}>
                <ArrowBackIosNewIcon className="w-[20px] h-[20px]"/>
                <h1 className="text-lg font-[500]">Back</h1>
            </button>
            <h1 className="text-2xl font-bold">One Time Password</h1>

            </div>

<FormControl className="space-y-3">

        <InputGroup>

            <InputLeftElement>
            <button className="text-slate-500 "><PasswordIcon/></button>
            </InputLeftElement>
            <Input variant="filled" type="number" value={otp} onChange={(e)=>{setOtp(e.target.value)}}/>
            
        </InputGroup>

        <div className="flex w-full justify-between px-1">
          <button type="button" onClick={()=>{sendCode()}}>
              <p className="text-gray-600 cursor-pointer text-sm">
                Resend Code
              </p>
            </button>
          </div>

    </FormControl>

    <button className="bg-gradient-to-r from-indigo-900 to-primary font-semibold text-white p-2 w-full font-xl rounded-full drop-shadow">Verify OTP</button>


 
</form>:<form onSubmit={changePassword} className="space-y-12">

<div className="space-y-6">
<button  className="flex items-center space-x-3 desktop:space-x-5" onClick={()=>{setOtp(null); setOtpSent(false); setOtpVerified(false)}}>
    <ArrowBackIosNewIcon className="w-[20px] h-[20px]"/>
    <h1 className="text-lg font-[500]">Back</h1>
</button>
<h1 className="text-2xl font-bold">Reset Password</h1>

</div>


<FormControl>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <InputLeftElement>
              <button className="text-slate-500 ">
                    <KeyIcon />
                  </button>
              </InputLeftElement>
              <Input
                variant="filled"
                value={account?.password}
                type={showPassword ? "text" : "password"}
                onChange={(e) => {
                  setAccount({ ...account, password: e.target.value });
                }}
                autoComplete="off"
              />
              <InputRightElement>
              <button
                    type="button"
                    className="text-slate-500 "
                    onClick={()=>{
                      setShowPassword(!showPassword);
                    }
                    }
                  >
                    {showPassword ? (
                      <VisibilityIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )}
                  </button>
              
              </InputRightElement>
            </InputGroup>
          </FormControl>
       


          <FormControl>
            <FormLabel>Confirm Password</FormLabel>
          <InputGroup>
              <InputLeftElement>
              <button className="text-slate-500 ">
                    <LockIcon />
                  </button>
              </InputLeftElement>
              <Input
                variant="filled"
                value={account?.confirm}
                type={"password"}
                onChange={(e) => {
                  setAccount({ ...account, confirm: e.target.value });
                }}
                autoComplete="off"
              />
      
            </InputGroup>

          </FormControl>


<button className="bg-gradient-to-r from-indigo-900 to-primary font-semibold text-white p-2 w-full font-xl rounded-full drop-shadow">Submit</button>



</form>
    }
        </div>
       
      
    </div>
    

}

export default ForgotPassword;