export const Layout=({heading,children})=>{

    return <div className="flex fixed flex-col h-[90%]  desktop:h-full overflow-y-auto  w-full  flex-[1] px-5 desktop:left-[15%]  tablet:px-5 desktop:px-8 py-5 tablet:py-8 desktop:py-12 desktop:w-[85%]">
        
        <h1 className="text-sm desktop:text-xl   font-[600]">{heading}</h1>
       
        {children}

    </div>
}