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
            
            setContact({address:exportData?.slice(2,exportData.length).join()?.replaceAll('"',''),phone:exportData[0],email:exportData[1]})
        }
        }
        fetchData()


    },[])

    // console.log(contact)

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

            <div className="flex flex-col desktop:flex-row py-16 px-5 justify-between  desktop:px-20 space-y-5 w-full space-y-5  ">
            

            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15714.693033939906!2d76.327915!3d10.043798!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xebc91136028db555!2zMTDCsDAyJzM3LjciTiA3NsKwMTknNDAuNSJF!5e0!3m2!1sen!2sus!4v1672793920710!5m2!1sen!2sus" className="w-full h-[300px] tablet:h-[500px]  rounded-md desktop:max-w-[520px]" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            

            <div className="flex flex-col py-8 desktop:py-24 text-justify desktop:w-[450px] relative desktop:right-[10%] "  >
                        <h1 className="text-sm tablet:text-base  font-[500] text-primary ">{contact?.address}</h1>


                        <div className="flex justify-between py-3 desktop:py-5 font-[500] text-sm tablet:text-base ">
                        {contact?.phone&&<p className="underline decoration-slate-500 cursor-pointer">+91 {contact?.phone}</p>}

                        <Link href={`mailto:${contact?.email}`}>
                        <p className="underline decoration-slate-500 cursor-pointer">{contact?.email}</p>
                        </Link>
                        </div>
             
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