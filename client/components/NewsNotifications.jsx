import Link from 'next/link'
import useSWR from 'swr'
import axios from '../axios'

export const AnnouncementsContainer=()=>{

  const fetcher=async(args)=>{
    const response=await axios.get(args.url,{
      headers:args.options
    })

    return response?.data?.result
  }
  const {data,error}=useSWR({url:'/announcement/active'},fetcher)



    return <div className="py-5 desktop:py-12   flex flex-col rounded-md  border border-gray-200  w-full  w-full desktop:max-w-[20%] relative">
                <h1 className="flex px-5 items-center space-x-3 text-secondary  text-sm desktop:text-base desktop:text-base font-[500] ">
                
                    <span className='font-[600] text-base'>
                    Announcements
                        </span>          
                        </h1>

                        <div className='px-5 py-5 space-y-3'>
                {data?.rows?.map((element,index)=>{

                 return <Link key={index} href={`/announcements/${element?.id}`} className='flex items-center hover:underline rounded-md  justify-between duration-500 text-sm desktop:text-base  '>
                       <div className="flex flex-col bg-white bg-primary text-slate-100 p-1 rounded-[5px]">
                        <p className='font-[500] text-sm'>{element?.title?.length>25?`${element?.title.slice(0,25)}...`:`${element?.title}`} ({element?.dated})</p>
                       </div>
                       
                       

                    </Link>
                })}

                <Link href={`/announcements/list`} className='text-sm py-3 px-1 items-center justify-between  rounded-md hover:bg-slate-200 w-full flex'>
                  <span>View All Announcements</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
</svg>

                  </Link>
        </div>

        </div>




}

