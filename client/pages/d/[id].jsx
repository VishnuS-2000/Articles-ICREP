import NavBar from "../../components/navbar"
import Footer from "../../components/footer"
import SearchBar from "../../components/searchbar"
import TopicBar from "../../components/topicbar"
import {AuthorBar,AuthorBarMobile} from "../../components/AuthorBar"

import {useRef,useEffect} from "react"
import axios from "../../axios"
import Head from "next/head"

export default function Article({data}){


    const refContainer=useRef()


    useEffect(()=>{

        refContainer.current.innerHTML=data?.richText

    },[])


    return <>
    <Head>
        <title>{data?.title}</title>
        </Head>
    <NavBar/>
    
        <div className="flex  w-full min-h-screen desktop:flex-row">
        <div className="flex flex-[1] flex-col pb-12 desktop:flex-[0.60] desktop:items-start sticky left-[19%] relative p-5 desktop:px-12 desktop:py-12 deskotp:space-y-5">
                    
                    
                    <h1 className="text-lg font-[600] desktop:text-2xl text-justify">{data?.title}</h1>
                
                <div ref={refContainer} className="text-sm tablet:text-base text-justify py-4 desktop:py-8 space-y-1">
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
            attributes:'title,richText'
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

