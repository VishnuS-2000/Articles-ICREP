import { useState,useEffect } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { Avatar } from '@chakra-ui/react';
import moment from 'moment'

import Link from "next/link"

export const ArticleCard=({data})=>{


    return  <div className="flex flex-col flex-[1] py-2 ">
    
    
    <Link href={`/d/${data?.id}`}>
    <h1 className="text-sm decoration-indigo-800 text-justify  desktop:text-lg font-[600] cursor-pointer my-2 hover:underline duration-400">{data.title}</h1>
    </Link>
    <div className='flex space-x-2 text-sm text-slate-600 '>
        <p>{data?.type}</p>
        <p>
        •
        </p>
        <p>{`Issue ${data.issue}`}</p>
        <p>
        •
        </p>
        <p>{`Volume ${data.volume}`}</p>
        <p>•</p>
        <p>{data?.year}</p>
    </div>


</div>




}