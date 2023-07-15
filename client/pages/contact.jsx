import NavBar from "../components/navbar"
import Footer from "../components/footer"

import { useEffect ,useState} from "react"
import axios from "../axios"

import Link from "next/link"
import Head  from "next/head"
const contactSheetId="1UBU1o9awBjQdVyMiDvezJ2yT8S8sYhuyW_NezGMEUQw"

import { useRouter } from "next/router"
export default function Contact(){

    const [contact,setContact]=useState([])
    const router=useRouter()

    useEffect(()=>{

        const fetchData=async()=>{

        const response=await axios.get(`app/sheet/${contactSheetId}`)

   
        if(response){
            const exportData=response?.data?.result?.map((element)=>{
                const title=element[0];
                const name=element[1];
                const phone=element[2];
                const email=element[3];
                const place=element[4];
                const address=element[5];
                const website=element[6];

                return {title, name, phone, email, place,address,website}
            })

            setContact(exportData);

        }
        }
        fetchData()


    },[])


    return <>

    <Head>
        <title>Contact Us</title>
    </Head>
    <NavBar/>
        <div className="flex flex-col w-full  min-h-screen relative">


        <div className="flex desktop:px-20 left-[100px] items-center bg-gradient-to-r space-x-8 from-primary to-black p-5  w-full ">
            
            
            
            <a onClick={()=>{router.back()}} className="cursor-pointer">
      
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#fff" className="w-6 h-6 tablet:h-7 tablet:w-7 ">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
</svg>



</a>

            
<h1 className="text-base tablet:text-lg font-[500] text-white ">Contact Us</h1>

         
            </div>

            

            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15714.693033939906!2d76.327915!3d10.043798!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xebc91136028db555!2zMTDCsDAyJzM3LjciTiA3NsKwMTknNDAuNSJF!5e0!3m2!1sen!2sus!4v1672793920710!5m2!1sen!2sus" className="w-full h-[250px] tablet:h-screen" allowfullscreen="true" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>



            <div className="flex flex-col  tablet:absolute tablet:right-[50px]  tablet:top-[15%] bg-white/90 rounded-md drop-shadow-md border border-1 border-gray-200">

           

            {contact&&contact?.map((element,index)=>{
                return <div key={index} className="flex flex-col py-1  text-justify tablet:w-[520px] p-5  desktop:px-8 py-8 "  >

<h1 className="text-base desktop:text-base my-1 text-primary font-[600] ">{element?.title}</h1>

           
           <p className="text-base tablet:text-base  font-[500]  my-1">{element?.name}</p>
           <p className="text-sm tablet:text-sm">{element?.place}</p>
           <p className="text-sm tablet:text-sm whitespace-pre-wrap">{element?.address}</p>


           {element?.website&&<div className="flex space-x-2 items-center relative right-[5px] my-3">
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
  <path d="M15.75 8.25a.75.75 0 01.75.75c0 1.12-.492 2.126-1.27 2.812a.75.75 0 11-.992-1.124A2.243 2.243 0 0015 9a.75.75 0 01.75-.75z" />
  <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM4.575 15.6a8.25 8.25 0 009.348 4.425 1.966 1.966 0 00-1.84-1.275.983.983 0 01-.97-.822l-.073-.437c-.094-.565.25-1.11.8-1.267l.99-.282c.427-.123.783-.418.982-.816l.036-.073a1.453 1.453 0 012.328-.377L16.5 15h.628a2.25 2.25 0 011.983 1.186 8.25 8.25 0 00-6.345-12.4c.044.262.18.503.389.676l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.575 15.6z" clipRule="evenodd" />
</svg>

<Link href={`${element?.website}`} className="underline text-sm tablet:text-sm">{element?.website}</Link>
           </div>}

           <div className="flex justify-between py-3 desktop:py-5 font-[500] text-sm tablet:text-base ">
           
            
           {element?.phone&&<p className="underline text-sm text-gray-700 decoration-slate-500 cursor-pointer flex items-center">
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
  <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
</svg>

            {element?.phone}
            </p>}

           <Link href={`mailto:${element?.email}`} className="flex items-center text-gray-700 text-sm">
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25" />
</svg>

           <p className="underline decoration-slate-500 cursor-pointer">{element?.email?.replace(/["']/g, "")}</p>
           </Link>

           </div>

</div>
            })}


      

            </div>



            
        </div>
<Footer/>
    </>
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