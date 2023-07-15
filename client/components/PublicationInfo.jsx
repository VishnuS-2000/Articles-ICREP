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
import useSWR from 'swr'
export const PublicationsInfoContainer=()=>{

    const fetcher=async(args)=>{
      const response=await axios.get(args.url,{
        headers:args.options
      })

      return response?.data?.result
    }

    const {data,loading} = useSWR({url:'/publication/recent',options:{limit:8,offset:0}},fetcher)



    return <div className="py-5 desktop:py-12  flex flex-col rounded-md  border border-gray-200 w-full  w-full desktop:max-w-[20%] relative">
                <h1 className="flex px-6 items-center text-secondary space-x-3  text-sm  desktop:text-base font-[500] ">
                

                    <span className='font-[600]'>
                    Recent Publications
                        </span>
                                  </h1>

        <div className='px-5 my-2 text-sm'>
                {data?.rows?.map((element,index)=>{

                 return <Link key={index} href={`/publications?volume=${element?.volume}&issue=${element?.issue}`} className='flex items-center p-2 rounded-md hover:bg-slate-200  justify-between duration-500 text-sm desktop:text-sm '>
                       <div className="flex space-x-3">
                       <span>{`Volume ${element?.volume} `}</span>
                       <span>{`Issue ${element?.issue}`} </span>
                       </div>
                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
</svg>

                    </Link>
                })}
        </div>
                       

        </div>




}

