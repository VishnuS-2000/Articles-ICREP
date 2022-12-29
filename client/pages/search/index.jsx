import NavBar from "../../components/navbar";
import Head from "next/head";

import { FormControl, Input,FormLabel } from "@chakra-ui/react";
import { useState } from "react";
export default function Search(){



const [showMore,setShowMore] =useState(false);
const[searchResults,setSearchResults] = useState(false);




return <>

<Head>
        <title>Advanced Search</title>
        </Head>
    <NavBar/>



<div className="min-h-screen flex flex-col ">
        <form className="p-5 tablet:p-8 desktop:p-12">
        <h1 className="text-lg tablet:text-xl desktop:text-2xl font-[600]">Advanced Search</h1>

        <FormControl className="space-y-5 tablet:space-y-0 tablet:flex tablet:space-x-3 desktop:space-x-5 py-5 tablet:py-8 desktop:py-10">
        
        <FormControl >
        <h1 className="text-sm tablet:text-base font-[600] ">Keywords</h1>
        <Input  className="text-sm tablet:text-base border border-slate-400" variant="" />
        </FormControl>

        <FormControl >
        <h1 className="text-sm tablet:text-base font-[600]">Title</h1>
        <Input  className="text-sm   tablet:text-base border border-slate-400" variant=""/>
        </FormControl>

        
        <FormControl className="" >
        
        <h1 className="text-sm tablet:text-base font-[600]">Author</h1>
        <Input  className="text-sm   tablet:text-base border border-slate-400" variant=""/>
        </FormControl>
        
       

        </FormControl>

        {showMore&&<FormControl className="space-y-5  tablet:space-y-0 tablet:flex tablet:space-x-3 desktop:space-x-5 pb-5 tablet:pb-8 desktop:pb-10">
        
        
        <FormControl className="" >
        
        <h1 className="text-sm tablet:text-base font-[600]">Issue</h1>
        <Input  className="text-sm   tablet:text-base border border-slate-400" variant=""/>
        </FormControl>

        <FormControl >
        <h1 className="text-sm tablet:text-base font-[600]">Volume</h1>
        <Input  className="text-sm   tablet:text-base border border-slate-400" variant=""/>
        </FormControl>

        <FormControl >
        <h1 className="text-sm tablet:text-base font-[600]">Year</h1>
        <Input  className="text-sm   tablet:text-base border border-slate-400" variant=""/>
        </FormControl>

        </FormControl>}

        {!showMore&&<div className="flex py-3 tablet:py-5">
        <button type="button" className="font-[600] flex items-center" onClick={()=>setShowMore(true)}>Show All 
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75" />
</svg>

        </button>
        </div>}


   

        <div className="flex py-5 tablet:py-8 justify-end">
        <button className="flex items-center justify-center space-x-5 bg-gradient-to-r from-primary to-indigo-900 text-base tablet:max-w-[150px] tablet:space-x-1 text-white w-full p-3 rounded-md">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
</svg>

            
            <p>Search</p>
        </button>
        </div>


<div>
        <h1 className="text-sm tablet:text-lg font-[500]">Recent Searches</h1>

</div>


</form>
        
</div>


<div className="flex flex-col min-h-screen relative bottom-0 bg-gray-50 bottom-0 absolute w-full p-5 tablet:p-8 desktop:p-12">

<div className="flex flex-col  tablet:flex-row items-between tablet:justify-between ">
<h1 className="text-lg tablet:text-xl desktop:text-2xl font-[600]">Search Results</h1>
<div className="flex items-center space-x-5 ">   
        <h1 className="font-[500]">Sorted By</h1>
        <button className="text-secondary">Relevance</button>
        <button className="text-secondary">Date</button>
</div>




</div>




<div className="flex py-6 absolute space-x-8 tablet:px-4 tablet:left-0  items-center flex-[1] justify-center bottom-0 ">
<button className="flex font-[500]">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
</svg>
        Previous
        </button>
       
       
        <p>Page 1 of 50</p>
        <button className="flex font-[500] ">
        Next
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
</svg>  
        </button>
</div>

</div>

</>







}

