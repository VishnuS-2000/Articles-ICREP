export const Layout=({heading,children})=>{

    return <div className="flex fixed flex-col h-[90%]  desktop:h-full overflow-y-auto  w-full  flex-[1] px-5 desktop:left-[20%]  tablet:px-5 desktop:px-8 py-5 tablet:py-8 desktop:py-12 desktop:w-[80%]">
        
        <h1 className="text-xl tablet:text-2xl  font-[600]">{heading}</h1>
       
        {children}

    </div>
}