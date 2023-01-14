import NavBar from "../components/navbar";
import Footer from "../components/footer";
import { PhotoGallery } from "../components/gallery";

import Link from "next/link";

export default function Gallery(){

    return <>
    <NavBar/>
        <div className="flex w-full min-h-screen flex-col space-y-5 pb-12 ">

            <div className="flex desktop:px-20 items-center bg-gradient-to-r space-x-8 from-primary to-black p-5  w-full ">
            
            
            
            <Link href={`/`}>
      
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#fff" className="w-6 h-6 tablet:h-7 tablet:w-7 ">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
</svg>



</Link>

            
<h1 className="text-base tablet:text-lg  font-[500] text-white ">Gallery</h1>

         
            </div>

            <div className="flex flex-col p-5  desktop:py-5 w-full space-y-5 tablet:p-6 desktop:p-24 ">
            


            <PhotoGallery/>
                   
</div>


        </div>

        <Footer/>
    </>

}