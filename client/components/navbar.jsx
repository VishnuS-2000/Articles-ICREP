import { useState,useEffect } from "react"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CloseIcon from '@mui/icons-material/Close';


import Link from "next/link";


const NavBar=()=>{
    const [scroll,setScroll]=useState(false)
    const [show,setShow] = useState(false)

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



            
        <div className={`w-full  flex  sticky top-0 right-0 z-50   left-0   items-center justify-between bg-white  ${scroll?"drop-shadow":"shadow-none"} desktop:flex-col desktop:p-0 `}>


    {/*  Desktop */}




<div className='flex  w-full space-x-8 px-5 py-1 bg-gradient-to-r from-indigo-800 to-primary hidden desktop:flex'>
    
    <Link href='/'>
    <h1 className='text-white font-[500] cursor-pointer'>Home</h1>
    </Link>

    <Link href='/editors'>
    <h1 className='text-white font-[500] cursor-pointer'>Editorial</h1>
    </Link>


    <h1 className='text-white font-[500] cursor-pointer'>Contribute</h1>

    <Link href='/about'>
    <h1 className='text-white font-[500] cursor-pointer'>About Us</h1>
    </Link>
 
    </div>

    <div className="flex items-center w-full justify-between">



    {!show&&<button className='fixed top-3 left-[1px] desktop:hidden ' onClick={()=>setShow(true)}><MoreVertIcon/></button>}


    <Link href={'https://icrep.cusat.ac.in'}>
    <img src='/assets/logo/icrep.png' className='max-w-[80px]  desktop:hidden '/>

    {/* Desktop */}
    <img src='/assets/logo/icrep-desktop.png' className='cursor-pointer max-w-[250px] hidden  desktop:flex'/>
    
    </Link>

    <div className='flex flex-col justify-center items-center '>

       <p className='text-xs font-[600] text-center tablet:text-lg desktop:text-xl'>JOURNAL OF INTERDISCIPLINARY STUDIES</p>

    </div>
    
    <Link href={'https://www.cusat.ac.in'}>
    <img src='/assets/logo/cusat.png' className='max-w-[80px] cursor-pointer  desktop:hidden'/>
    <img src='/assets/logo/cusat-desktop.png' className='cursor-pointer max-w-[250px] hidden desktop:flex desktop:mr-2'/>
    </Link>





        
    {show?<div className='fixed w-full text-white opacity-100 left-0 right-0 z-50 top-[60px] bg-gradient-to-r from-indigo-900 to-primary bg-blur-3xl flex items-center justify-start drop-shadow-lg  bg-white h-[10%] tablet:h-[6%] z-50 duration-500 transition-all desktop:hidden'>
      
      <button className='absolute right-1 p-1 top-1 rounded-full ' onClick={()=>setShow(false)}>
      <CloseIcon/>
      </button>
      
      <ul className='flex md:text-xl flex-[1] justify-evenly font-medium cursor-pointer select-none highlight-none'>
          <li>
          <Link href={'/'}>
          Home
          </Link>
          </li>
          <li>
          <button onClick={()=>onOpen()}>
          Contribute
          </button>
          </li>
          <li>
          <Link href={`/editors`}>
          Editorial
          </Link>
          </li>

          <li>
          <Link href={`/about`}>
          About Us
          </Link>
          </li>
          </ul>
      
      
      </div>:<div className='fixed w-full text-white left-0 right-0 top-[-60px] opacity-0 bg-white bg-blur-3xl flex items-center justify-start drop-shadow-lg  bg-white  z-50 duration-700 transition-all desktop:hidden'>    
      </div>}


      </div>


</div>





    
    
    </>

}

export default NavBar;