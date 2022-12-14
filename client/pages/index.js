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
import useSWR from 'swr'

export default function Home(){





    return <>
    <NavBar/>
    <SearchBar/>
    <ArticleHeader />

        <div className="flex  w-full min-h-screen flex-col desktop:flex-row">
        <ArticleContainer>           
            
            {/* {data?.rows?.map((e)=><ArticleCard data={e}/>) }  */}

            
        </ArticleContainer>

        <TopicBar/>
        </div>args
        {/* {data?.rows&&<ArticlePagination count={data?.count} args={} itemsPerTab={5} setArgs={setArgs} />} */}

    <Footer/>
    </>


}



// export async function  getServerSideProps({query}){
    

//     const response=await axios.get('/article',{
//         headers:{
//             offset:(query?.page-1)*10,
//             limit:10,
//             attributes:'title,content,createdAt'
//         }

//     })


//     return {props:{
//         data: response?.data?.result
//     }}
// }



