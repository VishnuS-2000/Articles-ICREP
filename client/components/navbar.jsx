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

{menu?<div className="fixed  bg-primary top-0  duration-300  w-full h-full overflow-hidden  text-white desktop:hidden  z-50 top-[0] p-3 ">

<button className="absolute right-[20px] top-[17px]" onClick={()=>setMenu(false)}>

<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg>

</button>


<ul className="flex flex-col items-center justify-center h-full space-y-6 py-16 font-[400] text-base">
                      
                      

                      <Link href={`/`}>Home</Link>
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


          <div className="flex h-[100px] p-4 desktop:p-8 items-center justify-between   w-full">
              
              <Link href={`https://icrep.cusat.ac.in/`}>
              <img src={`https://drive.google.com/uc?id=${icrepDesktop}`} className="flex-[0.10] max-w-[280px] h-[40px] hidden tablet:flex" />
              <img src={`https://drive.google.com/uc?id=${icrepMobile}`} className=" max-w-[100px]  h-[65px] flex tablet:hidden" />

              </Link>






              
              <div className="flex justify-end flex-[0.75]  hidden desktop:flex ">
                <ul className="font-[600] flex flex-[0.70] items-center space-x-8 text-slate-600 text-sm justify-end">
                    
                    <Link href='/publications'>Publications</Link>



                    <Popover>

  <PopoverTrigger>
  <button className="rounded-full border p-1 border-slate-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
</svg>
                    </button>
  </PopoverTrigger>
  <PopoverContent>
    <PopoverArrow />
    <PopoverCloseButton />
    <PopoverHeader>Support</PopoverHeader>
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


              <Link href={`https://www.cusat.ac.in/`}>
              <img src={`https://drive.google.com/uc?id=${cusatDesktop}`} className="flex-[0.10] max-w-[320px] h-[50px] hidden tablet:flex"/>
              
              <img src={`https://drive.google.com/uc?id=${cusatMobile}`} className=" max-w-[100px]  h-[60px] flex tablet:hidden"/>
              </Link>

          </div>

      



      
       



  



    
    
    </>

}


