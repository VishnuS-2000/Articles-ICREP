import { useEffect } from "react"
import axios from "../axios"
import Link from "next/link"
const editorFolderId="1x6YdOwXtpXwGMSY8LtlSFuAwZ2Mfxx7s"
import {useState} from "react"
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import useSWR from "swr"

export const JournalOverview=()=>{
    

    const [expanded,setExpanded]=useState(false)

    const data={
        publisher:'Prof NR Madhava Menon ICREP,CUSAT',
        frequency:'Quarterly',
        language:'English',
        year:2022,
        format:'Online',
        subject:'Multidisciplinary'


    }    
    



    return <div className="flex  w-full py-5 px-8 flex-col tablet:px-16 desktop:px-20 desktop:py-16 desktop:max-w-full space-y-5 ">

    
    <div className="flex w-full ">

        <h1 className="py-3 text-base desktop:text-lg  font-[600]">Journal Overview</h1>

    
    </div>

    <div className="">
                    <h1 className="text-base text-black font-[500]">Aim & Scope</h1>
                    <p className="text-justify my-4 text-sm desktop:text-base">
                    The ICREP journal of Interdisciplinary Studies aims to promote and disseminate Interdisciplinary research. It intends to provide a platform to conduct debate & discussions on contemporary issues. It further aims to act as an open access forum for sharing of ideas and knowledge. Thus, the journal would attempt to propagate the thoughts of young researchers and students thereby broadening the vistas of knowledge.
                    </p>

                    </div>

    <div className="grid grid-cols-1 desktop:grid-cols-3 py-5 desktop:gap-y-5">
            {Object.keys(data).map((element,index)=>{
                return <OverviewCard key={index} title={element[0].toUpperCase()+element.slice(1,data?.length)} description={data[element]}/>
            })}


    </div>


    </div>





}






const OverviewCard=({title,description})=>{
    return <div className="py-1 flex flex-col items-center cursor-pointer">
            <h1 className="font-[600] text-gray-800 text-sm desktop:text-sm underline">{title}</h1>
            <p className="font-[500] text-sm desktop:text-sm my-1 text-gray-600">{description}</p>

        </div>

}
