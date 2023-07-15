import axios, { axiosPrivate } from "../../../axios"
import useSWR from "swr"
import { Skeleton,Tooltip,Spinner} from "@chakra-ui/react"
import ArchiveIcon from '@mui/icons-material/Archive';
import { Unarchive } from "@mui/icons-material";
import { useEffect,useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useNotification from "../../../hooks/useNotification";
import moment from "moment";
export const PublicationGrid=({toggler,args,setArgs,setSelection})=>{

    const axiosPrivate=useAxiosPrivate()
    const {setNotification}=useNotification()

    const fetcher=async(args)=>{
        const response=await axios.get(args.url,{
          headers:args.options
        })

        return response?.data?.result
      }
    
    

    const {data,error}=useSWR({url:'/publication/group'},fetcher,{refreshInterval:'5000'}) 

    


    const handleNavigate=({volume,issue})=>{
       
        setArgs({...args,url:`/publication/search?volume=${volume}&issue=${issue}`,dataResetUrl:`/publication/search?volume=${volume}&issue=${issue}`})

        setSelection({volume:volume,issue:issue})
        toggler(1)
    }

    const handleArchive=async(id)=>{
        try{
            const response=await axiosPrivate.post(`/publication/issue/${id}/archive`)
            if(response?.status==204){
                setNotification({message:'Publication Archived',createdAt:moment(),status:'warning'})
            }
        
        }catch(err){
            console.log(err)
            setNotification({message:'Try again later',createdAt:moment(),status:'error'})
        }
    }

    const handleUnarchive=async(id)=>{
        try{
            const response=await axiosPrivate.post(`/publication/issue/${id}/unarchive`)
            if(response?.status==204){
                setNotification({message:'Publication unarchived',createdAt:moment(),status:'warning'})
            }
        
        }catch(err){
            console.log(err)
            setNotification({message:'Try again later',createdAt:moment(),status:'error'})
        }
    }

return <>

<div className="flex py-5">


 <button className="flex  text-sm justify-between space-x-1 py-2  drop-shadow px-6 rounded-md text-white bg-gradient-to-r from-primary to-indigo-800 items-center" onClick={()=>{toggler(2); }}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
<path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
</svg>


        <h1>Create</h1></button>

        </div>
        {data?.rows&&data.count>0 && !error?
<div className="grid grid-cols-4 w-full py-4 gap-5">

        <>{data?.rows?.map((element,index)=>{
            return <div key={index}  className={!element?.isArchived?`bg-green-200 hover:bg-green-400 duration-500 rounded-md drop-shadow flex justify-between items-center text-sm font-[500] p-5`:`bg-yellow-200 hover:bg-yellow-400 duration-500 rounded-md drop-shadow flex justify-between items-center text-sm font-[500] p-5`}>
                
                <button onClick={()=>handleNavigate({volume:element?.volume,issue:element?.issue})}className="flex-[0.75]">
                <div className="flex space-x-5">
                <h1>Volume {element?.volume} </h1>
                <h1>Issue {element?.issue}</h1>
                </div>
                
                </button>
            
                

{!element?.isArchived?<Tooltip label={`Archive`}>

<button className="p-1 hover:bg-black duration-800 hover:text-white rounded-full" onClick={()=>handleArchive(element?.id)}>
    <ArchiveIcon/>
</button>

</Tooltip>:<Tooltip label={`Unarchive`}>

<button className="p-1 hover:bg-black duration-800 hover:text-white rounded-full" onClick={()=>handleUnarchive(element?.id)}>
    <Unarchive/>
</button>

</Tooltip>}
            
            </div>
                
        })}</>


    </div>:<>
            <div className="flex flex-col  w-full min-h-[350px] items-center p-3 justify-center mt-3">


{!data||error?<Spinner/>:<h1 className="text-lg font-[500] py-4 ">No Results/Data Found</h1>}
</div>
            </>}
</>


}