import axios from "../../../axios"
import useSWR,{mutate} from "swr"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArchiveIcon from '@mui/icons-material/Archive';
import {Tabs,TabList,Tab,TabPanel,TabPanels,Tooltip} from "@chakra-ui/react"
import { useCurrent } from "../useCurrent";
import { useDisclosure,Modal,ModalOverlay,ModalContent,ModalHeader,ModalCloseButton,ModalBody,ModalFooter,Button,Spinner} from "@chakra-ui/react";
import { useState,useEffect } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useNotification from "../../../hooks/useNotification";
import moment from "moment";
import { Unarchive } from "@mui/icons-material";

export const AnnouncementGrid=({toggler,setSelection})=>{


    const [url,setUrl]=useState('/announcement/active')
    const fetcher=async(url)=>{
        const response=await axios.get(url,{
          headers:{attributes:'id,title,file,dated,acceptContributions,description,status'}
        })

  
        return response?.data?.result
      }
  
    const {data,error}=useSWR(url,fetcher,{refreshInterval:'5000'})
      

    const handleSelection=(id)=>{
        setSelection(id)
        toggler(3)
    }



  

  
    return <>



       <Tabs variant={`solid-rounded`} size="sm" className="py-5">
  <TabList className="space-x-3">
    <Tab  _selected={{bg:'cyan.200'}} onClick={()=>setUrl('/announcement/active')}>Active</Tab>
    <Tab  _selected={{bg:'cyan.200'}} onClick={()=>setUrl('/announcement/archive')}>Archived</Tab>


<button className="flex  text-sm justify-between space-x-1 py-2  drop-shadow px-6 rounded-md text-white bg-gradient-to-r from-primary to-indigo-800 items-center" onClick={()=>{toggler(1); }}>
   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
<path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
</svg>


       <h1>Create</h1></button>

  </TabList>
  <TabPanels>
    <TabPanel>
    {data?.rows&&!error&&data?.count>0?<div className="grid grid-cols-1 py-4 gap-y-3">
        {data?.rows.map((element,index)=>{
            return <AnnouncementCard element={element} key={index} handleSelection={handleSelection} toggler={toggler}/>
        })}
    </div>:<>
            <div className="flex flex-col  w-full min-h-[350px] items-center p-3 justify-center mt-3">


{!data||error?<Spinner/>: <div className="flex flex-col items-center">
        <div className=" bg-gray bg-gradient-to-r from-slate-100 to-gray-200 rounded-full  flex items-center justify-center  w-[150px] h-[150px]">
        <svg className="h-16 w-16 stroke-red-200 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>
        </div>
        <h1 className="text-lg font-[500] py-4 text-slate-500">No Results/Data Found</h1>

        </div>}
</div>
            </>}
      </TabPanel>
      <TabPanel>
      {data?.rows&&!error&&data?.count>0?<div className="grid grid-cols-1 py-4 gap-y-3">
        {data?.rows.map((element,index)=>{
            return <AnnouncementCard element={element} key={index} handleSelection={handleSelection} toggler={toggler}/>
        })}
    </div>:<>
            <div className="flex flex-col  w-full min-h-[350px] items-center p-3 justify-center mt-3">


{!data||error?<Spinner/>: <div className="flex flex-col items-center">
        <div className=" bg-gray bg-gradient-to-r from-slate-100 to-gray-200 rounded-full  flex items-center justify-center  w-[150px] h-[150px]">
        <svg className="h-16 w-16 stroke-red-200 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>
        </div>
        <h1 className="text-lg font-[500] py-4 text-slate-500">No Results/Data Found</h1>

        </div>}
</div>
            </>}
      </TabPanel>
  </TabPanels>
</Tabs>




    </>

}

const AnnouncementCard=({element,handleSelection,toggler})=>{
    const {isOpen,onOpen,onClose}=useDisclosure()

    const {current,setCurrent}=useCurrent()
    const [loading,setLoading]=useState(false)
    const axiosPrivate=useAxiosPrivate()
    const {setNotification}=useNotification()

    const handleDelete=async()=>{
        try{
            setLoading(true)
            const response=await axiosPrivate.delete(`announcement/${element.id}`)
    
            if(response.status==200){
              setLoading(false)
              setNotification({status:'warning',message:`Announcement Deleted`,createdAt:moment()})
              onClose()
            }
          }
          catch(err){
            setLoading(false)
            setNotification({status:'error',message:'Try Again Later',createdAt:moment()})
          }
    }

    const handleArchive=async()=>{
        try{    
            const response=await axiosPrivate.put(`announcement/${element.id}/archive`)
            if(response?.status==204){
                setNotification({status:'warning',message:`Announcement Archived`,createdAt:moment()})
            }
        }catch(err){
            console.log(err)
            setNotification({status:'error',message:'Try Again Later',createdAt:moment()})
        }
    }

    const handleUnArchive=async()=>{
        try{    
            const response=await axiosPrivate.put(`announcement/${element.id}/active`)
            if(response?.status==204){
                setNotification({status:'warning',message:`Announcement Unarchived`,createdAt:moment()})
            }
        }catch(err){
            console.log(err)
            setNotification({status:'error',message:'Try Again Later',createdAt:moment()})
        }
    }
    


    return <div  className={element?.acceptContributions?`flex  font-[500] justify-between duration-500 p-5 bg-slate-100 rounded-md hover:bg-slate-200 drop-shadow`:`flex justify-between font-[500]  p-5 bg-slate-50 rounded-md `}>
                
                <button onClick={()=>{if(element?.acceptContributions){handleSelection(element?.id)}}} className="flex flex-[0.75] flex-col items-start relative">
                <h1 className="text-sm font-[600]">{element?.title}</h1>
                <p className="text-xs font-[500]">{element?.dated}</p>
                </button>
                
                <div className="space-x-3 z-[50]">
                    <Tooltip label={`Edit`}>
                    <button className="p-1 hover:bg-black duration-800 hover:text-white rounded-full" onClick={()=>{setCurrent({...current,announcement:element});toggler(2)}}>
                        <EditIcon/>
                    </button>

                    </Tooltip>

                    <Tooltip label={`Delete`}>

                    <button className="p-1 hover:bg-black duration-800 hover:text-white rounded-full" onClick={onOpen}>
                        <DeleteIcon/>
                        </button>
                    </Tooltip>

                    <Tooltip label={element?.status=="active"?`Archive`:`Unarchive`}>

                     {element?.status=="active"?<button className="p-1 hover:bg-black duration-800 hover:text-white rounded-full" onClick={handleArchive}>
                       <ArchiveIcon/>
                    </button>:<button className="p-1 hover:bg-black duration-800 hover:text-white rounded-full" onClick={handleUnArchive}>
                        <Unarchive/>
                    </button>}
                    </Tooltip>
                </div>


                <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay  bg='blackAlpha.300'
      backdropFilter='blur(10px)'/>
        <ModalContent>
          <ModalHeader>Confirm Delete</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p> <span className="font-[600]">{element?.title}</span> dated <span className="font-[600]">{element?.dated}</span> & all its data(including contributions,if any) will be permanantely deleted </p>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' variant='ghost' mr={3} onClick={onClose}>
              Close
            </Button>
            {loading?<Spinner color="red"/>:<Button colorScheme='red' variant='ghost' onClick={handleDelete}>Delete</Button>}
          </ModalFooter>
        </ModalContent>
      </Modal>
            </div>


}