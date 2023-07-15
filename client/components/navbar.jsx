import { useState,useEffect } from "react"


import {   Popover,PopoverTrigger,PopoverContent,PopoverArrow,PopoverBody
} from "@chakra-ui/react"

import Link from "next/link";
import useSWR from "swr";

import Image from "next/image";



import axios from "../axios"
const icrepMobile="1ZPmp-Ux9077XbQyvG-MPU7F7O8r7TdKt"
const icrepDesktop="1Psv8Vnr6u4M1qXbmvLvysHuMPOyNpNLY"
const cusatMobile="1Vlzeyq3sk2V6yOiaI3pXajfXN3EVVilJ"
const cusatDesktop="169cf8tR5Xaut5HLm1-OanZ3h3Kt8d1lx"

const NavBar=()=>{
    const [scroll,setScroll]=useState(false)
    const [show,setShow] = useState(false)

    const fetcher=async(args)=>{
        const response=await axios.get(args.url,{
          headers:args.options
        })
  
        return response?.data?.result
      }
  
      const {data,loading} = useSWR({url:'/publication/recent',options:{limit:8,offset:0}},fetcher)


    const [menu,setMenu] = useState(false)
    const [publicationMenu,setPublicationMenu] = useState(false)
    const  [recentPublicationsMenu,setRecentPublicationsMenu] = useState(false)
    const handleScroll=()=>{
        if(window.scrollY>0){
            console('scroll')
            setShow(false)
            setScroll(true)
        }
        else{
            setScroll(false)
        }    

    }

        useEffect(()=>{window.addEventListener('scroll',handleScroll)
        return window.removeEventListener('scroll',handleScroll)
    
    })




        return <>


<div className="print:hidden">
{menu?<div className="fixed  bg-gradient-to-r from-primary to-secondary top-0  duration-300  w-full h-full overflow-hidden  text-white desktop:hidden  z-50 top-[0] p-2 ">

<button className="absolute right-[20px] top-[17px]" onClick={()=>setMenu(false)}>

<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg>

</button>


<ul className="flex flex-col  h-full space-y-3 py-16 font-[500] text-base ">
                      
                      

                      <Link href={`/`} className="py-3 flex w-full justify-center bg-black/10 rounded-md text-slate-300">
                        <span>Home</span>
                        </Link>
                      <Link href={`/editors`} className="py-3 flex w-full justify-center bg-black/10 rounded-md text-slate-300">Editorial Board</Link>
                      <button  className="py-3 flex w-full justify-center bg-black/10 rounded-md text-slate-300 relative items-center" onClick={()=>{setPublicationMenu(!publicationMenu)}}>
                        <span>Publications</span>
                        {!publicationMenu?<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 absolute right-[25px]">
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
</svg>:<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 absolute right-[25px]">
  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
</svg>

}

                      </button>

                      {publicationMenu?<div classname="flex flex-col duration-500">
                        <button className="w-full flex items-center justify-center text-slate-300 bg-black/5 p-3 mb-1 rounded-md relative" onClick={()=>{setRecentPublicationsMenu(!recentPublicationsMenu)}}>
                            <span>Recent Publications</span>
                            {!recentPublicationsMenu?<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 absolute right-[25px]">
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
</svg>:<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 absolute right-[25px]">
  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
</svg>

}

                            </button>

                            {recentPublicationsMenu?<div className="py-2">
                                  {data?.rows.map((element,index)=>{
                                    return <Link key={index} href={`/publications?volume=${element?.volume}&issue=${element?.issue}`} type="button" className="flex py-2 bg-black/5 w-full  justify-center p-3 text-slate-300">{`Volume ${element.volume} Issue ${element?.issue}`}</Link>
                                  })}
                              </div>:<div></div>}
                           
                        <button className="w-full text-slate-300 bg-black/5 p-3 rounded-md">Archive</button>
                      </div>:<div className="hidden duration-500"></div>}
                      
                      <Link href={'/contribute'} className="py-3 flex w-full justify-center bg-black/10 rounded-md text-slate-300">Contribute</Link>
                      <Link href={`/contact`} className="py-3 flex w-full justify-center bg-black/10 rounded-md text-slate-300">Contact Us</Link>
                      {/* <Link href={`/user/login`}>Sign In/Register</Link> */}




            </ul>

</div>:<div className="fixed top-[-100%]  duration-300 w-full h-full overflow-hidden  text-white desktop:hidden  z-50 top-[0] p-3">

</div>
}
</div>

<div className="flex p-5 justify-end desktop:hidden print:hidden">
            <button className="
            absolute right-[20px] top-[17px]" onClick={()=>{setMenu(true)}}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
<path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
</svg>

            </button>




           
    </div>


          <div className="flex h-[80px] p-4 desktop:p-5 items-center justify-between   w-full">
              
              <Link href={`https://icrep.cusat.ac.in/`}>
              <Image src={`https://drive.google.com/uc?id=${icrepDesktop}`} alt="ICREP" className="flex-[0.10] max-w-[280px] h-[40px] hidden desktop:flex" width={280} height={40}/>
              <Image src={`https://drive.google.com/uc?id=${icrepMobile}`} alt="ICREP" className=" max-w-[80px]  h-[65px] flex desktop:hidden" width={60} height={45} />

              </Link>






              
             


            <div className="desktop:hidden items-center justify-center flex flex-col relative bottom-[5px] print:bottom-0">
            <span className=" flex justify-center text-center text-xs print:text-sm font-[600] text-primary">Prof NR Madhava Menon ICREP</span>
            <span className="flex justify-center text-center text-xs print:text-sm font-[600] text-red-600">Cochin University of Science and Technology</span>
            <span className="flex print:flex hidden text-xs underline print:text-base font-[600] relative top-[5px]">ICREP JOURNAL OF INTERDISCIPLINARY STUDIES</span>            
            <span className="hidden text-sm font-[400] text-secondary text-center print:flex">(ISSN 2583-8237)</span>

            </div>

              <Link href={`https://www.cusat.ac.in/`}>
              <Image src={`https://drive.google.com/uc?id=${cusatDesktop}`} alt="CUSAT" className="flex-[0.10] max-w-[320px] h-[50px] hidden desktop:flex" width={320} height={50}/>
              
              <Image src={`https://drive.google.com/uc?id=${cusatMobile}`} alt="CUSAT" className=" max-w-[80px]  h-[60px] flex desktop:hidden" width={60} height={40}/>
              </Link>

          </div>

      



      
       

          <div className="flex  w-full  hidden desktop:flex  p-3 justify-end">
                <ul className="font-[600] flex  items-center space-x-8 text-primary  text-sm flex-[0.50] justify-evenly">
                    

                    <Link href='/'>
                        <button className="">
                          Home

</button>
                    </Link>
                    <Link href='/editors'>Editorial Board</Link>


                    <Popover>

<PopoverTrigger>

<button className="rounded-full p-1 flex items-center space-x-2">
<span>Publications</span>


                  </button>
</PopoverTrigger>
<PopoverContent>
  <PopoverArrow />
  <PopoverBody>
    <div className="flex flex-col items-center space-y-1 w-full">

    
    <button className="hover:bg-slate-100 justify-center p-2 rounded-md  w-full  duration-500 flex items-center relative " onClick={()=>{setRecentPublicationsMenu(!recentPublicationsMenu)}}>
        <span>Recent Publications</span>
        {!recentPublicationsMenu?<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 absolute right-[25px]">
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
</svg>:<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 absolute right-[25px]">
  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
</svg>

}

        </button>


        {recentPublicationsMenu?<div className="flex flex-col w-full">
                                  {data?.rows.map((element,index)=>{
                                    return <Link key={index} href={`/publications?volume=${element?.volume}&issue=${element?.issue}`} type="button" className="flex   w-full  justify-center p-2 text-gray-800">{`Volume ${element.volume} Issue ${element?.issue}`}</Link>
                                  })}
                              </div>:<div></div>}

    <Link href={`/publications/archive`} className="w-full">
    <button className="hover:bg-slate-100 justify-center p-2 w-full rounded-md  duration-500 flex ">Archive</button>
    </Link>

  

    
    </div>

  </PopoverBody>
</PopoverContent>
</Popover>

<Link href={`/contribute`} className="">
      <button className="justify-center  w-full  duration-500 flex ">Contribute</button>
      </Link>

<Link href={`/contact`} className="">
      <button className="justify-center  w-full  duration-500 flex ">Contact</button>
      </Link>
                

                    


                    
                </ul>
             </div>

  



    
    
    </>

}



  
  


export default NavBar;