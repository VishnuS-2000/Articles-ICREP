import axios from "../axios"
import NavBar from "../components/navbar"
import Footer from "../components/footer"
import TopicBar from "../components/topicbar"
import SearchBar from "../components/searchbar"
import { Card, CardHeader, CardBody, CardFooter,Avatar,Stack,Heading ,Text} from '@chakra-ui/react'
import { useEffect, useState} from "react"
import useSWR from "swr"
import Link from "next/link"
import Head from "next/head"


import { useRouter } from "next/router"

export default function Editors({data}){

    const [editors,setEditors] = useState([])

    const router=useRouter()

    useEffect(()=>{
        
        if(data){
        const editorsData=data?.map((element)=>{

                    
                    const name=element[0]
                    const email=element[1]
                    const imageURL=element[2]
                    const profileURL=element[3]
                    const designation=element[4]

                    return {name,email,imageURL,profileURL,designation}
              

            

        })

        setEditors(editorsData)                 

    }
    },[])




    return <>
    <Head>
        <title>Editorial Board</title>
    </Head>

    <NavBar/>
        <div className="flex w-full  flex-col space-y-5 pb-12 min-h-screen">

            <div className="flex desktop:px-20 items-center bg-gradient-to-r space-x-8 from-primary to-black p-5  w-full ">
            
            
            
            <a onClick={()=>{router.back()}} className="cursor-pointer">
      
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#fff" className="w-6 h-6 tablet:h-7 tablet:w-7 ">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
</svg>



</a>

            
<h1 className="text-base tablet:text-lg  font-[500] text-white ">Editorial Board</h1>

         
            </div>

            <div className="flex flex-col p-5  desktop:py-5 w-full space-y-5 tablet:p-6 desktop:p-24 ">
            


            <h1 className="text-sm tablet:text-base desktop:text-base font-[600] text-slate-700">Cheif Editor</h1>
            <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-y-3 tablet:gap-2 desktop:gap-8 py-3 rounded-md">
                <EditorCard name={editors[0]?.name} email={editors[0]?.email} photo={editors[0]?.imageURL}  bio={editors[0]?.designation} profileURL={editors[0]?.profileURL}/>
            </div>

            <h1 className="text-sm desktop:text-base text-slate-700 font-[600]">Members</h1>
            <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-y-3 tablet:gap-2 desktop:gap-8 py-3 rounded-md">
                
                {editors.slice(1,editors?.length).map((editor,index)=>{

                    return <EditorCard key={index} name={editor?.name} email={editor?.email} bio={editor?.designation} photo={editor?.imageURL} profileURL={editor?.profileURL}/>
                })}
        

            </div>
                   
</div>


        </div>

        <Footer/>
    </>


}


const EditorCard=({name,bio,photo,email,profileURL})=>{


    return  <div variant="" className={`flex flex-col space-y-2 desktop:flex-[0.40] p-5 bg-gray-50  border border-gray-200 rounded-md  px-3 `}>



        <div className="flex  space-x-5">

    {photo?<Avatar src={`https://drive.google.com/uc?id=${photo} `}/>:<Avatar />}

    <div>
<h1 className="text-sm tablet:text-base  font-[600] ">{name}</h1>
<p className="text-justify text-xs tablet:text-sm desktop:text-sm text-slate-500">
    
  {bio}
</p>

<div className="flex items-center space-x-3 py-2 text-xs tablet:text-sm text-gray-600">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 tablet:w-6 tablet:h-6">
  <path fillRule="evenodd" d="M17.834 6.166a8.25 8.25 0 100 11.668.75.75 0 011.06 1.06c-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788 3.807-3.808 9.98-3.808 13.788 0A9.722 9.722 0 0121.75 12c0 .975-.296 1.887-.809 2.571-.514.685-1.28 1.179-2.191 1.179-.904 0-1.666-.487-2.18-1.164a5.25 5.25 0 11-.82-6.26V8.25a.75.75 0 011.5 0V12c0 .682.208 1.27.509 1.671.3.401.659.579.991.579.332 0 .69-.178.991-.579.3-.4.509-.99.509-1.671a8.222 8.222 0 00-2.416-5.834zM15.75 12a3.75 3.75 0 10-7.5 0 3.75 3.75 0 007.5 0z" clipRule="evenodd" />
</svg>


<p>{email}</p>


</div>


<Link href={`${profileURL}`} className="text-gray-800 text-xs desktop:text-sm underline">Visit Profile</Link>
</div>



        </div>



        
       
      </div>
    

}






export async function getServerSideProps(){


    try{
        const response=await axios.get('/app/sheet/10LduXNAFj98Ha0h7UNum2OTff3pB9gjROQoDedXpxh4')
        return{

            props:{
                data: response?.data?.result
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