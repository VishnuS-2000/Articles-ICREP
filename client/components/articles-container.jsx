export const ArticleContainer=({children})=>{
    return <div className="flex flex-[1] flex-col desktop:flex-[0.60] sticky left-[20%]   px-5 py-5">
               {children}
    </div>
}