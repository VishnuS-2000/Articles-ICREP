import { indigo } from "@mui/material/colors"
import { useState,useEffect } from "react"

export const ArticlePagination=({count,args,setArgs,itemsPerTab})=>{

    const [current,setCurrent]=useState(1)
    const [tabs,setTabs]=useState([])

    useEffect(()=>{
        var temp=[]
        for(var i=1; i<=Math.ceil(count/itemsPerTab);i++){
            temp.push(i)
        }

        setTabs(temp)
        setCurrent(Math.floor(args?.offset/itemsPerTab)+1)

    },[])
    
    console.log(current)

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
    
    
    return <div className="w-full flex justify-center">
        <div className="flex z-30 desktop:z-50 px-8 py-5 justify-start overflow-x-auto  bg-white top-[60px]  space-x-5 font-[500] desktop:space-x-8 desktop:top-[90px] w-full  desktop:py-2 desktop:max-w-[40%]">
      
    
      {tabs.map((element)=>{
          return <button className={`px-4 py-2  rounded-full ${current==element?'bg-indigo-400':'bg-indigo-50'}`} onClick={()=>{         setArgs({...args,options:{offset:args?.options?.limit*(element-1),limit:args?.options.limit,include:true}}); setCurrent(element); }}>
                  {element}
              </button>
        })}
      
  </div>

    </div> 
    
}