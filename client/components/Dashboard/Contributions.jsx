import { Layout } from "./Layout"

export const Contributions=()=>{



    const initials={ 
        name:'editor',
        controls:{
            create:{
                toggle:()=>{setActive(1)}
            },
            edit:{
                toggle:()=>{setActive(2); }
            },
            view:{
                toggle:()=>{setActive(3)}
    
            },
        }  ,
        headers:[
        {name:'Contributor',width:0.3},
        {name:'Email',width:0.2},
        {name:'Mobile Number',width:0.3},
        {name:'Actions',width:0.2}
    ]

}

const data={}



    return <Layout heading="Contributions">
        
    <div className="my-8 ">
        <TableControl/>
      <TableHeader headers={initials?.headers}/>
    {data?.rows && !error?
      data?.rows.map((e)=>{
        return <TableRow element={e} name={initials?.name} fields={initials?.fields} addSelected={addSelected} removeSelected={removeSelected} selected={selected} toggler={initials.controls.edit.toggle}/>
      }):<div className="flex p-3 justify-center mt-3">
        <h1 className="italic">No contributions available</h1></div>
    }
    </div>
            

    </Layout>
}


export const TableControl=()=>{


    return <div className="flex w-full py-4  items-center justify-between ">
    
    <div className="flex space-x-5 items-center">
    <p className="text-lg ">All(100)</p>
 

    <button>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
  <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
</svg>
</button>

</div>


<div className="flex space-x-8">
    <button className="rounded-full bg-indigo-100 p-1 flex items-center justify-center">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
</svg>

    </button>

    <button className="rounded-full p-1 bg-indigo-100 flex items-center justify-center">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
</svg>

        </button>

</div>

</div>

}

export const TableHeader = ({headers}) => {
    
    return (
      <div className="hidden desktop:flex flex-[1] bg-indigo-50 border-tl border-slate-200 justify-between items-center rounded-md p-3 border border-gray-200">
        <input type="checkbox" className="h-[20px] w-[20px] " />
        {headers?.map((e)=>{
             
            return <div class={`flex-[${e.width}] flex justify-center text-base`}>
            <h1 className="font-[500]">{e.name}</h1>
          </div>
        })}
     
      </div>
    );
  };