import {useState,useEffect} from 'react'
import axios from "../axios"
import { useRouter } from 'next/router'
import Link from 'next/link'

const TopicBar=()=>{
    const [topics,setTopics]=useState([])
    
    const router=useRouter()
    useEffect(()=>{
        const uniqueTopics=[]
     
        const fetchData=async()=>{
    
        try{

            const response=await axios.get(`article/topics`)
                
            if(response){
                setTopics(response?.data.result?.rows)

            }

        }
        catch(err){
            console.log(err)
        }
    

    }

    fetchData()


    },[])



return <div className="hidden fixed top-[13.5%] desktop:flex  right-0 w-[20%]  bg-white  flex-col text-base border  border-l px-4 min-h-screen justify-start py-5">
     
<form className="flex  flex-col items-start justify-start w-full space-y-5  "  >
   
  


<div className='py-1 space-y-2' >
<p className='text-base font-[400] font-[500]'>Select Topic</p>


<div className='flex flex-wrap  w-full drop-shadow font-[500]'>
{topics.map((topic,index)=>{
            return <Link href={{pathname:'/',query:{topic:topic?.topic}}}>
            <button key={index}  className="rounded-[20px] my-1 mx-1 bg-line p-2 text-secondary text-sm " name='topic' >
                {topic?.topic}
            </button>
            </Link>
        })}
</div>


</div>

</form>


   
</div>

    
}


export default TopicBar