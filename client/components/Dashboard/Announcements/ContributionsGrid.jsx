import useSWR from "swr"
import axios from "../../../axios"
import moment from "moment"
import BackupIcon from '@mui/icons-material/Backup';
export const ContributionsGrid=({id})=>{
  const fetcher=async(args)=>{
    const response=await axios.get(args.url,{
      headers:args.options
    })


return response?.data?.result
  }
  
  const {data,error}=useSWR({url:`/announcement/${id}`,options:{include:true}},fetcher)

  
  return <>


  <div className="flex w-full items-center">
  <h1 className="text-sm font-[500] text-secondary">{data?.title}</h1>
  

  <a target="_blank" rel="noreferrer" href={`https://drive.google.com/drive/folders/${data?.folderId}?usp=sharing`}>
  <button className="absolute font-[400] items-center p-2 space-x-3 rounded-md bg-blue-100 text-base hover:bg-blue-200 right-[80px] top-[60px] font-[600] ">

  <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M339 314.9L175.4 32h161.2l163.6 282.9H339zm-137.5 23.6L120.9 480h310.5L512 338.5H201.5zM154.1 67.4L0 338.5 80.6 480 237 208.8 154.1 67.4z"/></svg>    
  </button>

  </a>
    </div>

  <div className="grid grid-cols-3 w-full gap-3 py-8">
      {data?.contributions.map((element,index)=>{
        return <a role="button"  key={index} rel="noreferrer"  target="_blank" href={`https://drive.google.com/uc?export=download&id=${element?.file}`}  className="flex text-sm flex-col p-5 bg-slate-100 hover:bg-slate-200 duration-800 drop-shadow rounded-md">
          
          <h1 className="font-[500] my-2">#{element?.id}</h1>
          <div className="flex justify-between">
            
            <h1 className=" font-[600] text-primary">{element?.name}</h1>
            <div className="text-right text-secondary">
            <p className="text-right">{element?.email}</p>
            <p className="text-right">{element?.contact}</p>
            

            </div>


            </div>
          <p className="my-2">{element?.bio}</p>
        
        <div className="flex justify-between">
        <p className="text-xs">Created {moment(element?.createdAt).format('DD-MM-YYYY HH:mm:ss')}   </p>
        <p className="text-xs">Updated {moment(element?.updatedAt).format('DD-MM-YYYY HH:mm:ss')}</p>
        
        </div>
        
        </a>
      })}
  </div>

  </>
}