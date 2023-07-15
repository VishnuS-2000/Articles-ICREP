import { useEffect } from "react"
import axios from "../axios"
import Link from "next/link"
const editorFolderId="1x6YdOwXtpXwGMSY8LtlSFuAwZ2Mfxx7s"
import {useState} from "react"
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import useSWR from "swr"
import _ from "lodash"
export const JournalOverview=()=>{
    

    const [expanded,setExpanded]=useState(false)

    const data={
        publisher:'Prof NR Madhava Menon ICREP,CUSAT',
        cheifEditor:'Dr.Vani Kesari A',
        frequency:'Quarterly',
        language:'English',
        startingYear:2022,
        format:'Online',
        subject:'Multidisciplinary',
        email:'icrep@cusat.ac.in',
        copyright:'Prof NR Madhava Menon ICREP,CUSAT,2022'


    }    
    



    return <div className="flex  w-full py-1 pb-16 px-5 flex-col tablet:px-16 desktop:px-10  desktop:max-w-full space-y-5 ">

    
    <div className="flex w-full ">


    
    </div>

  

    {/* <div className="flex flex-col py-5">
            {Object.keys(data).map((element,index)=>{
                return <OverviewCard key={index} title={element} description={data[element]}/>
            })}


    </div> */}
    
  
    



    </div>





}






const OverviewCard=({title,description})=>{
    return <div className="py-1 flex  items-center space-x-5 cursor-pointer text-secondary">            
            <h1 className="font-[500] text-sm desktop:text-sm">{_.startCase(title)}</h1>
            <p className=" text font-[500] text-sm desktop:text-sm  text-gray-600">{description}</p>
        </div>

}
