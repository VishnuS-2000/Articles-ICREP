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
    



    return <div className="flex  w-full py-1 pb-8 px-8 flex-col tablet:px-16 desktop:px-20  desktop:max-w-[70%] space-y-5 ">

    
    <div className="flex w-full ">

        <h1 className="py-3 text-base desktop:text-lg  font-[600]">Journal Overview</h1>

    
    </div>

    <div className="">
                    <h1 className="text-sm desktop:text-base text-black font-[600]">Aim & Scope</h1>
                    <p className="text-justify my-4 text-sm desktop:text-base">
                    The ICREP journal of Interdisciplinary Studies aims to promote and disseminate Interdisciplinary research. It intends to provide a platform to conduct debate & discussions on contemporary issues. It further aims to act as an open access forum for sharing of ideas and knowledge. Thus, the journal would attempt to propagate the thoughts of young researchers and students thereby broadening the vistas of knowledge.
                    </p>

                    </div>
                    <h1 className="text-sm desktop:text-base text-black font-[600]">Journal Particulars</h1>

    <div className="flex flex-col py-5">
            {Object.keys(data).map((element,index)=>{
                return <OverviewCard key={index} title={element} description={data[element]}/>
            })}


    </div>
    
    <div className="flex justify-end">
    <button>
        <Link href={`/contact`} className="flex items-center  text-sm underline font-[500] ">
            <span>Contact Details</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
</svg>

        </Link>

    </button>
    </div>
    



    </div>





}






const OverviewCard=({title,description})=>{
    return <div className="py-1 flex  items-center justify-between cursor-pointer">            
            <h1 className="font-[600] text-gray-800 text-sm desktop:text-sm">{_.startCase(title)}</h1>
            <p className=" text-right font-[500] text-sm desktop:text-sm  text-gray-600">{description}</p>
        </div>

}
