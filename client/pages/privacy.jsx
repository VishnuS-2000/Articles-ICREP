import NavBar from "../components/navbar"
import Footer from "../components/footer"
import axios from "../axios";
export default function Policy({data}){






    return<>
    <NavBar/>
<div className="flex flex-col min-h-screen">
<div className="flex flex-col px-5 py-5 desktop:py-8 desktop:px-20 ">


<h1 className="font-[600] text-base desktop:text-lg ">Privacy Policy</h1>
<p className="whitespace-pre-wrap  text-sm text-gray-800 desktop:text-base my-2">
{data}

    
</p>

</div>


</div>
    
    <Footer/>
    </> 


}



export async function getServerSideProps(){


try{

    const response=await axios.get('/app/doc/16skWZbG8jv7iglqD_SvF3uEsavHKFgPOLReD5sPiOSw')

    return {
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