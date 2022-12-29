import { useEffect,useState } from "react"
import axios from "../axios"


import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Gallery } from "react-grid-gallery";

const galleryFolderId='1UKlIutBaYqwr9znykoXZMSEAhzBZBE48'


export const PhotoGallery=()=>{


    const [images,setImages]=useState()

    useEffect(()=>{


        const fetchData=async()=>{


            const response=await axios.get(`/app/folder/${galleryFolderId}`)


            if(response){
                
                const imageData=response?.data?.result?.images.map((image)=>{

                    return {src:`https://drive.google.com/uc?id=${image}`}



                })

                setImages(imageData)

            }
        }


        fetchData()


    },[])




    return <>
    
    <div className="flex  w-full  py-8 px-8 flex-col tablet:p-16 desktop:p-20  ">

<h1 className="tablet:text-2xl font-[600] ">Gallery</h1>
<div className="flex w-full  ">
<div className="py-5 tablet:py-8 desktop:py-20 w-full tablet:w-[650px] relative ">
    <Carousel showThumbs={false} transitionTime={600} autoPlay={true} infiniteLoop={true}>
            {images?.map((element)=>{

                return <img src={element?.src} className="w-full h-full drop-shadow rounded-lg" />
            })}


    </Carousel>

</div>
</div>





</div>
</>
}