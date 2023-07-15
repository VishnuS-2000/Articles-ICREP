import Link from "next/link"
import { useRouter } from "next/router"
export const ArticleHeader = ()=>{

    const router=useRouter()


    return <div className="flex  sticky z-30 desktop:z-50 p-3 justify-evenly left-[20%]   bg-white top-[60px]  space-x-5 font-[500] desktop:space-x-8 desktop:top-[90px] w-full  desktop:py-2 desktop:max-w-[60%]">
        

       <Link href={{pathname:'/'}}> 
        <button className={`${!router?.query?.category?'text-primary':'text-slate-300'}`}>All Articles</button>
        </Link>
        <Link href={{pathname:'/',query:{category:'faculty'}}}>
        <button className={`${router?.query?.category==="faculty"?'text-primary':'text-slate-300'}`}>Faculties</button>
        </Link>
        <Link href={{pathname:'/',query:{category:'student'}}}>
        <button className={`${router?.query?.category==="student"?'text-primary':'text-slate-300'}`}>Students</button>
        </Link>


    </div>

}