import axios from "../../../../axios"
import Link from 'next/Link'
const VerifyRegister=({data})=>{

    console.log(data)
    if(data?.email){

    return <div className="min-h-screen tablet:bg-gradient-to-r from-primary to-blue-800 flex flex-col w-full justify-center  tablet:items-center">

<div className="flex flex-col w-full justify-center  bg-white p-5  space-y-12 tablet:px-10 tablet:py-20 tablet:drop-shadow-lg  tablet:rounded-md tablet:w-[560px]   desktop:space-y-8">
      <div className='text-2xl'>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-14 h-14 text-green-600">
  <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
</svg>

</div>

      <h1 className="text-2xl font-bold desktop:text-3xl">Verified</h1>
      <p className='text-xl '>{`A new ${data?.role} account has been created for ${data?.email}`}</p>

      
      <Link href='/'>
      <button
          className="bg-gradient-to-r from-indigo-900 drop-shadow to-primary font-semibold text-white p-2 w-full font-xl rounded-full">
          Back to Home
        </button>
        </Link>
      </div>
        </div>


    }
    else{
        return <div className="min-h-screen tablet:bg-gradient-to-r from-primary to-blue-800 flex flex-col w-full justify-center  tablet:items-center">

<div className="flex flex-col w-full justify-center  bg-white p-5  space-y-12 tablet:px-10 tablet:py-20 tablet:drop-shadow-lg  tablet:rounded-md tablet:w-[560px]   desktop:space-y-8">
      <div >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 text-red-600">
  <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
</svg>



</div>

      <h1 className="text-2xl font-bold desktop:text-3xl">Timeout/Failure</h1>
      <p className='text-xl '>Request for new account has timed out or failed</p>

      
      <Link href='/'>
      <button
          className="bg-gradient-to-r from-indigo-900 drop-shadow to-primary font-semibold text-white p-2 w-full font-xl rounded-full">
          Back to Home
        </button>
        </Link>
      </div>
        </div>
    }

}
export default VerifyRegister

export async function getServerSideProps({query}){
    
    try{
    const response=await axios.post(`/auth/verify/register/${query.verify}`)

    return {
        props:{
            data:response.data
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




