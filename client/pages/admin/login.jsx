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



export default function Login(){


    const [showPassword, setShowPassword] = useState(false);
    const [account, setAccount] = useState({
      email: "",
      password: "",
    });

    const handleSubmit=()=>{

    }



    return     <div className=" min-h-screen tablet:bg-gradient-to-r from-primary to-blue-800 flex flex-col w-full  justify-center tablet:items-center">
    <form onSubmit={handleSubmit}>
      <div className="fixed top-0 right-0 left-0  desktop:relative desktop:top-[-50px]">
        
        {/* {notification.createdAt && <Notification options={notification} />} */}
      </div>
      

      <div className="flex flex-col w-full bg-white p-5  space-y-5 tablet:px-10 tablet:py-20 tablet:drop-shadow-lg  tablet:rounded-md tablet:w-[560px]   desktop:space-y-8">
        
    
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