import NavBar from "../../../components/navbar"
import Footer from "../../../components/footer"
import Link from "next/link"
import Head from "next/head"
import axios from "../../../axios"
import { EmptyResponse } from "../../../components/EmptyResponse"

import { useRouter } from "next/router"
export default function Index({data}){


    const router=useRouter();

    return <>
    <Head>
        <title>Archive</title>
    </Head>
    <NavBar/>
        <div className="flex flex-col min-h-screen w-full relative">
        <div className="flex desktop:px-20 left-[100px] items-center bg-gradient-to-r space-x-8 from-primary to-black p-5  w-full ">
            
            
            
            <a onClick={()=>{router.back()}} className="cursor-pointer">
      
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#fff" className="w-6 h-6 tablet:h-7 tablet:w-7 ">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
</svg>



</a>

            
<h1 className="text-base tablet:text-lg font-[500] text-white ">Archive</h1>

         
            </div>


            {!data?.result?.rows?.length>0?<div className="flex  w-full items-center absolute top-[25%] justify-center  flex-col">
        
                <EmptyResponse message={`No Results in Archive`}/>
            </div>:
            <div className="px-8 desktop:px-24 py-5 desktop:py-8">
            <h1 className="text-base desktop:text-lg font-[600] ">All Archived</h1>
            <div className=" py-5 w-full grid grid-cols-1 tablet:grid-cols-4 gap-3">
                        
                    {data?.result.rows.map((element,index)=>{
                        return <ArchiveCard key={index} year={element?.year} volume={element?.volume} issue={element?.issue} publishedAt={element?.createdAt}/>
                    })}
            
            

                
                </div>
                </div>}
        </div>
    <Footer/>
    </>

}



const ArchiveCard=({year,
    volume,issue,publishedAt})=>{

    return <Link href={`/publications?volume=${volume}&issue=${issue}`} className="text-primary text-base hover:underline">
<h1 className="text-sm tablet:text-base flex space-x-3  font-[500] ">
{`${year} Volume [${volume}] 
    Issue [${issue}]`}
   </h1>









    </Link>
}


export async function getServerSideProps(){


    try{
            const response=await axios.get('/publication/archive',{
                headers:{
                    limit:100,
                    offset:0
                }
            });

            return {

                props:{
                data:response.data
                }
            }
    }   
    catch(err){

        return {
            props:{
                data:{}
            }
        }
    }



}