const ContributeModal=({isOpen, onOpen, onClose })=>{


    const [manuscript,setManuscript]=useState({
      name:'',
      phone:'',
      email:'',
      bio:'',
      
    })

    const fields = ['name','phone','email','bio']
    const [errorFields,setErrorFields]=useState([false,false,false,false])
    
  
  
    const [file,setFile]=useState(null)
    const [accepted,setAccepted]=useState(false)
  
    const {notification,setNotification}=useNotification()
    

    const validateFields=()=>{
      var valid=true
      fields.map((field,index)=>{
          if(!manuscript[field]){
            setErrorFields((prev)=>{
              prev[index]=true;
              valid=false
              return prev;
            })
          }
      })

      return valid

    }
  
  
    const handleChange=({target})=>{
        
      setAccepted(false)
      if(target.files.length){
          const raw=target.files[0]
  
          if(raw.type== 'application/msword' || raw.type=='application/vnd.openxmlformats-officedocument.wordprocessingml.document'||raw.type=='application/vnd.oasis.opendocument.text'){
  
            const url=URL.createObjectURL(target.files[0])
            setFile({
                raw:raw,
                url:url
            })
            setAccepted(true)
  
            console.log(url)
          }
  
        }


    }
  
  
    const uploadDocument=async()=>{
  
      try{
  
        const response=await axios.post(`/app/contribution/upload`,{file:file.raw},{
          headers:{
              "Content-Type": "multipart/form-data",
          }
        
      })
  
      
      
      if(response.status==200){

      return response?.data
      
      }

      }
  
      catch(err){
          
          setNotification({status:'error',message:'Document Upload Failed!',createdAt:moment()})
      }
  
      }
  
   
  
  
  
  
    const handleSubmit=async(e)=>{
        e.preventDefault()

        try{
          
          if(!validateFields()){
            return 
        }

        if(!file?.raw){
          return 
        }

      
          var documentId={}
        
          
          documentId=await uploadDocument()

          console.log(documentId)
          
          const response=await axios.post(`/app/contribution`,{ 
            name:manuscript.name,
            contact:'+91 '+manuscript.phone,
            email:manuscript.email,
            bio:manuscript.bio,
            file:documentId?.id
          })

          if(response.status==204){
            setNotification({status:'error',message:'Contribution Already Exists',createdAt:moment()})
          }

          if(response?.status==200){
            setNotification({status:'success',message:'Successfully Contributed',createdAt:moment()})
          }

          setManuscript({
            name:'',
            phone:'',
            email:'',
            bio:'',
            
          })

          setAccepted(false)
          setFile(null)

          setTimeout(onClose,2000)
      
  
      }
        
  
      catch(err){
        console.log(err)
        setNotification({status:'error',message:'Try Again Later',createdAt:moment()})
      }
  
    }
  
  
    return <Modal isOpen={isOpen} onClose={onClose} blockScrollOnMount={false} isCentered>
    <ModalOverlay   bg='blackAlpha.300'
      backdropFilter='blur(10px)'/>
    <ModalContent>
  
    {notification?.createdAt&&<Notification options={notification}/>}


    <form onSubmit={handleSubmit}>
      <ModalHeader>
      <div className='space-y-2'>
      <div className='text-sm font-poppins font-[500]'>
      </div>
      
        <h1 className='text-lg font-[poppins] desktop:text-xl'>Submit Your Manuscript</h1>
        <p className='font-[poppins] text-sm text-slate-600'>Please fill your correct details.</p>
        </div>
      </ModalHeader>
  
      
      <ModalCloseButton />
      <ModalBody>

    <FormControl isInvalid={errorFields[0]}>

    <FormLabel>Full Name</FormLabel>
      <Input variant='filled'   value={manuscript.name} onChange={(e)=>{setManuscript({...manuscript,name:e.target.value}); if(errorFields[0]&&e.target.value){setErrorFields((prev)=>{prev[0]=false; return prev})}}}/>
    {errorFields[0]&&<FormErrorMessage>Name of Contributor required</FormErrorMessage>}
    </FormControl>



    <FormControl isInvalid={errorFields[1]}>

      <FormLabel>Phone Number</FormLabel>
      <InputGroup>
      <InputLeftAddon  required={true} >+91</InputLeftAddon>
      <Input type='tel' variant='filled'  value={manuscript.phone} onChange={(e)=>{setManuscript({...manuscript,phone:e.target.value}); if(errorFields[1]&&e.target.value){setErrorFields((prev)=>{prev[1]=false; return prev})}}}/>
      </InputGroup>
  
      {errorFields[1]&&<FormErrorMessage>Phone Number required</FormErrorMessage>}

  </FormControl>

  <FormControl isInvalid={errorFields[2]}>
      <FormLabel>Email</FormLabel>
      <InputGroup>
  
      <Input type='email'  variant='filled'   value={manuscript.email} onChange={(e)=>{setManuscript({...manuscript,email:e.target.value}); if(errorFields[2]&&e.target.value){setErrorFields((prev)=>{prev[2]=false; return prev})}}}/>
      </InputGroup>

      {errorFields[2]&&<FormErrorMessage>Email required</FormErrorMessage>}

  </FormControl>



  <FormControl isInvalid={errorFields[3]}>
    <FormLabel>Bio</FormLabel>
      <Textarea placeholder='Bio' resize="none" variant="filled"  value={manuscript.bio} onChange={(e)=>{setManuscript({...manuscript,bio:e.target.value}); if(errorFields[3]&&e.target.value){setErrorFields((prev)=>{prev[3]=false; return prev})}}}/>
      {errorFields[3]&&<FormErrorMessage>Bio required</FormErrorMessage>}

  </FormControl>



  <FormControl>
    <FormLabel>File</FormLabel>
      <Input type='file' placeholder='document' variant='outline' required={true} onChange={handleChange} />
      {!accepted&&<p className='text-red-600 font-[500] text-sm'>File not accepted,Try Again</p>}
      <p className='text-slate-600 text-sm'>Accepted File types : .doc,.docx,.odt</p>
      </FormControl>
    

      </ModalBody>
  
    
  
      <ModalFooter className="space-x-3">
        <button  variant="solid" mr={5} onClick={onClose} className='bg-red-500 px-2 py-2 text-white rounded-md'>
          Close
        </button>
      </ModalFooter>
      </form>
    </ModalContent>
  
  </Modal>
  
  }


export default NavBar;