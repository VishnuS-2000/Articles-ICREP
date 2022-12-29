import { useEffect } from "react"
import axios from "../axios"
import Link from "next/link"
const editorFolderId="1x6YdOwXtpXwGMSY8LtlSFuAwZ2Mfxx7s"
import {useState} from "react"

export const EditorsNote=()=>{
    

    const [formattedData,setformattedData]=useState([])

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
                    const designation=editorDetails.slice(2,editorDetails.length).join().replaceAll(`"`,'')
                    
                    temp['editor']={name,email,designation}
                    

                    
                }



            })

            setformattedData(temp)

        }
        
        }


        fetchData()



    },[])


    

    return <div className="flex  w-full py-8 px-8 flex-col tablet:p-16 desktop:p-20 space-y-5ol ">

    <h1 className="tablet:text-2xl font-[600] p">Cheif Editor's Note</h1>
    
    <div className=" ">
        <p className="text-sm tablet:text-lg text-justify my-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M13 14.725c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275zm-13 0c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275z"/></svg>
            {formattedData?.message}
        </p>

        <div className="flex items-baseline p-1 my-2 w-full">
        <Link href={`/editors`}>
        <button className="flex w-[120px] p-1  justify-center text-black text-sm tablet:text-base font-[500] text-secondary">See All Editors</button>
        </Link>




        <div className="flex flex-col items-end text-right p-2  w-full ">

        <img src="https://articles-app-five.vercel.app/_next/image?url=%2Fassets%2Feditors%2Feditor.png&w=384&q=75" className="tablet:w-[100px] tablet:h-[100px] h-[60px] w-[60px] rounded-full"/>
        
        <div>
        
        <h1 className="text-sm tablet:text-lg font-[500]">{formattedData?.editor?.name}</h1>
        <p className="text-xs tablet:text-base text-secondary">{formattedData?.editor?.designation}</p>
        
        </div>
        
        </div>
    </div>

    </div>



    </div>





}





