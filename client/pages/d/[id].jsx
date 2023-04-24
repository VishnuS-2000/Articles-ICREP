import NavBar from "../../components/navbar"
import Footer from "../../components/footer"
import SearchBar from "../../components/searchbar"
import TopicBar from "../../components/topicbar"
import {AuthorBar,AuthorBarMobile} from "../../components/AuthorBar"

import {useRef,useEffect} from "react"
import axios from "../../axios"
import Head from "next/head"
import { useRouter } from "next/router"
import { v4 as uuidv4 } from 'uuid';
import { useState } from "react"
import Link from "next/link"
import 'quill/dist/quill.bubble.css';
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box
  } from '@chakra-ui/react'


import { useQuill } from "react-quilljs"
import dynamic from 'next/dynamic'

const DownloadPdfButton = dynamic(
  () => import('../../components/pdfdownload'),
  { ssr: false } // <-- not including this component on server-side
)


export default function Article({data}){
    const refContainer=useRef()
    const router=useRouter()
    const {quill,quillRef}=useQuill({
                readOnly: true,
                theme:'bubble'
    })
    const [outlines,setOutlines]=useState()


    useEffect(()=>{
        if(quill&&data?.content){
    
        quill.setContents(JSON.parse(data?.content))
        refContainer.current.innerHTML=quill.root.innerHTML

        }
    },[quill,data])




   

       


    useEffect(()=>{
        var outlines=refContainer.current.getElementsByTagName("h3")
        var outlineData=[],randomId;
        
 
        for(var i=0;i<outlines.length;i++){
            
            if(outlines[i]?.textContent){
            randomId=uuidv4()
            outlines[i].setAttribute('id',`${randomId}`)
            outlineData.push({term:outlines[i].textContent,id:randomId})
            
            }

        }

        setOutlines(outlineData)
    },[quill])



const handleOutline=(id,heading)=>{
        router.replace(`#${id}`)
        var outlineData=refContainer.current.getElementsByTagName("h3")
        
        var reference=null

        for(var i=0;i<outlineData.length;i++){

            if(heading&&outlineData[i]?.textContent==`${heading}`){
                reference=outlineData[i]
                break;
            }


            }

        
    }



   
    return <>
    <Head>
        <title>{data?.title}</title>
        </Head>
    <NavBar/>
    
        <div className="flex  w-full min-h-screen desktop:flex-row">
        <div className="flex flex-[1] flex-col pb-6 desktop:flex-[0.60] desktop:items-start sticky left-[19%] relative  desktop:px-12 desktop:py-12 deskotp:space-y-5">
                    

        <a onClick={()=>{router.back()}} className="cursor-pointer flex space-x-3 print:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
</svg>              
<span>Back</span>
                    </a>

                    <div className="p-3" id="title">


                    <h1 className="text-lg font-[600] desktop:text-xl text-justify">{data?.title}</h1>
                    <p className="text-sm tablet:text-sm text-slate-600 space-x-2">
                    <span className="font-[500]">Volume</span> {data?.volume}
                    <span className="font-[500]">Issue</span> {data?.issue} 
                    <span> </span>{data?.period}
                    <span className="font-[500]">Year</span> {data?.year}
                    
                    </p>

                    </div>


                {/* Print */}

                
                <div id="authors" className="hidden print:flex px-4 py-3">
                    {data?.authors?.map((author)=>{
                        return <div>
                            <h1 className="text-base font-[600]">{author?.name}</h1>
                            <p className="text-sm">{author?.bio}</p>
                            <p className="text-sm underline">{author?.email}</p>
                        </div>
                    })}
                </div>

                <div className="hidden">

                </div>


                <div id="toc" className="py-5 px-5 hidden print:flex flex-col ">
                    <h1 className="font-[600] text-sm">Table of Contents</h1>
                <ul className="flex flex-col items-start my-3">

                {outlines?.map((element,index)=>{
            return <li className="text-secondary text-sm tablet:text-sm px-2 mt-1 font-[500] ">{index+1}.{element?.term}</li>
    

})}
                </ul>    
            
            </div>







                <div className="space-x-3 p-3 flex print:hidden">
                    <button className="flex bg-blue-200 p-1 items-center space-x-1 bg-blue-100 rounded-md"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                </svg>
                <span>Share</span>
                </button>


                <DownloadPdfButton refContainer={refContainer}/>               
                </div>
                
               


                <Accordion  allowMultiple className="flex flex-col w-full py-5 tablet:py-12 text-primary print:hidden">
                    <AccordionItem className="">
                        <AccordionButton variant="" className="">
                        <Box as="span" flex='1' textAlign='left' className="p-1">

                        <h1 className="text-sm tablet:text-base font-[600]  ">Authors</h1>
        </Box>

                        <AccordionIcon />

                        </AccordionButton>

                        <AccordionPanel pb={4}>

                        <AuthorBarMobile authors={data?.authors}/>

    </AccordionPanel>

                    </AccordionItem>


                          <AccordionItem>
                        <AccordionButton>
                        <Box as="span" flex='1' textAlign='left' className="p-1">

                        <h1 className="text-sm tablet:text-base font-[600] ">Contents</h1>
        </Box>

                        <AccordionIcon />

                        </AccordionButton>

                        <AccordionPanel pb={4}>

                        <ul className="flex flex-col items-start py-5 px-2">

{outlines?.map((element,index)=>{
    return <button key={index}  onClick={()=>handleOutline(element?.id,element?.term)}>
    <li className="text-secondary text-sm tablet:text-base mt-1 font-[500] underline">{index+1}.{element?.term}</li>
    </button>

})}
</ul>

    </AccordionPanel>

                    </AccordionItem>


                    <AccordionItem>
                        <AccordionButton>
                        <Box as="span" flex='1' textAlign='left' className="p-1">

                        <h1 className="text-sm tablet:text-base font-[600] ">Keywords</h1>
        </Box>

                        <AccordionIcon />

                        </AccordionButton>

                        <AccordionPanel pb={4}>

                        <ul className="flex flex-col items-start py-3 px-2">

                        <p className="text-secondary text-sm tablet:text-base mt-1 font-[600] text-primary ">
{data?.keywords?.map((element,index)=>{
    if(index<data?.keywords.length-1)
    return     `${element}-`

    else 
        return `${element}`

})}</p>
</ul>

    </AccordionPanel>

                    </AccordionItem>

                </Accordion>


                <div ref={refContainer} className="text-sm tablet:text-base  text-justify px-5 py-4 desktop:py-5 space-y-1 overflow:visible">
                <div ref={quillRef} className="hidden"/>
                </div>



            
                <Accordion  allowMultiple className="flex flex-col w-full   py-5 print:hidden">
                    
                    {JSON.parse(data?.references)&&<AccordionItem className="">
                        <AccordionButton variant="" className="">
                        <Box as="span" flex='1' textAlign='left' className="p-1">

                        <h1 className="text-sm tablet:text-base font-[600]  text-primary">References</h1>
        </Box>

                        <AccordionIcon />

                        </AccordionButton>

                        <AccordionPanel pb={4} className="space-y-3 ">

                        {JSON.parse(data?.references)?.raw?.map((element,index)=>{
        return<div key={index} className="flex text-base  max-w-[350px] text-justify tablet:max-w-full tablet:flex-[0.70]  flex-col">
        
    <p className="text-sm desktop:text-base">
        <span className="font-[600]">{index+1}. </span>  
{element?.description}</p>

    <div className="flex">
        {element?.urls.map((url)=>{
            return <Link href={`${url?.link}`} className="text-sm font-[500] flex space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
</svg>

                <span>
                    Visit URL
                    </span>
                    </Link>
        })}
    </div>
    </div>

})}
    </AccordionPanel>

                    </AccordionItem>}

                </Accordion>

                    
                {/* Print */}
            
            
            <div className="print:flex hidden flex flex-col w-full text-justify px-5 space-y-1">
            <h1 className="text-base my-2 font-[600]">References</h1>
                {JSON.parse(data?.references)?.raw?.map((element,index)=>{
        return <p className="text-sm desktop:text-base">
        <span className="font-[600]">{index+1}. </span>  
{element?.description}

<div className="flex">
        {element?.urls.map((url)=>{
            return <span className="text-sm underline ">{url?.link}</span>
        })}
    </div>

</p>

    
    

       

})}

</div>
                
                </div>


        
 
        </div>

    

   
    <Footer/>
    </> 


}





export async function getServerSideProps({params}){



try{



    const response=await axios.get(`/article/${params.id}`,{
        headers:{
            attributes:'id,title,content,issue,volume,period,year,references,keywords'
        }
    })

    return {
        props:{
        data:response?.data?.result
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

