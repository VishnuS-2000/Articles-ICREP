import {useState,useEffect} from 'react'
const TopicBar=()=>{
    const [topics,setTopics]=useState([])
    useEffect(()=>{
        const uniqueTopics=[]
     
        const fetchData=async()=>{
    
        try{

            const response=await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/articles`)

            response.data.result.rows.map((e)=>{
                if(!uniqueTopics.includes(e.topic)){
                    uniqueTopics.push(e.topic)
                }
            })
            
        
            setTopics(uniqueTopics)

        }
        catch(err){
            // console.log(err)
        }
    

    }

    fetchData()


    },[])

    const handleTopic=(e)=>{
        e.preventDefault()
            
        // router.push(`/search?topic=${e.target.value}`)        
        }



return <div className="hidden desktop:flex fixed right-0 w-[20%]  bg-white  flex-col text-base border  border-l px-4 min-h-screen justify-start py-5">
     
<form className="flex  flex-col items-start justify-start w-full space-y-5  "  >
   
  


<div className='py-1 space-y-2' >
<p className='text-base font-[400]'>Select Topic</p>


<div className='flex flex-wrap  w-full drop-shadow font-[500]'>
{topics.map((topic,index)=>{
            return<button key={index}  className="rounded-[20px] my-1 mx-1 bg-line p-2 text-secondary text-sm " name='topic' onClick={handleTopic} value={topic} >
                {topic}
            </button>
        })}
</div>


</div>

</form>


   
</div>

    
}


export default TopicBar