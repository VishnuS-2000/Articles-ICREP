import NavBar from "../../../components/navbar"
import Footer from "../../../components/footer"
import Link from "next/link"
import Head from "next/head"

import {useState,useEffect} from "react"

import axios from "../../../axios"
import { Select } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { EmptyResponse } from "../../../components/EmptyResponse"



export default function  Index({data}){



    const [announcements,setAnnouncements]=useState([])
    const router=useRouter();


    useEffect(()=>{
        if(data){
          setAnnouncements(data?.result?.rows);
        }

    },[data,router.query])





    const handleChange=(e)=>{
          
      router.push(`/announcements/list?q=${e.target.value}`);
      }


    return <>

    <Head>
      <title>Announcements</title>
    </Head>
    <NavBar />
    <div className="flex flex-col min-h-screen w-full">
 <div className="flex desktop:px-20 left-[100px] items-center bg-gradient-to-r space-x-8 from-primary to-black p-5  w-full ">
            
            
            
            <a onClick={()=>{router.back()}} className="cursor-pointer">
      
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#fff" className="w-6 h-6 tablet:h-7 tablet:w-7 ">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
</svg>



</a>

            
<h1 className="text-base tablet:text-lg font-[500] text-white ">Announcements</h1>

            </div>

            <div className="px-5 py-5 desktop:px-24 desktop:py-8">
              <div className="flex justify-between">
              <h1 className="text-base desktop:text-lg font-[600]">All Announcements</h1>
              <select size="sm"   className="w-[100px] bg-slate-200 px-1 rounded-sm" onChange={handleChange}>
                  <option value="">All</option>
                  <option value="recent">Recent</option>
                  <option value="archive">Archive</option>
              </select>
              </div>
                <div className="flex flex-col py-5 desktop:py-8 gap-1">
                  {announcements?.length>0?announcements?.map((element,index)=>{
                  return <AnnouncementCard key={index} id={element?.id} title={element?.title} dated={element?.dated} file={element?.file}/>
                  }):<EmptyResponse message={`No Results Found`}/>}
                </div>
              
            </div>
    </div>
    <Footer/>
    </>
}


const AnnouncementCard=({id,title,dated,file})=>{
  return <Link href={`/announcements/${id}`} className="flex flex-col w-fit">
    <h1 className="text-sm tablet:text-base text-primary font-[600] hover:underline">{title}</h1>
    <p className="text-sm text-gray-500 font-[500]">{dated}</p>
  </Link>
}

export async function getServerSideProps({query}){
try{


  var url='/announcement'


  if(query?.q){
    if(query?.q=="recent"){
      url+="/active";
    }

    else if(query?.q=="archive"){
      url+="/archive";
    }
  }


  const response=await axios.get(url,{

    headers:{
      attributes:'title,dated,file,id',
    }
  
  });


  return {
    props:{
      data:response.data
    }
  }



}catch(err){

  return {
    props:{
      data:{}
    }
  }

}



}