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

import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box
  } from '@chakra-ui/react'

export default function Article({data}){



    const refContainer=useRef()
    const router=useRouter()
    const [outlines,setOutlines]=useState()

    useEffect(()=>{

        refContainer.current.innerHTML=data?.richText

    },[])




    useEffect(()=>{
        var footNotes=refContainer.current.getElementsByTagName("sup")

    

    data?.footnotes?.map((element)=>{
    for(var i=0;i<footNotes.length;i++){
        if(footNotes[i]?.textContent==`[${element?.serial}]`){
            console.log(footNotes[i].match(`https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)`))
            footNotes[i].setAttribute('id',`${element?.id}`)
            break;
        }
    
        
        }

       

    })
   

       

    },[])


    useEffect(()=>{
        var outlines=refContainer.current.getElementsByTagName("h3")
        var outlineData=[],randomId;
        
    
        for(var i=0;i<outlines.length;i++){

            randomId=uuidv4()
            outlines[i].setAttribute('id',`${randomId}`)
            outlineData.push({term:outlines[i].textContent,id:randomId})
            

        }

        setOutlines(outlineData)
    },[])

    const handleReference=(id,serial)=>{
        router.push(`/d/${data?.id}/#${id}`)
        var footNotes=refContainer.current.getElementsByTagName("sup")
        var reference=null


        for(var i=0;i<footNotes.length;i++){
            if(footNotes[i]?.textContent==`[${serial}]`){
                reference=footNotes[i]
                break;
            }

            
        
            
            }
            reference.style.background="yellow";

            
            setTimeout(()=>{
                reference.style.background="transparent";
            },3000)
    }

    const handleOutline=(id,heading)=>{
        router.push(`#${id}`)
        var outlineData=refContainer.current.getElementsByTagName("h3")
        
        var reference=null

        for(var i=0;i<outlineData.length;i++){

            if(heading&&outlineData[i]?.textContent==`${heading}`){
                reference=outlineData[i]
                break;
            }

            
        
            
            }
            reference.style.background="yellow";

            
            setTimeout(()=>{
                reference.style.background="transparent";
            },3000)
    }
 

    return <>
    <Head>
        <title>{data?.title}</title>
        </Head>
    <NavBar/>
    
        <div className="flex  w-full min-h-screen desktop:flex-row">
        <div className="flex flex-[1] flex-col pb-6 desktop:flex-[0.60] desktop:items-start sticky left-[19%] relative p-5 desktop:px-12 desktop:py-12 deskotp:space-y-5">
                    
                    
                    <h1 className="text-lg font-[600] desktop:text-xl text-justify">{data?.title}</h1>
                    <p className="text-sm tablet:text-sm text-slate-600 space-x-2">
                    <span className="font-[500]">Issue</span> {data?.issue} 
                    <span className="font-[500]">Volume</span> {data?.volume}
                    <span className="font-[500]">Year</span> {data?.year}
                    
                    </p>

                
               


                <Accordion defaultIndex={[0]} allowMultiple className="flex flex-col w-full py-5 tablet:py-12 text-primary">
                    <AccordionItem className="">
                        <AccordionButton variant="" className="">
                        <Box as="span" flex='1' textAlign='left' className="p-1">

                        <h1 className="text-sm tablet:text-base font-[600]  ">Publishers</h1>
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
    return <button  onClick={()=>handleOutline(element?.id,element?.term)}>
    <li className="text-secondary text-sm tablet:text-base mt-1 font-[500] underline">{index+1}.{element?.term}</li>
    </button>

})}
</ul>

    </AccordionPanel>

                    </AccordionItem>

                </Accordion>
















                    

                <div ref={refContainer} className=" text-justify px-5 py-4 desktop:py-8 space-y-1">
                </div>



            
                <Accordion defaultIndex={[0]} allowMultiple className="flex flex-col w-full py-5 ">
                    <AccordionItem className="">
                        <AccordionButton variant="" className="">
                        <Box as="span" flex='1' textAlign='left' className="p-1">

                        <h1 className="text-sm tablet:text-base font-[600]  text-primary">Footnotes</h1>
        </Box>

                        <AccordionIcon />

                        </AccordionButton>

                        <AccordionPanel pb={4}>

                        {data?.footnotes?.map((element)=>{
        return<div className="flex text-base  max-w-[300px] tablet:max-w-full tablet:flex-[0.60]  flex-col">
    <p className="text-sm desktop:text-base">    <button type="button" className="font-[600]" onClick={()=>handleReference(element?.id,element?.serial)}>{`[${element?.serial}]`}</button>
{element?.reference}</p>

    </div>

})}
    </AccordionPanel>

                    </AccordionItem>

                </Accordion>

                    
  
                
                </div>


        
 
        </div>


   
    <Footer/>
    </> 


}





export async function getServerSideProps({params}){



try{



    const response=await axios.get(`/article/${params.id}`,{
        headers:{
            attributes:'id,title,richText,issue,volume,year,footnotes'
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

