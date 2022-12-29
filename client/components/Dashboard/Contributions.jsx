import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
  ModalContent,
  ModalFooter,
  Button,
  Spinner
} from '@chakra-ui/react'
import { Layout } from "./Layout"
import useSWR from 'swr'
import axios from '../../axios'
import { useState } from 'react'

import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import moment from 'moment'
import useNotification from '../../hooks/useNotification'
import Link from 'next/link'

export const Contributions=()=>{

  const [args,setArgs]=useState({
    url:'/app/contribution',
    options:{
      offset:0,
      limit:8
    }
  })






  const fetcher=async(args)=>{

      const response=await axios.get(args.url,{
        headers:args.options
      })
      console.log(response?.data)
      return response?.data?.result
  }  

  const {data,isValidating,error} = useSWR(args,fetcher)



    return <Layout heading="Contributions">


        <TableContainer className='py-8'>
        <TableControl count={data?.count} args={args} setArgs={setArgs}/>

            <Table >

                <Thead>
                  <Tr className='bg-indigo-50 py-3 text-base border-tl border-slate-200  rounded-md border border-gray-200'>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th>Mobile Number</Th>
                  <Th>File</Th>
                  <Th>Actions</Th>

                  </Tr>
                </Thead>

                {data?.rows&&data?.count>0&&!error?<Tbody>
                    
                    {data?.rows.map((element)=>{
                        return   <TableRow element={element} />
                    })
                  
}
                </Tbody>:isValidating?<div className="flex p-3 justify-center  mt-3">
      <h1 className="italic">Loading...</h1></div>:<Tr className="flex p-3 justify-center mt-3">
        <h1 className="italic">No contributors available</h1></Tr>}
            </Table>
        </TableContainer>


    </Layout>
}


const TableControl=({count,args,setArgs})=>{

  const handlePrevious=()=>{
    if(args.options.offset-args?.options?.limit>=0){  
    setArgs({...args,options:{offset:args.options.offset-args?.options.limit>=0?args?.options.offset-args?.options.limit:0,limit:args?.options.limit,include:true}})
    }
  }

  const handleNext=()=>{
    if(args.options.offset+args.options?.limit<=count){
    setArgs({...args,options:{offset:args.options.offset+args?.options?.limit,limit:args.options.limit,include:true}})    
      
    }
  } 

return  <div className='flex items-center justify-between font-[500] p-2'>
  <h1>All({count?`${count}`:0})</h1>
  
  <div className="flex hidden space-x-8 desktop:flex items-center">
<p>{`Showing Entries ${args.options.offset}-${args.options.offset+args.options.limit>=count?count:args.options.offset+args.options.limit}`}</p>
   
   
    <button disabled={args.options.offset-args?.options?.limit>=0?false:true} className={`rounded-full ${args.options.offset-args?.options?.limit>=0?'bg-indigo-100':'bg-gray-200 text-white'}  p-1 flex items-center justify-center`} onClick={handlePrevious}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
</svg>

    </button>

    <button  disabled={args.options.offset+args?.options?.limit<=count?false:true} className={`rounded-full p-1 ${args.options.offset+args?.options?.limit<=count?'bg-indigo-100':'bg-gray-200 text-white'} flex items-center justify-center`} onClick={handleNext}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
</svg>

        </button>

</div> 
  
  
  </div>
 
}

const TableRow=({element})=>{



  const {isOpen,onOpen,onClose}=useDisclosure()
  const [viewOpen,setViewOpen]=useState(false)

  const googleDriveLink=`https://drive.google.com/file/d/${element?.file}/view`



  const handleViewOpen=()=>{
    setViewOpen(true)
  }

  const handleViewClose=()=>{
    setViewOpen(false)
  }

  return <Tr>
  <Td>{element?.name}</Td> 
  <Td>{element?.email}</Td>  
  <Td>{element?.contact}</Td> 
  <Td>


    <Link href={googleDriveLink} legacyBehavior>

  <a target="_blank">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
<path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625z" />
<path d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z" />
</svg>
</a>
    </Link>
    </Td>   
    <Td>
      <div>
      <div class="">
<button
className="rounded-full  p-1  hover:bg-slate-200"
onClick={handleViewOpen}
>
<VisibilityIcon />
</button>

<button
className="rounded-full  p-1  hover:bg-slate-200"

>
<DeleteIcon onClick={onOpen}/>
</button>

</div>
      </div>
      </Td>   
      <DeleteContributionModal  element={element} onClose={onClose} isOpen={isOpen} onOpen={onOpen}/>
      <ViewContributionModal element={element} onClose={handleViewClose} isOpen={viewOpen}/>
</Tr>
}







const DeleteContributionModal=({element,isOpen,onClose})=>{

  const {notification,setNotification}=useNotification()



  const [loading,setLoading]=useState(false)
  const handleDelete=async()=>{

    try{
      
      setLoading(true)
      
      const response=await axios.delete(`/app/contribution/${element?.id}`)

      if(response?.status==200){
      setNotification({status: 'warning', message: 'Contribution Deleted',createdAt:moment()})
      setLoading(false)
      onClose()
      }
      
    }catch(err){
      console.log(err)
      setLoading(false)
      setNotification({status: 'error', message: 'Try again later',createdAt:moment()})
    }
  }

  return <Modal isOpen={isOpen} onClose={onClose}>
  <ModalOverlay  bg='blackAlpha.300'
backdropFilter='blur(10px)'/>
  <ModalContent>
    <ModalHeader>Confirm Delete</ModalHeader>
    <ModalCloseButton />
    <ModalBody>
      <p><span className='font-[600]'>{element?.name}</span>'s contribution will be permanantely deleted</p>
    </ModalBody>

    <ModalFooter>
      <Button colorScheme='blue' variant='ghost' mr={3} onClick={onClose}>
        Close
      </Button>
      {loading?<Spinner color="red"/>:<Button colorScheme='red' variant='ghost' onClick={handleDelete}>Delete</Button>}
    </ModalFooter>
  </ModalContent>
</Modal>

}


const ViewContributionModal=({element,isOpen,onClose})=>{


  return <Modal isOpen={isOpen} onClose={onClose}>
  <ModalOverlay  bg='blackAlpha.300'
backdropFilter='blur(10px)'/>
  <ModalContent>
    <ModalHeader>Contribution</ModalHeader>
    <ModalCloseButton />
    <ModalBody>
        <div className="flex justify-between font-[500]">
        <h1 >Full Name</h1>
        <h1>{element?.name}</h1>
        </div>

        <div className="flex justify-between font-[500]">
        <h1>Email</h1>
        <h1>{element?.email}</h1>
        </div>
        
        <div className='flex justify-between font-[500]'>
        <h1>Contact</h1>
        <h1>{element?.contact}</h1>
        </div>
        
        <p className='mt-4'>{element?.bio}</p>
    </ModalBody>

    <ModalFooter>
 
    </ModalFooter>
  </ModalContent>
</Modal>

}