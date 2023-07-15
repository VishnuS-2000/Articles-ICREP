import { useState,useEffect } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { Avatar } from '@chakra-ui/react';
import moment from 'moment'

import Link from "next/link"
import _ from "lodash"


export const ArticleCard=({data})=>{


    return  <div className="flex flex-col flex-[1] py-2 ">
    
    
    <Link href={`/d/${data?.id}`}>
    <h1 className="text-sm text-slate-700 font-[600] text-justify  desktop:text-base font-[500] cursor-pointer  hover:underline duration-400">{data?.title}</h1>
    </Link>
    <div className='flex space-x-2 text-sm text-slate-600 '>
        <p>{data?.type}</p>
        <p>
        •
        </p> <p>{`Volume ${data?.issue?.volume}`}</p>
        <p>•</p>
        <p>{`Issue ${data?.issue?.issue}`}</p>
        <p>
        • 
        </p>
        <span> </span>
        <p className='hidden desktop:flex'>
        {`${data?.issue?.period}`}
        </p>
        <p className='hidden desktop:flex'>
        •
        </p>
        <p>{data?.issue?.year}</p>
    </div>


</div>




}