import { useState, useEffect } from "react"

import useNotification from "../hooks/useNotification"

export const Notification=({options})=>{

  const [show,setShow]=useState(false)
  const statusColors={success:'bg-green-500',error:'bg-red-500',warning:'bg-amber-500'}


  useEffect(()=>{

    setShow(true)
    
    setTimeout(()=>{
        setShow(false)
    },5000)



  },[options?.createdAt])





  return <>
  {show ? <div className={`duration-500 z-[50]  text-white min-w-[150px] desktop:px-8 px-4 py-4 rounded-md flex ${statusColors[options?.status]} bottom-[50px] right-[20px] fixed desktop:right-[100px]`}>
            <h1>{options?.title}</h1>
            <p>{options?.message}</p>
            <button className="font-[600] absolute top-[1px] right-0  desktop:top-[5px] desktop:right-[5px]" onClick={()=>{setShow(false)}}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>

            </button>
  </div>:<div className="duration-100 z-[50] desktop:px-8 py-4  min-w-[150px] px-4 text-white right-[20px] bottom-[-50px] fixed desktop:right-[100px] ">
  <h1>{options?.title}</h1>
  <p>{options?.message}</p>
<button className="font-[600] absolute top-[1px] right-0  desktop:top-[5px] desktop:right-[5px]" onClick={()=>{setShow(false)}}>
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>

    </button>
  </div>
  }</>


}