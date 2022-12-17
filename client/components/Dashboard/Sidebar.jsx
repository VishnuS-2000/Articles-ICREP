import {menuItems} from "../Dashboard/Menu"
import {useRouter} from "next/router"

import axios from "../../axios"
import Image from "next/image"
export const Sidebar=({active,toggler})=>{

    const router=useRouter()
    const handleLogout=async()=>{


        const result=await axios.get('/auth/logout',{
            headers:{'Content-Type':'application/json'},
            withCredentials:'include'
            
        })
        console.log(result)

        if(result?.status==200)
            {
                router.replace('/admin/login')

            }

    }   


    

    return <div className="flex z-[50] fixed bottom-0 overflow-x-auto border-t border-slate-200 bg-white  p-2 justify-between w-full desktop:justify-start desktop:flex-col desktop:h-screen desktop:w-[20%] desktop:space-y-3 desktop:border-r desktop:border-slate-200 desktop:px-3">
        
        <div className="hidden desktop:flex justify-center select-none">
        <Image src="/assets/logo/icrep.png" className="flex-[0.1] max-w-[180px]" width={180} height={400} />
        </div>


    
        {menuItems.map((element,index)=>{
            // console.log(index)
            return <button className={`flex p-3 items-center space-x-5 select-none   rounded-md duration-400 ${active==index?'text-primary bg-blue-100':'text-black hover:bg-slate-100'}`} onClick={()=>{toggler(index)}}>
                {index==active?element.solidIcon:element.outlineIcon}
                <p className="hidden desktop:flex">{element.name}</p>
            </button>
        })}          

<button className={`flex  p-3 items-center select-none desktop:space-x-5  rounded-md duration-400 text-red-600`} onClick={handleLogout}>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
  <path fillRule="evenodd" d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm5.03 4.72a.75.75 0 010 1.06l-1.72 1.72h10.94a.75.75 0 010 1.5H10.81l1.72 1.72a.75.75 0 11-1.06 1.06l-3-3a.75.75 0 010-1.06l3-3a.75.75 0 011.06 0z" clipRule="evenodd" />
</svg>

                <p className="hidden desktop:flex">Logout</p>
</button>
    </div>


 

}