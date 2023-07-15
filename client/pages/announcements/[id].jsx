import NavBar from "../../components/navbar"
import Footer from "../../components/footer"
import {PublicationsInfoContainer} from "../../components/PublicationInfo"
import {AnnouncementsContainer} from "../../components/NewsNotifications"
import axios from "../../axios"
import Head from "next/head"
export default function Index({data}){


    return <>
    <Head>

        <title>{data?.title}</title>
    </Head>
    <NavBar/>
    <div className="flex flex-col-reverse desktop:flex-row bg-slate-50 justify-between  w-full min-h-screen ">

    <PublicationsInfoContainer/>
        <div className="flex flex-col  desktop:space-y-8 desktop:w-[50%] px-5 py-10">
        <div>
        <h1 className="desktop:text-xl font-[600]">{data?.title}</h1>
        <p className="text-gray-500 font-[500]"><span>{data?.dated}</span>
        {data?.file&&<a target="_blank"  rel="noreferrer" className="text-gray-700 ml-3 underline" href={`${process.env.NEXT_PUBLIC_BACKEND_DOCUMENT_URL}/${data?.file}`}>View Attachment</a>}
        </p>

        
        
        </div>
        
        <p className="text-justify  text-secondary text-sm desktop:text-base whitespace-pre-wrap">{data?.description}</p>
        

        
        </div>
   



    <AnnouncementsContainer/>

</div>
<Footer/>

</>
}



export async function getServerSideProps({params}){



    try{
    
        const response=await axios.get(`/announcement/${params.id}`,{
            headers:{
                attributes:'id,title,dated,description,file'
            }
        })
    
        return {
            props:{
            data:response?.data?.result
        }
        }
    }
    catch(err){
    
    return {
    
    
    props:{
        data:{}
    }
    
    }
    
    
    
    
    }
    
    
    
    }