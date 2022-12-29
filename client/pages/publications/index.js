import Head from "next/head"
import NavBar from "../../components/navbar"
import { InputGroup,Input } from "@chakra-ui/react"
import Link from "next/link"
import { ArticleContainer } from "../../components/articles/Container"
import { ArticleCard } from "../../components/articles/ArticleCard"

import axios from "../../axios"
import Footer from "../../components/footer"
import { FilterBar } from "../../components/FilterBar"
import {useState,useEffect} from "react"
import { useRouter } from 'next/router'

const perPageLimit=1

export default function Publications({data}){

    console.log(data)

    const [term,setTerm]=useState('')
    const [pageOptions,setPageOptions]=useState({})
    const router = useRouter()

    const handleTerm=({target})=>{

        setTerm(target.value)
    }


    const {title,page}=router.query


    useEffect(()=>{

        if(!page){
            setPageOptions({pageNumber:1,offset:0})
        }
        else{
            setPageOptions({pageNumber:0,offset:(page-1)*perPageLimit})
        }


    },[])



    return <>
    <Head>
        <title>Publications</title>
    </Head>
    <NavBar/>

    <div className="flex flex-col w-full bg-gradient-to-r from-primary to-secondary h-[200px]   items-center    justify-center text-black">
    <div className="w-full  tablet:w-[60%] flex flex-col items-center font-[600]">
        
            
        <InputGroup className="relative px-5 font-[400]">
        <Input className="bg-white text-sm placeholder:text-gray-500  tablet:w-full text-base placeholder:text-sm tablet:placeholder:text-base bg-slate-100" variant="" placeholder="Filter by Publication Title" onChange={handleTerm}  value={term}/>

    <Link href={{pathname:`/publications`,query:{title:term}}}>
    <button className="bg-gray-100 text-gray-500 text-base px-3 h-[40px] rounded-r-[5px] absolute right-[20px] bottom-0">

        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
</svg>

        </button>
    </Link>
        </InputGroup>

        <div className="">

        </div>



        <div className="flex w-full justify-start px-5 py-2 desktop:px-5" >
            <Link href={'/search'}>
            <button className="hover:underline  text-gray-200 underline-offset-4 decoration-2	text-xs tablet:text-sm  font-[400] decoration-indigo-900">
                Advanced Search
                </button>
                </Link>
                </div>   
    
    </div>
    
    </div>


    <div className="flex flex-col min-h-screen relative bottom-0 bg-gray-50 bottom-0 absolute w-full  ">




<div className="flex w-full">
    <FilterBar/>
<div className="flex flex-col w-full">
<div className="flex flex-col  tablet:flex-row items-between tablet:justify-between  px-5 tablet:px-8 desktop:px-12 py-3 tablet:pt-12">
{title?
    <h1 className="text-base tablet:text-lg desktop:text-xl font-[600]">
        {`Search Results for " ${title?.length>25?`${title?.slice(0,50)}...`:title} "`}
        </h1>:
<h1 className="text-base tablet:text-lg desktop:text-xl font-[600] ">
    All Publications
    </h1>}
<div className="flex items-center space-x-5 text-sm tablet:text-base">   
        <h1 className="font-[500]">Sorted By</h1>
        <button className="text-secondary">Relevance</button>
        <button className="text-secondary">Date</button>
</div>




</div>

{data?.rows?<ArticleContainer>
    {data?.rows?.map((row)=>{
        return <ArticleCard data={row}/>
    })}
</ArticleContainer>:<div>


</div>}


<div className="flex py-6 absolute text-sm  w-full justify-center  space-x-8 tablet:px-8  tablet:right-0 tablet:text-base items-center flex-[1] tablet:justify-end   bottom-0 ">

{!((pageOptions?.offset-perPageLimit)<0)&&
<Link href={`${router.pathname}&&page=${pageOptions.page-1}`}>
<button className="flex font-[500] items-center">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
</svg>
        Previous
        </button>
        </Link>
        }
       
        <p>Page {pageOptions?.pageNumber} of {Math.ceil(data?.count/perPageLimit)}</p>
        {!((pageOptions?.offset+perPageLimit)>=data?.count)&&
        <Link href={`/publications`}>
        <button className="flex items-center font-[500] ">
        Next
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
</svg>  
        </button>
        </Link>
        }
</div>

</div>




</div>






</div>



    <Footer/>

    </>


}

export async function  getServerSideProps({query}){

    var url="/article"

    if(query?.title){
        url=`/article/search?`
        const keys=Object.keys(query)

        keys.map((key)=>{
            url+=`${key}=${query[key]}`
        })
    }

    const response=await axios.get(url,{
        headers:{
            offset:query?.page?(query?.page-1)*perPageLimit:0,
            limit:perPageLimit,
            attributes:'id,title,year,issue,volume,type'
        }

    })


    return {props:{
        data: response?.data?.result
    }}
}