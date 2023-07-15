import {Layout} from "./Layout"
import {
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    StatArrow,
    StatGroup,
  } from '@chakra-ui/react'

  import React from 'react';
import { XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, MarkSeries } from 'react-vis';

import { useEffect,useState } from "react";
import axios from "../../axios";

  
export const Home=()=>{
    
    const [authorsCount,setAuthorsCount]=useState(0);
    const [issueVolumesCount,setIssueVolumesCount]=useState(0);
    const [publicationsCount,setPublicationsCount]=useState(0);
    
    

    const fetchAuthorsCount=async()=>{

        try{

            const response=await axios.get("/author",{headers:{limit:0}});
                if(response?.data)
                setAuthorsCount(response?.data?.result?.count)
        }
        catch(err){
            console.log(err)
        }
    }

    const fetchIssueVolumeCount=async()=>{

        try{

            const response=await axios.get("/publication/group",{headers:{limit:0}});
                if(response?.data)
                setIssueVolumesCount(response?.data?.result?.count)
        }
        catch(err){
            console.log(err)
        }
    }


    const fetchPublicationsCount=async()=>{

        try{

            const response=await axios.get("/publication",{headers:{limit:0}});

                if(response?.data)
                setPublicationsCount(response?.data?.result?.count)
        }
        catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{


        fetchAuthorsCount()
        fetchIssueVolumeCount()
        fetchPublicationsCount()
    },[])
    


return <Layout heading={'Latest updates'}>
            <div className="flex w-full  rounded-md bg-slate-100 drop-shadow py-12 my-5 justify-evenly items-center">
                <div className="flex flex-col p-3 items-center">
                    <h3 className="text-base  font-[500] text-gray-900">Authors</h3>
                    <h1 className="font-[600] text-3xl">{authorsCount}</h1>
                </div>


                <div className="flex flex-col p-3 items-center">
                    <h3 className="text-base  font-[500] text-gray-900">Volumes and Issues</h3>
                    <h1 className="font-[600] text-3xl">{issueVolumesCount}</h1>
                </div>
                

                <div className="flex flex-col p-3 items-center">
                    <h3 className="text-base  font-[500] text-gray-900">Publications</h3>
                    <h1 className="font-[600] text-3xl">{publicationsCount}</h1>
                </div>
                
             
    


            </div>

</Layout>

}