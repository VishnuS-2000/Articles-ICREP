import {useState,useCallback} from 'react'

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

  import Link  from "next/link"

  import axios from  "../../axios"

  import { useAuth } from '../../hooks/useAuth';

  import { useRouter } from 'next/router';
  import { Notification } from '../../components/Notification';

  import moment from "moment"

  import useNotification from '../../hooks/useNotification';

export default function Login(){


  const router=useRouter()
    const [showPassword, setShowPassword] = useState(false);
    const [account, setAccount] = useState({
      email: "",
      password: "",
    });


    const {notification,setNotification}=useNotification()
    const {auth,setAuth}=useAuth()


    const handleSubmit=async(e)=>{
      e.preventDefault();
        if(!account.email||!account.password){
          setNotification({status: 'error',message:'Missing Username/Password',createdAt: moment()});
          return;
        }

        try{

        const res=await axios.post('/auth/login',{
          email:account.email,
          password:account.password

        },{
          headers:{'Content-Type':'application/json'},
          withCredentials:'include'
        })  


        if(res?.status==200){
          setAuth(res?.data)
          router.replace('/admin/dashboard')
        }
        


      }
      catch(err){
        console.log(err)
        if(err?.response?.status==400){
          
          setNotification({status: 'error',message:'Bad Request',createdAt: moment()});

        }
        else if(err?.response?.status==401){
          setNotification({status: 'error',message:'Unauthorized',createdAt: moment()});


        }
        else{
          setNotification({status: 'error',message:'Try Again Later',createdAt: moment()});

        }
      
      }


      
    }



    return     <div className=" min-h-screen tablet:bg-gradient-to-r from-primary to-blue-800 flex flex-col w-full  justify-center tablet:items-center">
    <form onSubmit={handleSubmit}>
      
      {notification?.createdAt&&<Notification options={notification}/>}

      <div className="flex flex-col w-full bg-white p-5  space-y-5 tablet:px-10 tablet:py-24 flex-[0.8] tablet:drop-shadow-lg  tablet:rounded-md tablet:w-[560px]   desktop:space-y-8">
        
    
        <h1 className="text-2xl font-[700] desktop:text-3xl">Login</h1>

        <FormControl>
          <FormLabel>Username</FormLabel>
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
              value={account.email}
              type="email"
              autoComplete="off"
              onChange={(e) => {
                setAccount({ ...account, email: e.target.value });
              }}
            />
          </InputGroup>
        </FormControl>

        <div className="space-y-3">
          <FormControl>
            <FormLabel>Password</FormLabel>
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
                value={account.password}
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
                    onClick={useCallback(() => {
                      setShowPassword(!showPassword);
                    })}
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

          <div className="flex w-full justify-between">
          <Link href="/admin/register">
              <p className="text-gray-600 cursor-pointer text-sm">
                Create Account
              </p>
            </Link>
            <Link href="/admin/forgotpassword">
              <p className="text-gray-600 cursor-pointer text-sm">
                Forgot Password
              </p>
            </Link>
          </div>
        </div>

        <button
          type="submit"
          className="bg-gradient-to-r from-indigo-900 to-primary font-semibold text-white p-2 font-xl rounded-full">
          Continue
        </button>
      </div>
    </form>
  </div>


}