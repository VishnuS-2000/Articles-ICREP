import axios from "../axios"
import NavBar from "../components/navbar"
import Footer from "../components/footer"
import TopicBar from "../components/topicbar"
import SearchBar from "../components/searchbar"
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useEffect, useRef,useState } from "react"

import Head from "next/head"

export default function About({data}){



    const viewLink="https://drive.google.com/uc?export=view&id="


    return <>

<Head>
        <title>About</title>
        </Head>
    <NavBar/>
  

        <div className="flex  w-full min-h-screen flex-col desktop:flex-row">
                <div className="flex flex-[1] items-center flex-col pb-12 desktop:flex-[0.60] space-y-5 text-justify desktop:items-start sticky left-[19%] relative px-5 py-3 desktop:px-10 desktop:py-10 space-y-1 desktop:text-lg">

                
                {data?.images&&<Carousel showArrows={true} showIndicators={true} duration={100} infiniteLoop={true}>
                    {data?.images?.map((fileId)=>{

                        return <div>
                        <img src={`${viewLink}${fileId}`} className="rounded-md max-w-[250px] max-h-[250px] tablet:max-w-[400px] tablet:max-h-[400px]"/>
                        </div>  
                    })}

                </Carousel>}

                </div>
    


        </div>

    <Footer/>
    </>


}



