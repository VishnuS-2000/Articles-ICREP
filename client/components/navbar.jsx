import { useState,useEffect } from "react"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CloseIcon from '@mui/icons-material/Close';

import {    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,useDisclosure,Input,InputGroup,InputLeftAddon,InputRightAddon,TextArea,Textarea,Button,
    FormControl,
    FormLabel,
    FormErrorMessage,Popover,PopoverTrigger,PopoverContent,PopoverArrow,PopoverCloseButton,PopoverHeader,PopoverBody
} from "@chakra-ui/react"

import Link from "next/link";
import useNotification from "../hooks/useNotification"
import moment from "moment";

import axios from "../axios"
import { Notification } from "./Notification";
const icrepMobile="1ZPmp-Ux9077XbQyvG-MPU7F7O8r7TdKt"
const icrepDesktop="1Psv8Vnr6u4M1qXbmvLvysHuMPOyNpNLY"
const cusatMobile="1Vlzeyq3sk2V6yOiaI3pXajfXN3EVVilJ"
const cusatDesktop="169cf8tR5Xaut5HLm1-OanZ3h3Kt8d1lx"
const NavBar=()=>{
    const [scroll,setScroll]=useState(false)
    const [show,setShow] = useState(false)



    const [menu,setMenu] = useState(false)
    const handleScroll=()=>{
        if(window.scrollY>0){
            console('scroll')
            setShow(false)
            setScroll(true)
        }
        else{
            setScroll(false)
        }    

    }

        useEffect(()=>{window.addEventListener('scroll',handleScroll)
        return window.removeEventListener('scroll',handleScroll)
    
    })




        return <>

{menu?<div className="fixed  bg-primary top-0  duration-300  w-full h-full overflow-hidden  text-white desktop:hidden  z-50 top-[0] p-2 ">

<button className="absolute right-[20px] top-[17px]" onClick={()=>setMenu(false)}>

<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg>

</button>


<ul className="flex flex-col items-center justify-center h-full space-y-6 py-16 font-[400] text-base">
                      
                      

                      <Link href={`/`}>Home</Link>
                      <Link href={`/editors`}>Editorial Board</Link>
                      <Link href={'/publications'}>Publications</Link>
                      <Link href={'/contribute'}>Contribute</Link>
                      <Link href={`/contact`}>Contact Us</Link>
                      <Link href={`/user/login`}>Sign In/Register</Link>




            </ul>

</div>:<div className="fixed top-[-100%]  duration-300 w-full h-full overflow-hidden  text-white desktop:hidden  z-50 top-[0] p-3">

</div>
}

<div className="flex p-5 justify-end desktop:hidden">
            <button className="
            absolute right-[20px] top-[17px]" onClick={()=>{setMenu(true)}}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
<path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
</svg>

            </button>




           
    </div>


          <div className="flex h-[80px] p-4 desktop:p-5 items-center justify-between   w-full">
              
              <Link href={`https://icrep.cusat.ac.in/`}>
              <img src={`https://drive.google.com/uc?id=${icrepDesktop}`} className="flex-[0.10] max-w-[280px] h-[40px] hidden desktop:flex" />
              <img src={`https://drive.google.com/uc?id=${icrepMobile}`} className=" max-w-[100px]  h-[65px] flex desktop:hidden" />

              </Link>






              
             


            <div className="desktop:hidden flex flex-col">
            <span className=" flex justify-center text-center text-xs font-[600] text-primary">Prof NR Madhava Menon Interdisciplinary Centre for Research Ethics & Protocols</span>
            <span className="flex justify-center text-center text-xs font-[600] text-red-600">Cochin University of Science and Technology</span>
            <span className="flex justify-center text-center text-xs font-[600] ">Kochi,Kerala</span>
            </div>

              <Link href={`https://www.cusat.ac.in/`}>
              <img src={`https://drive.google.com/uc?id=${cusatDesktop}`} className="flex-[0.10] max-w-[320px] h-[50px] hidden desktop:flex"/>
              
              <img src={`https://drive.google.com/uc?id=${cusatMobile}`} className=" max-w-[100px]  h-[60px] flex desktop:hidden"/>
              </Link>

          </div>

      



      
       

          <div className="flex  w-full  hidden desktop:flex  p-2 justify-end ">
                <ul className="font-[600] flex  items-center space-x-8 text-slate-600 text-sm flex-[0.50] justify-evenly">
                    

                    <Link href='/'>
                        <button className="">
                          Home

</button>
                    </Link>
                    <Link href='/editors'>Editorial Board</Link>
                    <Link href='/publications'>Publications</Link>



                    <Popover>

  <PopoverTrigger>
  <button className="rounded-full p-1 flex items-center space-x-2">
  Support
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
</svg>

                    </button>
  </PopoverTrigger>
  <PopoverContent>
    <PopoverArrow />
    <PopoverCloseButton />
    <PopoverBody>
      <div className="flex flex-col space-y-3 w-full">

            
      <Link href={`/contact`} >
      <button className="hover:bg-slate-100 w-full  duration-500 flex justify-start">Contact Us</button>
      </Link>

    

      
      </div>

    </PopoverBody>
  </PopoverContent>
</Popover>
                

                    <Link href={`/user/login`}>
                    <button className="p-2 text-sm border border-primary rounded-md ">Sign In/Register</button>
                    </Link>


                    
                </ul>
             </div>

  



    
    
    </>

}



  
  


export default NavBar;