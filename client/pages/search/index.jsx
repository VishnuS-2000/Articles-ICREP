import NavBar from "../../components/navbar";
import Head from "next/head";

import { FormControl, Input,FormLabel, Select,Stack } from "@chakra-ui/react";
import { useState,useEffect } from "react";
import { FilterBar } from "../../components/FilterBar";
import Link from "next/link";

import { useRouter } from "next/router";
const perPageLimit=2

import axios from "../../axios";
import { ArticleContainer } from "../../components/articles/Container";
import { ArticleCard } from "../../components/articles/ArticleCard";
import Footer from "../../components/footer";
import { EmptyResponse } from "../../components/EmptyResponse";

export default function Search({data}){


const router=useRouter()
const [showMore,setShowMore] =useState(false);
const [params,setParams]=useState({})

const [pageOptions,setPageOptions] = useState({});

const [years,setYears] = useState([])
const [issues,setIssues] = useState([])
const [volumes,setVolumes] = useState([])
const {title,page,sorted}=router.query
const [sort,setSort]=useState()

useEffect(()=>{

    if(!page){
        
        setPageOptions({pageNumber:1,offset:0})
    }
    else{
        setPageOptions({pageNumber:Number(page),offset:(page-1)*perPageLimit})
    }


},[router])



useEffect(()=>{


        const fetchIssues=async()=>{
                const response=await axios.get('/article/issues')

                if(response){
                        setIssues(response?.data?.result?.rows)
                }

        }

        
        const fetchVolumes=async()=>{
                const response=await axios.get('/article/volumes')

                if(response){
                        setVolumes(response?.data?.result?.rows)
                }

        }

        
        const fetchYears=async()=>{
                const response=await axios.get('/article/years')

                if(response){
                        setYears(response?.data?.result?.rows)
                }

        }

        fetchIssues()
        fetchVolumes()
        fetchYears()


},[])


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


const handleSearch=(e)=>{
        e.preventDefault()
        var url=router.pathname
        url+='?'

        
        Object.keys(params).map((field)=>{
                
        if(params[field])
            url+=`${field}=${params[field]}&`
        })

        router.push(`${url}#results`)


}

return <>

<Head>
        <title>Advanced Search</title>
        </Head>
    <NavBar/>




<div className="min-h-screen flex flex-col ">
        <form className="p-5 tablet:p-8 " onSubmit={handleSearch}>
        <h1 className="text-base tablet:text-lg font-[600]">Advanced Search</h1>

        <FormControl className="space-y-5 tablet:space-y-0 tablet:flex tablet:space-x-3 desktop:space-x-5 py-5 tablet:py-8 desktop:py-10">
        
        <FormControl >
        <h1 className="text-sm tablet:text-base font-[600] ">Keywords</h1>
        <Input  className="text-sm tablet:text-base border border-slate-400" variant="" value={params?.keywords} onChange={(e)=>{setParams({...params,keywords:e.target.value})}} />
        </FormControl>

        <FormControl >
        <h1 className="text-sm tablet:text-base font-[600]">Title</h1>
        <Input  className="text-sm   tablet:text-base border border-slate-400" variant="" value={params?.title} onChange={(e)=>{setParams({...params,title:e.target.value})}}/>
        </FormControl>

        
        <FormControl className="" >
        
        <h1 className="text-sm tablet:text-base font-[600]">Author</h1>
        <Input  className="text-sm   tablet:text-base border border-slate-400" variant="" value={params?.author} onChange={(e)=>{setParams({...params,author:e.target.value})}}/>
        </FormControl>
        
       

        </FormControl>

        {showMore&&<FormControl className="space-y-5  tablet:space-y-0 tablet:flex tablet:space-x-3 desktop:space-x-5 pb-5 tablet:pb-8 desktop:pb-10">
        
        
        <FormControl className="" >
        
        <h1 className="text-sm tablet:text-base font-[600] ">Issue</h1>
        <Select  variant="" value={params?.issue} className="border border-slate-400" onChange={(e)=>{setParams({...params,issue:e.target.value})}}>
                
                <option value={``}>Select an Issue</option>
                {issues?.map((issue,index)=>{
                        return  <option key={index} value={issue?.issue}>{issue?.issue}</option>
                })}
              
        </Select>       
         </FormControl>

        <FormControl >
        <h1 className="text-sm tablet:text-base font-[600]">Volume</h1>

        <Select   variant="" value={params?.volume} className="border border-slate-400" onChange={(e)=>{setParams({...params,volume:e.target.value})}}>
        <option value={``}>Select a Volume</option>

                {volumes?.map((volume,index)=>{
                        return  <option key={index} value={volume?.volume}>{volume?.volume}</option>
                })}
              
        </Select>
        </FormControl>

        <FormControl >
        <h1 className="text-sm tablet:text-base font-[600]">Year</h1>

        <Select   variant="" value={params?.year} className="border border-slate-400" onChange={(e)=>{setParams({...params,year:e.target.value})}}>
        <option value={``}>Select a Year</option>

                {years?.map((year,index)=>{
                        return  <option key={index} value={year?.year}>{year?.year}</option>
                })}
              
        </Select>
        </FormControl>

        </FormControl>}

        {!showMore&&<div className="flex py-3 tablet:py-5">
        <button type="button" className="font-[600] flex items-center" onClick={()=>setShowMore(true)}>Show All 
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 animate-bounce">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75" />
</svg>

        </button>
        </div>}


   

        <div className="flex py-5 tablet:py-8 justify-end">
        <button type="submit" className="flex items-center justify-center space-x-5 bg-gradient-to-r from-primary to-indigo-900 text-sm tablet:max-w-[150px] tablet:space-x-1 text-white w-full p-3 rounded-md" >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
</svg>
            <p>Search</p>
        </button>
        </div>


{/* <div>
        <h1 className="text-sm tablet:text-lg font-[500]">Recent Searches</h1>

</div> */}


</form>
        
</div>


<div className="flex flex-col min-h-screen relative bottom-0 bg-gray-50 bottom-0 absolute w-full  " id="results">




<div className="flex w-full">
    <FilterBar/>
<div className="flex flex-col w-full">
<div className="flex flex-col  tablet:flex-row items-between tablet:justify-between  px-5 tablet:px-8 desktop:px-12 py-8 tablet:pt-12">
{/* {params?
    <div className="text-base font-[600]">
        <p>Search Results for {Object.keys(params)?.map((key)=>{
                if(key!='page'||key!='sorted')
                return `${key[0].toUpperCase()}${key.slice(1,key.length)} '${params[key]}', `
        })}</p>
        </div>:
<h1 className="text-base  font-[600] ">
        Search Results
    </h1>} */}

<h1 className="text-base  font-[600] ">
        Search Results
    </h1>
<div className="flex items-center space-x-5 text-sm tablet:text-base">   
    <Stack direction='row' className="mt-1 desktop:mt-0" >
       
        
        <form className="flex space-x-1">
        {/* <label for="sorted"> <h1 className="text-sm font-[500] mr-5">Sorted By</h1></label>

        <input type="radio" id="sorted" value="name" onChange={handleSort} checked={sort=="name"}/>
        <label className="text-sm">Relavance</label>

        <input type="radio" id="sorted" value="date" onChange={handleSort} checked={sort=="date"}/>
        <label className="text-sm">Date</label> */}

                  
<Select variant="filled" className="" onChange={handleSort} size="sm">
                <option value="name">Relavance</option>
                <option value="date">Date</option>
        </Select>

        </form>

      </Stack>

</div>




</div>

{data?.rows?.length>0?<ArticleContainer>
    {data?.rows?.map((row,index)=>{
        return <ArticleCard key={index} data={row}/>
    })}
</ArticleContainer>:<EmptyResponse/>}


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






</div>

<Footer/>
</>







}

export async function getServerSideProps({query}){
        try{

                var url='/article/search?'
                var orderField=query?.sorted=="name"? "title":"createdAt"
                var orderType=query?.sorted=="name" ? "ASC":"DESC"
            
                const keys=Object.keys(query)

                keys.map((key)=>{
                    url+=`${key}=${query[key]}&`
                })

                const response=await axios.get(url,{
                        headers:{
                            offset:query?.page?(query?.page-1)*perPageLimit:0,
                            limit:perPageLimit,
                            attributes:'id,title,year,issue,volume,period,type,createdAt',
                            orderfield:orderField,
                            ordertype:orderType
                        }

                })

                return {props:{
                        data: response?.data?.result
                    }}

        }catch(e){
                return {props:{
                        data:{
                                e
                        }
                }}
        }


}