import { useEffect } from "react"
import axios from "../axios"
import Link from "next/link"
const editorFolderId="1x6YdOwXtpXwGMSY8LtlSFuAwZ2Mfxx7s"
import {useState} from "react"
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import useSWR from "swr"

export const AboutJournal=()=>{
    

    const [expanded,setExpanded]=useState(false)

    
    const fetchData=async()=>{
        const temp={}
        const response=await axios.get(`/app/folder/${editorFolderId}`)
    
        if(response){
            response?.data?.result?.exports?.map((element)=>{

                if(element.type=="text/plain"){
                    temp[            'message']=element?.result     
                }
                // else if(element.type=="text/csv"){
                //     const editors=element?.result.split('\r\n')
                //     const editorDetails=editors[0].split(',')
                //     const name=editorDetails[0]
                //     const email=editorDetails[1]
                //     const photo=editorDetails[2]
                //     const profileURL=editorDetails[3]
                //     const designation=editorDetails.slice(4,editorDetails.length).join().replaceAll(`"`,'')
                    
                //     temp['editor']={name,email,photo,profileURL,designation}
                    

                    
                // }



            })

            return temp
        }
        
        }


        const {data,error,isValidating} =useSWR(`/app/folder/${editorFolderId}`,fetchData)




    return <div className="flex  w-full py-5 px-8 flex-col tablet:px-16 desktop:px-20 desktop:py-8 desktop:max-w-[70%] space-y-5 ">

    
    <div className=" ">

        <h1 className="py-3 text-base desktop:text-lg font-[600]">About the Journal</h1>
        {!data?
        <SkeletonText noOfLines={19} spacing={2} className=""/>:
        <p className="hidden desktop:flex desktop:text-base text-slate-900 text-justify my-2">
            {data?.message}
        </p>}



<div className="flex flex-col items-start font-[400]">
        <p className=" text-sm flex desktop:hidden  text-justify my-2">
            {expanded?data?.message:data?.message?.slice(0,350)}        
        </p>

        {!expanded&&!data&&<button className="text-xs desktop:hidden font-[500]" onClick={()=>setExpanded(true)}>...Read More</button>}

        </div>
        


       

    </div>



    </div>





}





