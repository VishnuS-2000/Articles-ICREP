import { Input } from "@chakra-ui/react"
import { useState } from "react"
export const DataSearch=({args,setArgs,toggleToResult,placeholder,name})=>{

    const [term,setTerm]=useState(null)
    const handleSearch=()=>{
      if(!term){
        return
      }    
        setArgs({...args,url:`/${name}/search?term=${term}`,options:{offset:0,limit:args?.options.limit,include:true}})
        toggleToResult()
    }
  
    return <div className="flex w-full pt-5 relative">
        <Input variant='filled' placeholder={placeholder} className="text-sm placeholder:text-sm " onChange={({target})=>{setTerm(target.value)}} />
        <button onClick={handleSearch} className="bg-gradient-to-r from-primary to-indigo-600 px-3 absolute text-white p-2 rounded-md right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
  <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clipRule="evenodd" />
</svg>
        </button>
    
    </div>
  
  }