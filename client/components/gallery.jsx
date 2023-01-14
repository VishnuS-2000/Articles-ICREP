import { useEffect,useState } from "react"
import axios from "../axios"


import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Gallery } from "react-grid-gallery";
import { motion, AnimatePresence } from "framer-motion"
import { Modal,useDisclosure,ModalCloseButton, ModalOverlay,ModalBody,ModalContent} from "@chakra-ui/react";

const galleryFolderId='1UKlIutBaYqwr9znykoXZMSEAhzBZBE48'


export const PhotoGallery=()=>{


    const [images,setImages]=useState()
    const [expanded,setExpanded]=useState(false)
    const {isOpen,onOpen,onClose}=useDisclosure()
    const [active,setActive]=useState()



    useEffect(()=>{

        const fetchData=async()=>{


            const response=await axios.get(`/app/folder/${galleryFolderId}`)


            console.log(response?.data?.result?.images)

            if(response){
                
         
                setImages(response?.data?.result?.images)
            }
        }


        fetchData()

    },[])
                                                                                                                                                                                                                                                                     
  

    const handleNext=()=>{
        console.log((active+1)%images?.length)
        setActive((active+1)%images?.length)
    }

    const handlePrevious=()=>{

        console.log((active-1)%images?.length)
        setActive((active-1)<0?images?.length-1:(active-1)%images?.length)
    }


    return <>


    
    <div className="grid gap-1  tablet:grid-cols-2 desktop:grid-cols-3 w-full    relative p-5 tablet:p-8 desktop:p-10 ">


        {images?.map((image,index)=>{


                    
                    return<div className={`cursor-pointer relative bg-black rounded-md`}>
                        <img src={`https://drive.google.com/uc?id=${image}`} className="w-full h-full rounded-md hover:opacity-[0.5] duration-300" onClick={()=>{setExpanded(true); onOpen();setActive(index)}}  />
                        
                    </div>



        })}





        <Modal isOpen={isOpen} onClose={onClose} size="4xl" isCentered>
            <ModalOverlay   backdropFilter='blur(25px)'/>
            <ModalContent >

                    <div className="relative">
                    
                    <div className="absolute flex w-full items-center justify-between p-1 top-[45%]">
                    <button className=" p-1 font-[600] bg-slate-200 rounded-full drop-shadow-lg " onClick={handlePrevious}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 desktop:w-8 desktop:h-8">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
</svg>

                    </button>
                    <button className=" p-1 font-[600] rounded-full bg-slate-200 drop-shadow-lg " onClick={handleNext}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 desktop:w-8 desktop:h-8">
  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
</svg>

                        </button>    

                 </div>

                    {images&&<img src={`https://drive.google.com/uc?id=${images[active]}`} className="w-full h-full rounded-md"/>}
                    
                
                    </div>
  
            </ModalContent>
        
        </Modal>



</div>
</>
}