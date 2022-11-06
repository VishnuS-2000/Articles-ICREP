import { useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export const ArticleCard=({data})=>{


    const [extras,setExtras] =useState({})

    return <div className="flex flex-[0.10] desktop:flex-[0.30] bg-white flex-col  px-2 py-4 border-b border-gray-200">
    <div className="flex space-x-3 justify-start items-center ">
    {data.author.photo?<img src={data.author.photo} className="rounded-full w-[24px] h-[24px]"/>:<AccountCircleIcon style={{fontSize:'2rem'}}/>}
    <p className="text-base text-secondary">{data.author.name}</p>
    <p className="text-base text-quarternary">{extras?.ago?extras.ago:'1 day ago'}</p>
    </div>


    <div className="flex flex-col justify-start space-y-1 mr-6 ">
    
  
    <h1 className="text-lg text-primary desktop:text-xl font-[600] cursor-pointer my-3 text-justify">{data.title}</h1>
    <p className="hidden tablet:flex text-justify text-secondary font-[400]">{data.content?.slice(0,240)} ... </p>
    <p className="text-secondary text-sm font-[400] tablet:hidden">{data.content?.slice(0,120)}  ...</p>


    </div>

</div>

    

}