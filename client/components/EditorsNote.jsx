import { useEffect } from "react"
import axios from "../axios"
import Link from "next/link"
const editorFolderId="1x6YdOwXtpXwGMSY8LtlSFuAwZ2Mfxx7s"
import {useState} from "react"

export const EditorsNote=()=>{
    

    const [formattedData,setformattedData]=useState([])
    const [expanded,setExpanded]=useState(false)
    useEffect(()=>{

        const temp={}
        const fetchData=async()=>{


        const response=await axios.get(`/app/folder/${editorFolderId}`)
        

        if(response){
            response?.data?.result?.exports?.map((element)=>{

                if(element.type=="text/plain"){
                    temp['message']=element?.result     
                }
                else if(element.type=="text/csv"){
                    const editors=element?.result.split('\r\n')
                    const editorDetails=editors[0].split(',')
                    const name=editorDetails[0]
                    const email=editorDetails[1]
                    const photo=editorDetails[2]
                    const designation=editorDetails.slice(3,editorDetails.length).join().replaceAll(`"`,'')
                    
                    temp['editor']={name,email,photo,designation}
                    

                    
                }



            })

            setformattedData(temp)

        }
        
        }


        fetchData()



    },[])


    

    return <div className="flex  w-full py-8 px-8 flex-col tablet:p-16 desktop:px-20 desktop:py-12 desktop:max-w-[70%] space-y-5 ">

    
    <div className=" ">
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M13 14.725c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275zm-13 0c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275z"/></svg>

        <p className="hidden desktop:flex desktop:text-base text-slate-900 text-justify my-2">
            {formattedData?.message}
        </p>



<div className="flex flex-col items-start font-[400]">
        <p className=" text-sm flex desktop:hidden  text-justify my-2">
            {expanded?formattedData?.message:formattedData?.message?.slice(0,350)}        
        </p>

        {!expanded&&<button className="text-xs desktop:hidden font-[500]" onClick={()=>setExpanded(true)}>...Read More</button>}

        </div>
        


        <div className="flex items-baseline my-2 w-full">
        <Link href={`/editors`}>
        <button className="flex w-[180px]  underline  text-slate-primary text-xs tablet:text-base font-[500] text-secondary">Editorial Board</button>
        </Link>




        <div className="flex flex-col items-end text-right p-2  w-full ">

        <img src={formattedData?.editor?.photo} className="tablet:w-[60px] tablet:h-[60px] h-[50px] w-[50px] rounded-full"/>
        
        <div>
        
        <h1 className="text-xs tablet:text-base font-[500]">{formattedData?.editor?.name}</h1>
        <p className="text-xs tablet:text- text-secondary">{formattedData?.editor?.designation}</p>
        
        </div>
        
        </div>
    </div>

    </div>



    </div>





}





