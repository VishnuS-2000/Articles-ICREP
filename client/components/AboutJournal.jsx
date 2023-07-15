import { useEffect } from "react"
import axios from "../axios"
import Link from "next/link"
const editorFolderId="1x6YdOwXtpXwGMSY8LtlSFuAwZ2Mfxx7s"
import {useState} from "react"
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import useSWR from "swr"
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
  } from '@chakra-ui/react'

export const IndexContents=({config})=>{
    

    const [expanded,setExpanded]=useState(false)

    
    const fetchData=async()=>{
            try{
                
                
                const batchResponse=config.map((element)=>{
                        return axios.get(`/app/${element[1]}/${element[2]}`)
                })

                const response=await Promise.all(batchResponse);
                return response;
            }catch(err){
                console.log(err);
            }
        }
        
        


        const {data,error,isValidating} =useSWR(`/app/folder/${editorFolderId}`,fetchData)



    return <div className="flex  w-full py-5 px-5 flex-col  desktop:px-10 desktop:pt-12 desktop:pb-3 desktop:max-w-full space-y-5 ">


    

    {data&&!error?data?.map((response,index)=>{




        return <div key={index} className=" ">

        <h1 className="text-base desktop:text-lg font-[600]">{config[index][0]}</h1>
        <>
        {config[index][1]=="doc"?<p className="text-sm whitespace-pre-wrap desktop:flex desktop:text-base text-slate-900 text-justify my-2">
            {response?.data?.result}
        </p>:
            <TableContainer className="mb-8">
            <Table  size="sm" colorScheme='gray'>
              <Thead>
                <Tr>
                 {response?.data?.result[0].map((header,index)=>{
                    return <Th key={index}>{header}
                    </Th>   
                 })}
                </Tr>
              </Thead>
              <Tbody>
                {response?.data?.result.slice(1, response?.data?.result.length).map((element,index)=>{
                    return <Tr key={index}>
                    {element?.map((item,index)=>{
                        return <Td key={index} className="">{item}</Td>
                    })}
                   </Tr>
                    
                    
                  
                })}
                
            
            </Tbody>
            </Table>
          </TableContainer>
        }
        </>
        



        


       

    </div>
    }):<div className="py-8">
    <SkeletonText noOfLines={15} size="lg"/>
    </div>
}
    
    



    </div>





}





