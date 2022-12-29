import dynamic from 'next/dynamic'
import { useEffect } from "react"
import Script from 'next/script'

export const TextEditor=()=>{

        useEffect(()=>{

            const createTextEditor=async()=>{

                const Quill=await import("quill");



            }

        
        },[])
   
    





    return <>
        

    </>
}