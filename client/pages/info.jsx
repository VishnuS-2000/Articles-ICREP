import Head from "next/head"
import NavBar from "../components/navbar"
import Footer from "../components/footer"
import Link from "next/link"
export default function Info(){


    return  <>
    <Head>
        <title>Editorial Board</title>
    </Head>

    <NavBar/>
        <div className="flex w-full  flex-col space-y-5 pb-12 min-h-screen ">

            <div className="flex desktop:px-20 items-center bg-gradient-to-r space-x-8 from-primary to-black p-5  w-full ">
            
            
            
            <Link href={`/`}>
      
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#fff" className="w-6 h-6 tablet:h-7 tablet:w-7 ">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
</svg>



</Link>

            
<h1 className="text-base tablet:text-lg  font-[500] text-white ">Journal Info</h1>

         
            </div>

            <div className="flex flex-col p-5  desktop:py-5 w-full space-y-5 tablet:p-6 desktop:p-24 ">


                    <div className="">
                    <h1 className="text-base font-[500]">Aim & Scope</h1>
                    <p className="text-justify my-2">
                    The ICREP journal of Interdisciplinary Studies aims to promote and disseminate Interdisciplinary research. It intends to provide a platform to conduct debate & discussions on contemporary issues. It further aims to act as an open access forum for sharing of ideas and knowledge. Thus, the journal would attempt to propagate the thoughts of young researchers and students thereby broadening the vistas of knowledge.
                    </p>

                    </div>

                   
                    <div className="">

                    <h1 className="text-base font-[500] ">Publication Frequency</h1>

                        <p className="my-2">
                            Quarterly
                        </p>
                    
                    </div>

                   
</div>


        </div>

        <Footer/>
    </>
}