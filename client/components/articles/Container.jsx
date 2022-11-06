export const ArticleContainer=({children})=>{
    return <div className="flex flex-[1] flex-col pb-12 desktop:flex-[0.60] desktop:items-start sticky left-[20%] relative p-3 desktop:px-8 desktop:py-5 space-y-1">
               {children}
    </div>
}