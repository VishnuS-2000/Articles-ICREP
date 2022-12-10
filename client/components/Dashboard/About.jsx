import { useState } from "react";

import { Layout } from "./Layout"
import dynamic from 'next/dynamic'
const RichTextEditor= dynamic(() => import('@mantine/rte'), { ssr: false });

export const About=()=>{

    const [text,setText]=useState('')
    const [images,setImages]=useState(['https://c4.wallpaperflare.com/wallpaper/384/818/513/himalayas-mountains-landscape-nature-wallpaper-preview.jpg','https://c4.wallpaperflare.com/wallpaper/384/818/513/himalayas-mountains-landscape-nature-wallpaper-preview.jpg','https://free4kwallpapers.com/uploads/originals/2019/05/18/awesome-himalayas-wallpaper.jpg','https://images.pexels.com/photos/1416900/pexels-photo-1416900.jpeg?cs=srgb&dl=pexels-rasik-1416900.jpg&fm=jpg','https://wallpaperaccess.com/full/93180.jpg'])


    return <Layout heading="About">
        <div className="justify-evenly flex-col hidden desktop:flex relative">

        <button className="max-w-[150px] absolute top-[-40px] right-0 flex text-base justify-evenly py-1  drop-shadow px-3 rounded-full text-white bg-gradient-to-r from-primary to-indigo-800 items-center" >
        Save</button>

            <div className="flex h-[250px] justify-evenly items-center space-x-3 flex-[1] desktop:h-  desktop:rounded-md bg-indigo-50  w-full overflow-y-auto  desktop:px-4 px-2 h-full ">
            <button className="flex flex-[0.10] text-base justify-evenly py-1 max-w-[120px] h-[80%] drop-shadow bg-white px-3 rounded-md   items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>

        Upload</button>

           {/* Images    */}

           <div className="flex flex-[0.90] overflow-x-auto">
            {images.map((e)=>{
                return<div className="relative">
                <button className="rounded-full absolute  top-1 left-1  bg-slate-200 drop-shadow-md p-1">

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
</svg>

                </button>
                <img src={e} className="rounded-sm  h-full"/>
                </div>
            })}
        </div>

        
        </div>
     
   

     
            <div className="flex flex-[1] ">

            <RichTextEditor controls={[
    ['bold', 'italic', 'underline', 'link', 'image'],
    ['unorderedList', 'h1', 'h2', 'h3'],
    ['sup', 'sub'],
    ['alignLeft', 'alignCenter', 'alignRight'],
  ]} value={text} onChange={setText} className='w-full sticky h-full overflow-y-auto text-lg border border-2 border-black'/>


    
            </div>

        </div>


    </Layout>
}