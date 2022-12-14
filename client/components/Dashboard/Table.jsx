import { useCurrent } from "./useCurrent"
import useSWR from "swr"
import axios from "../../axios"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Avatar, Input, Spinner} from '@chakra-ui/react'

import { useEffect, useState } from "react";
import { useDisclosure,Modal,ModalOverlay,ModalContent,ModalHeader,ModalCloseButton,ModalBody,ModalFooter,Button } from "@chakra-ui/react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

import useNotification from "../../hooks/useNotification";

import moment from "moment";

import {
  Table,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react'


export const DataTable=({initials,args,changeArgs})=>{

  const {notification,setNotification}=useNotification()

    console.log(args)

    const fetcher=async(args)=>{
      const response=await axios.get(args.url,{
        headers:args.options
      })

      console.log(response?.data?.result)
      return response?.data?.result
    }


    const [selected,setSelected]=useState([])
    const {data,error,isValidating}=useSWR(args,fetcher)

    console.log(data,selected)

    const addSelected=(id)=>{
      setSelected([...selected,id])
      }

    const removeSelected=(id)=>{
      setSelected(selected.filter((e)=>{
        e!==id        
      }))
    }

    console.log(data)
    
    return <div className="mt-8 ">
     <TableSearch setArgs={changeArgs} args={args} placeholder={initials?.search?.placeholder} name={initials?.name}/>
    <TableControl name={initials?.name} count={data?.count} args={args} setArgs={changeArgs} controls={initials?.controls}/>

    <TableContainer>
    {data?.rows &&data.count>0 && !error?
<Table  variant="simple">
    
    <TableHeader headers={initials?.headers}/>
      {data?.rows.map((e)=>{
        return <TableRow setNotification={setNotification} element={e} name={initials?.name} args={args} fields={initials?.fields} addSelected={addSelected} removeSelected={removeSelected} selected={selected} toggler={initials.controls.edit.toggle}/>
      })}
      
      </Table>:isValidating?<div className="flex p-3 justify-center  mt-3">
      <h1 className="italic">Loading...</h1></div>:<div className="flex p-3 justify-center mt-3">
        <h1 className="italic">No {initials?.name+'s'} available</h1></div>
    }
      </TableContainer>
    </div>
  

}


export const TableSearch=({args,setArgs,placeholder,name})=>{


  const handleSearch=({target})=>{



    if(!target.value){
      setArgs({...args,url:`/${name}`,options:{offset:0,limit:args?.options.limit,include:true}})
      return
    }    
    
      setArgs({...args,url:`/${name}/search?term=${target.value}`,options:{offset:0,limit:args?.options.limit,include:true}})
  }

  return <div className="flex w-full my-2  ">
      <Input variant='filled' placeholder={`${placeholder}`}  onChange={handleSearch}/>
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

console.log(args)

return <div className="flex w-full py-4  items-center justify-between ">
    
    <div className="flex space-x-5 items-center">
    <p className="text-lg ">All({count?count:'0'})</p>
    <button className="flex text-base justify-evenly py-1  drop-shadow px-3 rounded-full text-white bg-gradient-to-r from-primary to-indigo-800 items-center" onClick={()=>{controls.create.toggle(); setCurrent({...current,[name]:{firstName:'Vishnu S',lastName:'S'}})}}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
<path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
</svg>


        Create</button>

    {/* <button>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
  <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
</svg>
</button> */}

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
        
            {headers?.map((e)=>{
                 
                return <Th class={`py-3  text-base`}>
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
    
     

    console.log(element)

    const handleSelection = () => {
      if (!selected.includes(element?.id)) {
        addSelected(element?.id);
      } else {
        removeSelected(element?.id);
      }
    };

    const handleEdit=()=>{setCurrent({...current,[name]:element}); toggler();}



    const handleDelete=async()=>{
      try{
        setLoading(true)
        const response=await axiosPrivate.delete(`${name}/${element.id}`)

        if(response.status==200){
          setLoading(false)
          setNotification({status:'warning',message:`${name} Deleted`,created:moment()})
          onClose()
        }
      }
      catch(err){
        setLoading(false)
        setNotification({status:'error',message:'Try Again Later',created:moment()})
      }

    }


    const { isOpen, onOpen, onClose } = useDisclosure()


  
    return (<Tr className="border border-slate-200 items-center">
 

        {fields.map((e)=>{
            
            if(e.type=="nested"){

              const nestedOject=e[e.name]

              print(nestedOject)
         
            }
            if(e.type=="icon"){

              return <Td className={`flex p-2 items-center  space-x-3 text-base`}>
                
              {element?.photo?<img src={`${process.env.NEXT_PUBLIC_BACKEND_IMAGE_URL}/${element?.photo}`} className="w-[35px] rounded-full h-[35px]"/>:<Avatar name={`${element[e.name]}`} size="sm"/>}
              <h1 className="text-gray-700">{element[e.name]?.length>e.limit?element[e.name].slice(0,e.limit):element[e.name]}</h1>

            </Td>

            }

            else if(e.type=="count"){

              return <Td className={`text-base`}>

              <h1 className="text-gray-700">{element[e.name]?.length}</h1>

            </Td>


            }

            else{
            return <Td className={`text-base`}>
              <h1 className="text-gray-700">{element[e.name]?.length>e.limit?element[e.name].slice(0,e.limit)+'...':element[e.name]}</h1>

            </Td>
            
            }

        })}
       
  
        <Td>
        <div class="">
          <button
            className="rounded-full  p-1  hover:bg-slate-200"
            onClick={handleEdit}
          >
            <EditIcon />
          </button>
  
          <button
            className="rounded-full  p-1  hover:bg-slate-200"
            onClick={onOpen}
          >
            <DeleteIcon />
          </button>
        </div>
        </Td>


          {/*Delete confirmation Modal*/}

        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
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
