import { useEffect } from "react"
import axios from "../axios"
import Link from "next/link"
const editorFolderId="1x6YdOwXtpXwGMSY8LtlSFuAwZ2Mfxx7s"
import {useState} from "react"
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import useSWR from "swr"

export const EditorsNote=()=>{
    

    const [expanded,setExpanded]=useState(false)

    
    const fetchData=async()=>{
        const temp={}
        const response=await axios.get(`/app/folder/${editorFolderId}`)
    
        if(response){
            response?.data?.result?.exports?.map((element)=>{

                if(element.type=="text/plain"){
                    temp[            'message']=element?.result     
                }
                else if(element.type=="text/csv"){
                    const editors=element?.result.split('\r\n')
                    const editorDetails=editors[0].split(',')
                    const name=editorDetails[0]
                    const email=editorDetails[1]
                    const photo=editorDetails[2]
                    const designation=editorDetails.slice(3,editorDetails.length).join().replaceAll(`"`,'')
                    
                    temp['editor']={name,email,photo,designation}
                    

                    
                }



            })

            return temp
        }
        
        }


        const {data,error,isValidating} =useSWR(`/app/folder/${editorFolderId}`,fetchData)




    return <div className="flex  w-full py-8 px-8 flex-col tablet:p-16 desktop:px-20 desktop:py-12 desktop:max-w-[70%] space-y-5 ">

    
    <div className=" ">

        <h1 className="py-3 text-base desktop:text-lg font-[600]">Cheif Editors Message</h1>
        {isValidating?
        <SkeletonText noOfLines={15} spacing={2} className=""/>:
        <p className="hidden desktop:flex desktop:text-base text-slate-900 text-justify my-2">
            {data?.message}
        </p>}



<div className="flex flex-col items-start font-[400]">
        <p className=" text-sm flex desktop:hidden  text-justify my-2">
            {expanded?data?.message:data?.message?.slice(0,350)}        
        </p>

        {!expanded&&!isValidating&&<button className="text-xs desktop:hidden font-[500]" onClick={()=>setExpanded(true)}>...Read More</button>}

        </div>
        


        <div className="flex items-baseline my-2 w-full">
        <Link href={`/editors`}>
        <button className="flex w-[180px]  underline  text-slate-primary text-xs tablet:text-base font-[500] text-secondary">Editorial Board</button>
        </Link>




        <div className="flex flex-col items-end text-right p-2  w-full ">

        {isValidating?<>
            <SkeletonCircle size='50px' className="flex desktop:hidden" />
            <SkeletonCircle size='60px' className="hidden desktop:flex"/>
        </>
:<img src={`https://drive.google.com/uc?id=${data?.editor?.photo}`} className="tablet:w-[60px] tablet:h-[60px] h-[50px] w-[50px] rounded-full"/>
        }        
        <div>
        
        {isValidating?<SkeletonText noOfLines={1} />:<h1 className="text-xs tablet:text-base font-[500]">{data?.editor?.name}</h1>}
        {isValidating?<SkeletonText noOfLines={1}/>:<p className="text-xs tablet:text- text-secondary">{data?.editor?.designation}</p>}
        
        </div>
        
        </div>
    </div>

    </div>



    </div>





}





