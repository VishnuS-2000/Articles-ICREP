import { useEffect } from 'react'


import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box
  } from '@chakra-ui/react'

import Link from 'next/link'
import { useState } from 'react'
import axios from "../axios"
export const PublicationsInfoContainer=()=>{

    const [issues,setIssues]=useState()

    useEffect(()=>{
        const fetchIssues=async()=>{
            const response=await axios.get('/article/issues')

            if(response){
                    console.log(response?.data?.result?.rows)
                    setIssues(response?.data?.result?.rows)
            }

    }
    fetchIssues()


    },[])




    return <div className="py-5  flex flex-col rounded-md bg-slate-50 w-full  w-full desktop:max-w-[20%] relative">
                <h1 className="flex px-6 items-center space-x-3  text-base  desktop:text-sm font-[500] ">
                

                    <span>
                    Recent Publications(Volume I)
                        </span>
                                  </h1>

        <div className='px-5 my-2'>
                {issues?.map((element,index)=>{

                 return <Link key={index} href={`/search?issue=${element?.issue}&#results`} className='flex items-center p-2 rounded-md hover:bg-slate-200  justify-between duration-500 text-sm desktop:text-base '>
                       {`Issue ${element?.issue}`} 
                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
</svg>

                    </Link>
                })}
        </div>
                       

        </div>




}

