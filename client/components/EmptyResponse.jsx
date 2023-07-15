export const EmptyResponse=({message,icon})=>{




    return <div className="flex flex-col items-center h-full w-full desktop:p-20 tablet:p-16 p-5 text-center space-y-8">

<div className="flex flex-col items-center">
        <div className=" bg-gray bg-gradient-to-r from-slate-100 to-gray-200 rounded-full  flex items-center justify-center w-[100px] h-[100px] desktop:w-[150px] desktop:h-[150px]">
        <svg className="w-12 h-12 desktop:h-16 desktop:w-16 stroke-red-200 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>
        </div>
        <h1 className="text-base font-[500] py-4 text-slate-500">{message}</h1>

        </div>


    </div>


}