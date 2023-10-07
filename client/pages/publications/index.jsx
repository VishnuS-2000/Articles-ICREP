import Head from "next/head"
import NavBar from "../../components/navbar"
import { InputGroup,Input,RadioGroup,Stack,Radio, Select,FormControl,FormLabel } from "@chakra-ui/react"
import Link from "next/link"
import { ArticleContainer } from "../../components/articles/Container"
import { ArticleCard } from "../../components/articles/ArticleCard"

import axios from "../../axios"
import Footer from "../../components/footer"
import { FilterBar } from "../../components/FilterBar"
import {useState,useEffect} from "react"
import { useRouter } from 'next/router'

import { EmptyResponse } from "../../components/EmptyResponse"


const perPageLimit=5


export default function Publications({data}){

   

    const [term,setTerm]=useState('')
    const [pageOptions,setPageOptions]=useState({})


    const router = useRouter()

    const handleTerm=({target})=>{
        setTerm(target.value)
    }

    const emptyState={
        message:'Sorry we couldnt find any results for your query. Make sure that the spelling is correct.',
    }

    const {title,page,sorted,volume,issue}=router.query
    const [sort,setSort]=useState()
    // const [issue,setIssue]=useState()

    useEffect(()=>{

        if(!page){
            setPageOptions({pageNumber:1,offset:0})
        }
        else{
            setPageOptions({pageNumber:Number(page),offset:(page-1)*perPageLimit})
        }


    },[router])


    useEffect(()=>{

        if(!sorted){
            setSort("name")
        }
        else{
            setSort(sorted)
        }


    },[router])

    


    const handleNext=()=>{
        const pathname=router.pathname
        const query=router.query
        var {page}=query
        

    if(!page){
        page=1
    }
        var url=pathname
        url+='?'


        if(query){
        Object.keys(query).map((field)=>{
            if(field!='page')
            url+=`${field}=${query[field]}&`
        })

    }

    url+=`page=${Number(page)+1}`
    
    router.push(url)

    }

    const handlePrevious=()=>{  
        const pathname=router.pathname
        const query=router.query
        var {page}=query
    if(!page){
        page=1
    }
        var url=pathname
        url+='?'


        if(query){
        Object.keys(query).map((field)=>{
            if(field!='page')
            url+=`${field}=${query[field]}&`
        })

    }

    url+=`page=${Number(page)-1}`
    
    router.push(url)
    
    }

    const handleIssue=(e)=>{


    
        const pathname=router?.pathname
        const query=router?.query
        var url=pathname
        url+='?'


        Object.keys(query).map((field)=>{
            if(field!='issue')
            url+=`${field}=${query[field]}&`
        })

        url+=`issue=${e.target.value}`

        router.push(url)

    }
    

    const handleSort=(e)=>{
        const pathname=router.pathname
        const query=router.query

        var url=pathname
        url+='?'

        Object.keys(query).map((field)=>{
            if(field!='sorted')
            url+=`${field}=${query[field]}&`
        })

        url+=`sorted=${e.target.value}`

        router.push(url)


    }




    return <>
    <Head>
        <title>Publications</title>
    </Head>
    <NavBar/>

    <div className="flex flex-col w-full bg-gradient-to-r from-primary to-secondary h-[140px]   items-center    justify-start text-black">
    <div className="w-full  tablet:w-[60%] flex flex-col items-center font-[600]">
        
            
    <InputGroup className="relative px-5 font-[400]">
        <Input className="bg-white text-xs mt-8 tablet:w-full rounded-full  placeholder:text-xs tablet:placeholder:text-sm " variant="" placeholder="What do you want to explore" onChange={handleTerm}/>

    <Link href={`/publications?title=${term}`}>


    <button className="bg-indigo-800 text-sm text-white px-3 h-[42px] rounded-sm absolute right-[20px] desktop:right-[20px] bottom-[-1px]" >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
</svg>

    </button>
    </Link>

        </InputGroup>



        <div className="">

        </div>



        <div className="flex w-full justify-start px-5 " >
            <Link href={`/search`}>
            <button className="hover:underline underline-offset-4 text-white decoration-2 mt-3	text-xs tablet:text-sm text-gray-200 font-[400] decoration-yellow-200">
                Advanced Search
                </button>
                </Link>
                </div>
    
    </div>
    
    </div>


    <div className="flex  desktop:flex-row min-h-screen relative bottom-0  bottom-0 absolute w-full  ">

    <FilterBar/>
<div className="flex flex-col w-full ">
<div className="flex  justify-between tablet:flex-row items-center tablet:justify-between  px-5 tablet:px-8 desktop:px-12 pt-5 desktop:pt-8 desktop:pb-3">
{title?
    <h1 className="text-base font-[600]">
        {`Search Results for " ${title?.length>25?`${title?.slice(0,50)}...`:title} "`}
        </h1>:
<h1 className="text-base   font-[600] text-secondary space-x-1">
    {volume&&issue?<><span>Volume {volume} </span><span>Issue {issue}</span></>:`Recent Publications `}
    </h1>}
<div className="flex items-center space-x-5 text-sm tablet:text-base">   
    <Stack direction='row' className="mt-1 desktop:mt-0" >
       
    

        <div className="flex items-center relative space-x-1 py-2 desktop:px-3 desktop:py-0">
        
    
       
        
        <div className="flex flex-col relative ">
        <Select placeholder="Sort By" variant="filled" className="" onChange={handleSort} size="sm">
                <option value="name">Relavance</option>
                <option value="date">Date</option>
        </Select>
        </div>

            </div>  
        
    
           


      </Stack>

</div>




</div>

{data?.rows?.length>0?<ArticleContainer>
    {data?.rows?.map((row,index)=>{
        return <ArticleCard key={index} data={row}/>
    })}
</ArticleContainer>:<EmptyResponse message={emptyState?.message} icon={emptyState?.icon}/>}


<div className="flex py-8 absolute text-sm  w-full justify-center  space-x-8 tablet:px-8  tablet:right-0 tablet:text-sm items-center flex-[1] tablet:justify-end   bottom-0 ">

{!((pageOptions?.offset-perPageLimit)<0)&&
<button className="flex font-[500] items-center" onClick={handlePrevious}>
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
</svg>
        Previous
        </button>

        }
       
        <p>Page {pageOptions?.pageNumber} of {Math.ceil(data?.count/perPageLimit)}</p>
        {!((pageOptions?.offset+perPageLimit)>=data?.count)&&
        <button className="flex items-center font-[500] " onClick={handleNext}>
        Next
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
</svg>  
        </button>
        }
</div>

</div>











</div>



    <Footer/>

    </>


}

export async function  getServerSideProps({query}){

    var url="/publication"
    var orderField=query?.sorted=="name"? "title":"createdAt"
    var orderType=query?.sorted=="name" ? "ASC":"DESC"

    if(query?.title||query?.type||query?.designation||query?.issue){
        url=`/publication/search?`

        if(query?.title){
        const keys=Object.keys(query)

        keys.map((key)=>{
            url+=`${key}=${query[key]}`
        })

    }
    if(query?.type){
        url+=`type=${query?.type}&`
    }

    if(query?.designation){
        url+=`designation=${query?.designation}&`
    }

    if(query?.volume){
        url+=`volume=${query?.volume}&`
    }

    if(query?.issue){
        url+=`issue=${query?.issue}`
    }

    }
    
    const response=await axios.get(url,{
        headers:{
            offset:query?.page?(query?.page-1)*perPageLimit:0,
            limit:perPageLimit,
            attributes:'id,title,type,createdAt',
            orderfield:orderField,
            ordertype:orderType
        }

    })


    return {props:{
        data: response?.data?.result
    }}
}