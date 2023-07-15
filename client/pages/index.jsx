import NavBar from "../components/navbar"
import Footer from "../components/footer"


import { useEffect, useState } from "react"

import axios from "../axios"
import Head from "next/head"


import { Input,InputGroup, InputRightElement } from "@chakra-ui/react"
import Link from "next/link"

import { IndexContents } from "../components/AboutJournal"
import { AnnouncementsContainer} from "../components/NewsNotifications"
import { PublicationsInfoContainer } from "../components/PublicationInfo"
const indexConfigId="1jpwlKSMEcSEoBbk_1rbrYhA0GqwKWjJUAt1DLb3_xrg";


export default function Home({data}){


    const [title,setTitle]=useState()



    return <>
      <Head>
        <title>Home</title>
        </Head>
    <NavBar/>

    <div className="flex flex-col w-full h-[250px]  tablet:h-[320px] desktop:p-4 items-center  bg-gradient-to-r from-primary to-secondary  justify-center relative ">
    <div className="w-full  tablet:w-[80%] desktop:w-[60%] flex flex-col items-center font-[600]">
    <div className="text-base desktop:text-2xl text-white drop-shadow flex-col  tablet:flex-row flex  items-center desktop:space-x-1">
        
        <span className="text-gray-200">ICREP</span><span className="text-gray-200">JOURNAL OF INTERDISCIPLINARY STUDIES</span></div>
        
        <div className=" font-[600] text-slate-200 ">
                (ISSN 2583-8237)
        </div>

        <InputGroup className="relative px-5 font-[400]">
        <Input className="bg-white text-xs mt-8 tablet:w-full rounded-full  placeholder:text-xs tablet:placeholder:text-sm " variant="" placeholder="What do you want to explore" onChange={(e)=>{setTitle(e.target.value)}}/>

    <Link href={`/publications?title=${title}`}>


    <button className="bg-indigo-800 text-sm text-white px-3 h-[42px] rounded-r-md absolute right-[20px] desktop:right-[20px] bottom-[-1px]" >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
</svg>

    </button>
    </Link>

        </InputGroup>

        



        <div className="flex w-full justify-start px-5 " >
            <Link href={`/search`}>
            <button className="hover:underline underline-offset-4 text-white decoration-2 mt-3	text-xs tablet:text-sm text-gray-200 font-[400] decoration-yellow-200">
                Advanced Search
                </button>
                </Link>
                </div>
       
    
    
    
    </div>

 
    </div>
    

    <div className="flex flex-col-reverse desktop:flex-row  w-full ">

        <PublicationsInfoContainer/>
        <div className="flex flex-col desktop:w-[60%]">
        <IndexContents config={data}/>
        </div>
       

        <AnnouncementsContainer/>

    </div>




    <Footer/>
    </>


}



export async function getServerSideProps(){
    try{
            const response=await axios?.get(`/app/sheet/${indexConfigId}`);

            return {
                props:{
                    data: response?.data?.result
                }
            }
    
        }catch(e){
                return {
                    props:{
                        data:{}
                    }
                }
    }

}





