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
  

      <div className="flex  w-full h-screen bg-slate-50 flex-col desktop:flex-row p-8 tablet:p-16 desktop:p-20 ">
               <div className="flex flex-col space-y-3">
                <h1 className="text-6xl desktop:text-6xl font-[800] text-primary">Error 404</h1>

                <div>
                <h1 className="text-2xl desktop:text-2xl font-[500] text-secondary">Page Not Found</h1>

                <Link href={{pathname:'/'}} className="">
                <button className=" desktop:text-lg py-5 text-secondary  font-[600] flex items-center space-x-5">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
</svg>
                  Go Home
             

                
                </button>
                </Link>


           </div>
                </div>
      </div>

<div className="absolute bottom-0 w-full">
  <Footer/>

</div>
  </>
}