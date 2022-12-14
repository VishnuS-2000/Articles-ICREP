import { useState,useEffect } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { Avatar } from '@chakra-ui/react';
import moment from 'moment'

export const ArticleCard=({data})=>{


    const [extras,setExtras] =useState({})
    
    useEffect(()=>{
       
        const diff=['second','minute','hour','day','month','year']
        const limits=[60,60,24,30,12,100]
        var i=0
        var result=0
        var ago=''
        while(i<diff.length){
            result=moment().diff(data.createdAt,diff[i])
            if(result<limits[i]){
                ago=`${result} ${diff[i]} ago`;
                break;
            }
            i=i+1
        }      
        setExtras({
            ...extras,ago
        })



    },[])


    return <div className="flex flex-[0.10] desktop:flex-[0.30] bg-white flex-col  px-2 py-4 border-b border-gray-200">
    <div className="flex space-x-3 justify-start items-center ">
    {data.author.photo?<img src={data.author.photo} className="rounded-full w-[24px] h-[24px]"/>:<Avatar size='sm' name={data?.author.name} style={{fontSize:'2rem'}}/>}
    <p className="text-base text-secondary">{data.author.name}</p>
    <p className="text-base text-quarternary">{extras?.ago?extras.ago:'Loading...'}</p>
    </div>


    <div className="flex flex-col justify-start space-y-1 mr-6 ">
    
  
    <h1 className="text-lg text-primary desktop:text-xl font-[600] cursor-pointer my-3 text-justify">{data.title}</h1>
    <p className="hidden tablet:flex text-justify text-secondary font-[400]">{data.content?.slice(0,250)} ... </p>
    <p className="text-secondary text-sm font-[400] tablet:hidden">{data.content?.slice(0,120)}  ...</p>


    </div>

</div>

    

}