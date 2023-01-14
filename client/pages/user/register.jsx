import { useState } from 'react'

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
import Link from "next/link"

import axios from '../../axios';

import { Radio, RadioGroup } from '@chakra-ui/react'

import useNotification from '../../hooks/useNotification';
import moment from 'moment';

import { Notification } from '../../components/Notification';
import  Head from "next/head"

const Register = () => {



  const [account, setAccount] = useState({})
  const [success, setSuccess] = useState(false)
  const [role, setRole] = useState(null)

  const { notification, setNotification } = useNotification()

  const [errorFields, setErrorFields] = useState([false,false,false])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!account.email || !account.firstName || !account?.lastName || !role) {

      if (!account.firstName) setErrorFields((prev) => { prev[0] = true; return prev })

      if (!account.lastName) setErrorFields((prev) => { prev[1] = true; return prev })

      if (!account.email) setErrorFields((prev) => { prev[2] = true; return prev })
      setNotification({ status: 'error', message: 'Missing Fields', createdAt: moment() })



    }


    else {
      try {
        const result = await axios.post('/auth/register', {
          email: account.email,
          name: account.firstName + ' ' + account.lastName,
          role: role
        })
        console.log(result)

        if (result?.status == 200) {
          setSuccess(true)
        }

      }
      catch (err) {
        console.log(err)
        if (err?.response?.status == 401) {
          setNotification({ status: 'error', message: 'Bad Request', createdAt: moment() })
        }
        else if (err?.response?.status == 409) {
          setNotification({ status: 'error', message: 'Account already exists', createdAt: moment() })

        }
        else {
          setNotification({ status: 'error', message: 'Internal Server Error', createdAt: moment() })
        }
      }

    }
  }



  return (
    <>
          <Head>
        <title>Register</title>
        </Head>
    <div className="min-h-screen tablet:bg-gradient-to-r from-primary to-blue-800 flex flex-col w-full justify-center  tablet:items-center">

      {notification?.createdAt && <Notification options={notification} />}


      <form onSubmit={handleSubmit}>
        <div className="fixed top-0 right-0 left-0  tablet:relative tablet:top-[-50px]">
        </div>

        {!success ? <div className="flex flex-col w-full bg-white p-5  space-y-5 tablet:px-10 tablet:py-20 tablet:drop-shadow-lg  tablet:rounded-md tablet:w-[560px]   desktop:space-y-6">
          <h1 className="text-2xl font-bold desktop:text-3xl">Create Account</h1>

      


          <FormControl className='flex space-x-3' >
            <FormControl isInvalid={errorFields[0]} >
              <FormLabel >First Name</FormLabel>
              <Input type="text" variant="filled" value={account?.firstName} onChange={(e) => { setAccount({ ...account, firstName: e.target.value }); if (e.target.value && errorFields[0]) { setErrorFields((prev) => { prev[0] == false; return prev }) } }} />
              {errorFields[0] && <FormErrorMessage>First Name required</FormErrorMessage>}
            </FormControl>

            <FormControl isInvalid={errorFields[1]}>
              <FormLabel >Last Name</FormLabel>
              <Input type="text" variant="filled" value={account?.lastName} onChange={(e) => { setAccount({ ...account, lastName: e.target.value }); if (e.target.value && errorFields[1]) { setErrorFields((prev) => { prev[1] == false; return prev }) } }} />
              {errorFields[1] && <FormErrorMessage>Last Name required</FormErrorMessage>}

            </FormControl>

          </FormControl>

          <FormControl isInvalid={errorFields[2]}>
            <FormLabel>Email</FormLabel>
            <InputGroup>
              <InputLeftElement>
              <button className="text-slate-500 ">
                    <AlternateEmailIcon />
                  </button>
              </InputLeftElement>
              <Input
                variant="filled"
                value={account?.email}
                type="email"
                autoComplete="off"
                onChange={(e) => {
                  setAccount({ ...account, email: e.target.value });
                  if (e.target.value && errorFields[1]) { setErrorFields((prev) => { prev[2] == false; return prev }) }
                }}
              />
            </InputGroup>
            {errorFields[3] && <FormErrorMessage>Email is required</FormErrorMessage>}

          </FormControl>



          <div className="space-y-3">


            <div className="flex w-full justify-between">
              <Link href="/user/login">
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
        </div> :
          <div className="flex flex-col w-full justify-center  bg-white p-5  space-y-12 tablet:px-10 tablet:py-20 tablet:drop-shadow-lg  tablet:rounded-md tablet:w-[560px]   desktop:space-y-8">
            <div className='text-2xl'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-14 h-14 text-green-600">
                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
              </svg>

            </div>

            <h1 className="text-2xl font-bold desktop:text-3xl">Success</h1>
            <p className='text-xl italic '>Verification Mail Sent.Please Verify Account</p>


            <Link href='/'>
              <button
                className="bg-gradient-to-r from-indigo-900 drop-shadow to-primary font-semibold text-white p-2 w-full font-xl rounded-full">
                Verified ? Go to Login
              </button>
            </Link>
          </div>}



      </form>
    </div>
    </>
    )


}

export default Register