import NavBar from "../components/navbar"
import Footer from "../components/footer"

import { useEffect ,useState} from "react"
import axios from "../axios"

import Link from "next/link"
import Head  from "next/head"
const folderId="1WnnVasYO6xw2uCJqc0TzmvRolrqbaPDd"
export default function Contact(){

    const [contact,setContact]=useState({})

    useEffect(()=>{

        const fetchData=async()=>{

        const response=await axios.get(`app/folder/${folderId}`)


        if(response){
            const exportData=response?.data?.result?.exports[0]?.result?.split(',')
            
            setContact({institute:{phone:exportData[0],email:exportData[1],name:exportData[2],designation:null,address:[exportData[7],exportData[8],exportData[9],exportData[10],exportData[11]]},cheifEditor:{phone:exportData[3],email:exportData[4],name:exportData[5],designation:exportData[6],address:[exportData[7],exportData[8],exportData[9],exportData[10],exportData[11]]}})

        }
        }
        fetchData()


    },[])

    console.log(contact)

    return <>

    <Head>
        <title>Contact Us</title>
    </Head>
    <NavBar/>
        <div className="flex flex-col w-full  min-h-screen">


        <div className="flex desktop:px-20 left-[100px] items-center bg-gradient-to-r space-x-8 from-primary to-black p-5  w-full ">
            
            
            
            <Link href={`/`}>
      
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#fff" className="w-6 h-6 tablet:h-7 tablet:w-7 ">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
</svg>



</Link>

            
<h1 className="text-base tablet:text-lg font-[500] text-white ">Contact Us</h1>

         
            </div>

            <div className="flex flex-col desktop:flex-row py-16 px-5 justify-between  desktop:px-20 space-y-5 w-full space-y-5 desktop:items-center  ">
            

            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15714.693033939906!2d76.327915!3d10.043798!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xebc91136028db555!2zMTDCsDAyJzM3LjciTiA3NsKwMTknNDAuNSJF!5e0!3m2!1sen!2sus!4v1672793920710!5m2!1sen!2sus" className="w-full h-[300px] tablet:h-[500px]  rounded-md desktop:max-w-[520px]" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>



            <div className="flex flex-col">

           

            {contact&&<div className="flex flex-col py-1  text-justify desktop:w-[450px] relative desktop:right-[10%] "  >

             <h1 className="text-black text-base desktop:text-lg my-3 font-[500] ">Publisher</h1>

                        
                        <p className="text-sm tablet:text-base  font-[600] text-primary">{contact?.institute?.name?.trim()?.replace(/["']/g, "")}</p>
                        <p className="text-sm tablet:text-base  font-[500] text-gray-600">{contact?.institute?.address[0]?.trim()?.replace(/["']/g, "")}</p>
                        <p className="text-sm tablet:text-base  font-[500] text-gray-600">{contact?.institute?.address[1]?.trim()?.replace(/["']/g, "")}</p>
                        <p className="text-sm tablet:text-base  font-[500] text-gray-600">{contact?.institute?.address[2]?.trim()?.replace(/["']/g, "")}</p>
                        <p className="text-sm tablet:text-base  font-[500] text-gray-600">{contact?.institute?.address[3]?.trim()?.replace(/["']/g, "")}</p>
                        <p className="text-sm tablet:text-base  font-[500] text-gray-600">{contact?.institute?.address[4]?.trim()?.replace(/["']/g, "")}</p>


                        <div className="flex space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
</svg>
        <span>Website</span>
        <Link href={`https://icrep.cusat.ac.in/`} className="underline">https://icrep.cusat.ac.in/</Link>
                        </div>

                        <div className="flex justify-between py-3 desktop:py-5 font-[500] text-sm tablet:text-base ">
                        {contact?.institute?.phone&&<p className="underline decoration-slate-500 cursor-pointer">+91 {contact?.institute?.phone}</p>}

                        <Link href={`mailto:${contact?.institute?.email}`}>
                        <p className="underline decoration-slate-500 cursor-pointer">{contact?.institute?.email?.replace(/["']/g, "")}</p>
                        </Link>

                        </div>
             
            </div>}


            {contact&&<div className="flex flex-col py-1  text-justify desktop:w-[450px] relative desktop:right-[10%] "  >

                    <h1 className="text-black text-base desktop:text-lg my-3 font-[500] ">Cheif Editor</h1>

                        <p className="text-sm tablet:text-base  font-[600] text-primary">{contact?.cheifEditor?.name?.trim()?.replace(/["']/g, "")},{contact?.cheifEditor?.designation?.trim()?.replace(/["']/g, "")}</p>
                        <p className="text-sm tablet:text-base  font-[500] text-gray-600">{contact?.cheifEditor?.address[0]?.trim()?.replace(/["']/g, "")}</p>
                        <p className="text-sm tablet:text-base  font-[500] text-gray-600">{contact?.cheifEditor?.address[1]?.trim()?.replace(/["']/g, "")}</p>
                        <p className="text-sm tablet:text-base  font-[500] text-gray-600">{contact?.cheifEditor?.address[2]?.trim()?.replace(/["']/g, "")}</p>
                        <p className="text-sm tablet:text-base  font-[500] text-gray-600">{contact?.cheifEditor?.address[3]?.trim()?.replace(/["']/g, "")}</p>
                        <p className="text-sm tablet:text-base  font-[500] text-gray-600">{contact?.cheifEditor?.address[4]?.trim()?.replace(/["']/g, "")}</p>
                        
                        


                        <div className="flex justify-between py-3 desktop:py-5 font-[500] text-sm tablet:text-base ">
                        {contact?.cheifEditor?.phone&&<p className="underline decoration-slate-500 cursor-pointer">+91 {contact?.cheifEditor?.phone}</p>}

                        <Link href={`mailto:${contact?.cheifEditor?.email?.trim()?.replace(/["']/g, "")}`}>
                        <p className="underline decoration-slate-500 cursor-pointer">{contact?.cheifEditor?.email?.trim()?.replace(/["']/g, "")}</p>
                        </Link>
                        </div>
             
            </div>}

            </div>

            </div>


            
        </div>
<Footer/>
    </>
}
 


const Map=()=>{

    return 
}




export async function getServerSideProps(){


    try{
        const response=await axios.get('/app/folder/1x6YdOwXtpXwGMSY8LtlSFuAwZ2Mfxx7s')
        return{

            props:{
                data: response?.data?.result
            }
        }


    }catch(err){

        return {
            props:{
                data:{}
            }
        }


    }


}