import NavBar from "../components/navbar"
import Footer from "../components/footer"
import Head from "next/head"
import Link from "next/link"
export default function NotFound(){




    return <>
    <Head>
      <title>Error</title>
      </Head>
  <NavBar/>
  

      <div className="flex items-center w-full h-screen bg-slate-50 flex-col py-5 p-8 tablet:p-16 desktop:p-20 ">
               
               <div className="flex flex-col desktop:flex-row desktop:space-x-10 space-y-5 relative top-[50px]  desktop:top-[50px]">


             
            


                <div className="flex flex-col items-center ">

                <h1 className="text-8xl desktop:text-9xl font-[800] text-primary">404</h1>
                <h1 className="text-xl desktop:text-2xl font-[500] text-secondary">Page Not Found</h1>

                <div className="flex flex-col desktop:space-y-0 space-y-3 my-5 desktop:flex-row desktop:space-x-5 desktop:my-5">

             
                <Link href={{pathname:'/'}} className="">
               <button className=" desktop:text-base flex-[1] rounded-md justify-center   text-secondary border border-primary  font-[600] flex items-center w-[200px] p-3 space-x-1">

               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
  <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
  <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
</svg>


                  <span>
                    Go Home
                  </span>
                </button> 
                </Link>


                <Link href={{pathname:'/'}} className="">
               <button className=" desktop:text-base rounded-md justify-center  text-red-600 border border-red-600  font-[600] flex items- w-[200px] space-x-1   p-3 ">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
  <path fillRule="evenodd" d="M3 2.25a.75.75 0 01.75.75v.54l1.838-.46a9.75 9.75 0 016.725.738l.108.054a8.25 8.25 0 005.58.652l3.109-.732a.75.75 0 01.917.81 47.784 47.784 0 00.005 10.337.75.75 0 01-.574.812l-3.114.733a9.75 9.75 0 01-6.594-.77l-.108-.054a8.25 8.25 0 00-5.69-.625l-2.202.55V21a.75.75 0 01-1.5 0V3A.75.75 0 013 2.25z" clipRule="evenodd" />
</svg>
      

                  <span>
                    Report Problem
                  </span>
                </button> 
                </Link>

                </div>



           </div>
                </div>
              </div>

          

  
<div className="absolute bottom-0 w-full">
  <Footer/>

</div>
  </>
}