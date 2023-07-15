import { useCurrent } from "./useCurrent"
import useSWR from "swr"
import axios from "../../axios"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Avatar, Input, Skeleton, Spinner,Stack,Tooltip} from '@chakra-ui/react'

import { useEffect, useState } from "react";
import { useDisclosure,Modal,ModalOverlay,ModalContent,ModalHeader,ModalCloseButton,ModalBody,ModalFooter,Button } from "@chakra-ui/react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useNotification from "../../hooks/useNotification";

import moment from "moment";
import _ from "lodash"

import {
  Table,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react'

import Image from "next/image";

export const DataTable=({initials,args,changeArgs})=>{

  const {notification,setNotification}=useNotification()


    const fetcher=async(args)=>{
      const response=await axios.get(args.url,{
        headers:args.options
      })

      return response?.data?.result
    }


    const [selected,setSelected]=useState([])
    const {data,error,isValidating}=useSWR(args,fetcher,{refreshInterval:'5000'})


    const addSelected=(id)=>{
      setSelected([...selected,id])
      }

    const removeSelected=(id)=>{
      setSelected(selected.filter((e)=>{
        e!==id        
      }))
    }

    
    return <div className="mt-8 ">
    <TableControl name={initials?.name} count={data?.count} args={args} setArgs={changeArgs} controls={initials?.controls}/>

    <TableContainer>
    {data?.rows &&data.count>0 && !error?
<Table  variant="simple">
    
    <TableHeader headers={initials?.headers}/>
      {data?.rows.map((e,index)=>{
        return <TableRow key={index} setNotification={setNotification} element={e} name={initials?.name} args={args} fields={initials?.fields} addSelected={addSelected} removeSelected={removeSelected} selected={selected} toggler={initials.controls.edit.toggle}/>
      })}
      
      </Table>:<div className="flex flex-col w-full min-h-[350px] items-center p-3 justify-center mt-3">


        {!data||error?<Spinner/>:<>
        <div className="flex flex-col items-center">
        <div className=" bg-gray bg-gradient-to-r from-slate-100 to-gray-200 rounded-full  flex items-center justify-center  w-[150px] h-[150px]">
        <svg className="h-16 w-16 stroke-red-200 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>
        </div>
        <h1 className="text-lg font-[500] py-4 text-slate-500">No Results/Data Found</h1>

        </div>
        </>
        }
        </div>
    }
      </TableContainer>
    </div>
  

}




export const TableControl=({name,count,controls,args,setArgs})=>{
  const {current,setCurrent}=useCurrent()
  

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


return <div className="flex w-full py-4  items-center justify-between  font-[500]">
    
    <div className="flex space-x-5 items-center">
    <p className=" ">All({count?count:'0'})</p>
   


</div>


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

export const TableHeader = ({headers}) => {
    
        return (
          <Tr className="bg-indigo-50 border-tl border-slate-200  rounded-md border border-gray-200">
        
            {headers?.map((e,index)=>{
                 
                return <Th key={index} class={`py-3  `}>
                <h1 className="font-[500]">{e.name}</h1>
              </Th>
            })}
          
          </Tr>
        );
      };


      export const TableRow= ({
    element,
    selected,
    addSelected,
    removeSelected,
    fields,toggler,name,
    args,
    setNotification
  }) => {

    const axiosPrivate=useAxiosPrivate()

    const {current,setCurrent}=useCurrent()

    const [loading,setLoading]=useState(false)    
    
     


    const handleSelection = () => {
      if (!selected.includes(element?.id)) {
        addSelected(element?.id);
      } else {
        removeSelected(element?.id);
      }
    };

    const handleEdit=()=>{
  
      setCurrent({...current,[name]:element}); toggler();}



    const handleDelete=async()=>{
      try{
        setLoading(true)
        const response=await axiosPrivate.delete(`${name}/${element.id}`)

        if(response.status==200){
          setLoading(false)
          setNotification({status:'warning',message:`${_.startCase(name)} Deleted`,createdAt:moment()})
          onClose()
        }
      }
      catch(err){
        setLoading(false)
        setNotification({status:'error',message:'Try Again Later',createdAt:moment()})
      }

    }


    const { isOpen, onOpen, onClose } = useDisclosure()


  
    return (<Tr className="items-center text-sm font-[500]">
 

        {fields.map((e,index)=>{
            
            if(e.type=="nestedWithIcon"){

              const nestedOject=element[e.name]

              return<div key={index} className="items-center px-3 py-4 space-x-2 cursor-pointer flex  overflow-x-auto max-h-[100px]"> 
                
                {nestedOject?.map((obj,index)=>{

                  return <Tooltip key={index} label={obj?.name}>
                    {obj?.photo?<Image width={30} height={30} src={`${process.env.NEXT_PUBLIC_BACKEND_IMAGE_URL}/${obj?.photo}`} alt={`${obj?.name}`} className="w-[30px] rounded-full h-[30px]"/>:<Avatar name={`${obj?.name}`} size="sm"/>}
                     
                    </Tooltip>
                    

              })

            }
              </div> 

            }

            else if(e.type=="nestedObject"){

              const nestedObject = element[e.name]

              return <Td key={index}>
              {e?.subFields?.map((sub,index)=>{
                  return <span key={index}>{nestedObject[sub]}</span>
              })}

</Td>
            }
            else if(e.type=="icon"){

              return <Td key={index}  className={`flex items-center  space-x-3 `}>
                
              {element?.photo?<Image alt="author-icon" src={`${process.env.NEXT_PUBLIC_BACKEND_IMAGE_URL}/${element?.photo}`} className="w-[30px] rounded-full h-[30px]"/>:<Avatar name={`${element[e.name]}`} size="sm"/>}
              <h1 className="text-gray-700">{element[e.name]?.length>e.limit?element[e.name].slice(0,e.limit):element[e.name]}</h1>

            </Td>

            }

            else if(e.type=="count"){

              
              return <Td key={index} className={``}>
                
              <h1 className="text-gray-700">{element[e.name]?.length}</h1>

            </Td>


            }

            else if(e.type=="localFile"){

              return <Td key={index} className={``}>
                <a href={`${process.env.NEXT_PUBLIC_BACKEND_DOCUMENT_URL}/${element[e.name]}`} download>

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
</svg>
                </a>

            </Td>


            }

            else{
            return <Td key={index} className={``}>
              <h1 className="text-gray-700">{element[e.name]?.length>e.limit?element[e.name].slice(0,e.limit)+'...':element[e.name]}</h1>

            </Td>
            
            }

        })}
       
  
        <Td>
        <div class="">
          <Tooltip label={`Edit`}>
          <button
            className="rounded-full  p-1  hover:bg-black duration-900 hover:text-white"
            onClick={handleEdit}
          >
            <EditIcon />
          </button>
          </Tooltip>

          <Tooltip label={`Delete`}>
          <button
            className="rounded-full  p-1  hover:bg-black duration-900 hover:text-white"
            onClick={onOpen}
          >
            <DeleteIcon />
          </button>
          </Tooltip>
        </div>
        </Td>


          {/*Delete confirmation Modal*/}

        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay  bg='blackAlpha.300'
      backdropFilter='blur(10px)'/>
        <ModalContent>
          <ModalHeader>Confirm Delete</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>{name[0].toUpperCase()+name.slice(1,name.length)} <span className="font-[600]">{element[fields[0]?.name]}</span> with <span className="font-[600]">{element[fields[1]?.name]}</span> & all its data will be permanantely deleted </p>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' variant='ghost' mr={3} onClick={onClose}>
              Close
            </Button>
            {loading?<Spinner color="red"/>:<Button colorScheme='red' variant='ghost' onClick={handleDelete}>Delete</Button>}
          </ModalFooter>
        </ModalContent>
      </Modal>
  
      </Tr>
    );
  };
