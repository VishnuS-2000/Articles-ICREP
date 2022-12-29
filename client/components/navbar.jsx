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
    FormErrorMessage
} from "@chakra-ui/react"

import Link from "next/link";
import useNotification from "../hooks/useNotification"
import moment from "moment";

import axios from "../axios"
import { Notification } from "./Notification";

const NavBar=()=>{
    const [scroll,setScroll]=useState(false)
    const [show,setShow] = useState(false)

    const {isOpen,onOpen,onClose}=useDisclosure()
    
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

          <div className="flex h-[100px] p-4 desktop:p-8 items-center justify-between   w-full">
              <img src="./assets/logo/icrep-desktop.png" className="flex-[0.10] max-w-[320px] h-[40px] hidden tablet:flex" />
              <img src="./assets/logo/icrep.png" className=" max-w-[100px]  h-[65px] flex tablet:hidden" />

              
              <div className="flex justify-end flex-[0.75]  hidden desktop:flex ">
                <ul className="font-[600] flex flex-[0.70] items-center space-x-8 text-slate-600 text-base justify-end">
                    
                    <Link href='/publications'>Publications</Link>
                    <button className="rounded-full border p-1 border-slate-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
</svg>
                    </button>

                    <Link href={`/user/login`}>
                    <button className="p-2 border border-primary rounded-md ">Sign In/Register</button>
                    </Link>
                </ul>
             </div>
              
              <img src="./assets/logo/cusat-desktop.png" className="flex-[0.10] max-w-[330px] h-[60px] hidden tablet:flex"/>
              <img src="./assets/logo/cusat.png" className=" max-w-[100px]  h-[60px] flex tablet:hidden"/>


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
      <InputLeftAddon children='+91'  required={true} />
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
        {accepted?<button type='submit' color="" variant='solid' className='bg-gradient-to-r px-2 py-2 from-primary to-indigo-800 text-white rounded-md'>Submit</button>:<button type='submit' className="px-2 rounded-md py-2 text-gray-200"  disabled={true} variant='solid'>Submit</button>}
      </ModalFooter>
      </form>
    </ModalContent>
  
  </Modal>
  
  }


export default NavBar;