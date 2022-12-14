import {useState} from 'react'

import {
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Button,
    FormLabel,
    FormControl,
    FormErrorMessage,
    FormHelperText,
  } from "@chakra-ui/react";
  import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
  import LockIcon from "@mui/icons-material/Lock";
  
  import VisibilityIcon from "@mui/icons-material/Visibility";
  import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
  import KeyIcon from '@mui/icons-material/Key';
  import Link  from "next/link"

  import axios from '../../axios';

  import { Radio, RadioGroup } from '@chakra-ui/react'  

  import useNotification from '../../hooks/useNotification';
import moment from 'moment';

import { Notification } from '../../components/Notification';

const Register=()=>{

 

    const [account,setAccount]=useState({})
    const [success,setSuccess]=useState(false)
    const [showPassword,setShowPassword]=useState(false)
    const [role,setRole]=useState(null)

    const {notification,setNotification}=useNotification()


    const handleSubmit=async(e)=>{
      e.preventDefault()
        if(!account.email||!account.password||!role){
          setNotification({status:'error',message:'Missing Fields',createdAt:moment()})
        }
        else if(account?.password!==account?.confirm){
          setNotification({status:'error',message:'Passwords do not match'})
        }

        else{
          try{
          const result=await axios.post('/auth/register',{
            email: account.email,
            password: account.password,
            role:role
          })
          console.log(result)
          
          if(result?.status==200){
            setSuccess(true)
          }

        } 
        catch(err){
          console.log(err)
          if(err?.response?.status==401){
            setNotification({status:'error',message:'Bad Request',createdAt:moment()})
          }
          else if(err?.response?.status==409){
            setNotification({status:'error',message:'Account already exists',createdAt:moment()})

          }
          else{
            setNotification({status:'error',message:'Internal Server Error',createdAt:moment()})
          }
        }

        }
    }



    return (
    <div className="min-h-screen tablet:bg-gradient-to-r from-primary to-blue-800 flex flex-col w-full justify-center  tablet:items-center">
      
            {notification?.createdAt&&<Notification options={notification}/>}


<form onSubmit={handleSubmit}>
      <div className="fixed top-0 right-0 left-0  tablet:relative tablet:top-[-50px]">
      </div>
      
      {!success?<div className="flex flex-col w-full bg-white p-5  space-y-5 tablet:px-10 tablet:py-20 tablet:drop-shadow-lg  tablet:rounded-md tablet:w-[560px]   desktop:space-y-6">
        <h1 className="text-2xl font-bold desktop:text-3xl">Create Account</h1>

        <FormControl>
          <FormLabel>Role</FormLabel>
          <RadioGroup value={role} className="space-x-5" onChange={setRole}>
            <Radio value={'editor'}>Editor</Radio>
            <Radio value={'administrator'}>Administrator</Radio>
            </RadioGroup>
        </FormControl>
        
        <FormControl>
          <FormLabel>Email</FormLabel>
          <InputGroup>
            <InputLeftElement
              children={
                <button className="text-slate-500 ">
                  <AlternateEmailIcon />
                </button>
              }
            />
            <Input
              variant="filled"
              value={account?.email}
              type="email"
              autoComplete="off"
              onChange={(e) => {
                setAccount({ ...account, email: e.target.value });
              }}
            />
          </InputGroup>
        </FormControl>
        
        <FormControl>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <InputLeftElement
                children={
                  <button className="text-slate-500 ">
                    <KeyIcon />
                  </button>
                }
              />
              <Input
                variant="filled"
                value={account?.password}
                type={showPassword ? "text" : "password"}
                onChange={(e) => {
                  setAccount({ ...account, password: e.target.value });
                }}
                autoComplete="off"
              />
              <InputRightElement
                children={
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
                }
              />
            </InputGroup>
          </FormControl>

        <div className="space-y-3">
       


          <FormControl>
            <FormLabel>Confirm Password</FormLabel>
          <InputGroup>
              <InputLeftElement
                children={
                  <button className="text-slate-500 ">
                    <LockIcon />
                  </button>
                }
              />
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

          <div className="flex w-full justify-between">
          <Link href="/admin/login">
              <p className="text-gray-600 cursor-pointer text-sm">
                Already member?
              </p>
            </Link>
          </div>
        </div>

        <button
          type="submit"
          className="bg-gradient-to-r from-indigo-900 to-primary font-semibold text-white p-2 font-xl rounded-full">
          Continue
        </button>
        </div>:
      <div className="flex flex-col w-full justify-center  bg-white p-5  space-y-12 tablet:px-10 tablet:py-20 tablet:drop-shadow-lg  tablet:rounded-md tablet:w-[560px]   desktop:space-y-8">
      <div className='text-2xl'>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-14 h-14 text-green-600">
  <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
</svg>

</div>

      <h1 className="text-2xl font-bold desktop:text-3xl">Success</h1>
      <p className='text-xl '>Request for new account submitted.Status will initimated through email</p>

      
      <Link href='/'>
      <button
          className="bg-gradient-to-r from-indigo-900 drop-shadow to-primary font-semibold text-white p-2 w-full font-xl rounded-full">
          Back to Home
        </button>
        </Link>
      </div>}

      

    </form>
  </div>)


}

export default Register