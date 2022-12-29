import NavBar from "../components/navbar"
import Footer from "../components/footer"
import SearchBar from "../components/searchbar"
import TopicBar from "../components/topicbar"
import { ArticleContainer } from "../components/articles/Container"
import { ArticleHeader } from "../components/articles/Header"
import { ArticleCard } from "../components/articles/ArticleCard"

import { ArticlePagination } from "../components/Articles/Pagination"
import InfiniteScroll from 'react-infinite-scroll-component';
import { useEffect, useState } from "react"

import axios from "../axios"
import Head from "next/head"


import { Input,InputGroup, InputRightElement } from "@chakra-ui/react"
import Link from "next/link"

import { EditorsNote } from "../components/EditorsNote"
import {PhotoGallery} from "../components/gallery"

export default function Home({data}){

    console.log(data)


    return <>
      <Head>
        <title>Home</title>
        </Head>
    <NavBar/>

    <div className="flex flex-col w-full h-[250px]  tablet:h-[350px]  desktop:h-[400px] desktop:p-8 items-center  bg-gradient-to-r from-primary to-secondary  justify-center text-white">
    <div className="w-full  tablet:w-[60%] flex flex-col items-center font-[600]">
    <h1 className="text-lg tablet:text-2xl desktop:text-4xl">Journal of Interdisciplinary Studies</h1>
        
            
        <InputGroup className="relative px-5 font-[400]">
        <Input className="bg-white mt-12 text-sm  tablet:w-full text-base placeholder:text-sm tablet:placeholder:text-base" variant="filled" placeholder="What do you want to explore"/>
        <button className="bg-indigo-900 text-base px-3 h-[40px] rounded-r-[5px] absolute right-[20px] desktop:right-[20px] bottom-0">Search</button>
        
        </InputGroup>

        <div className="">

        </div>



        <div className="flex w-full justify-start px-5 py-3 desktop:p-5" >
            <Link href={`/search`}>
            <button className="hover:underline underline-offset-4 decoration-2	text-xs tablet:text-sm desktop:text-base font-[400] decoration-yellow-200">
                Advanced Search
                </button>
                </Link>
                </div>
       
    
    
    
    </div>
    </div>

    <EditorsNote/>
    <PhotoGallery/>


    

    <Footer/>
    </>


}






