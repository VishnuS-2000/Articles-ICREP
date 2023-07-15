import NavBar from "../components/navbar"
import Footer from "../components/footer"
import Head from "next/head"

export default function Error(){


    return <>
    <Head>
      <title>Error</title>
      </Head>
  <NavBar/>
  

      <div className="flex items-center w-full h-screen bg-slate-50 flex-col py-5 p-8 tablet:p-16 desktop:p-20 ">
               
               <div className="flex flex-col desktop:flex-row desktop:space-x-10 space-y-5 relative top-[50px]  desktop:top-[50px]">


             
            


                <div className="flex flex-col items-center ">

                <h1 className="text-8xl desktop:text-9xl font-[800] text-primary">500</h1>
                <h1 className="text-base desktop:text-lg font-[500] text-secondary text-center text-secondary">Something Happened at our end.Please Try Again Later</h1>

                



           </div>
                </div>
              </div>

          

  
<div className="absolute bottom-0 w-full">
  <Footer/>

</div>
  </>
}