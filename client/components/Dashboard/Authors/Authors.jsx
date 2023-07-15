import { useState,useContext} from "react"

import {Layout} from "../Layout"
import {DataTable} from "../Table"
import CurrentProvider from "../CurrentProvider"
import { CreateAuthor } from "./CreateAuthor"
import {EditAuthor} from "./EditAuthor"
import { DataSearch } from "../DataSearch"


export const Authors=()=>{

const [active,setActive]=useState(0)
const [args,setArgs]=useState({url:'/author',dataResetUrl:'/author',options:{offset:0,limit:8,include:true}})

const authorFormat={ 
    name:'author',
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
    {name:'Author'},
    {name:'Email'},
    {name:'Designation'},
    {name:'Published'},
    {name:'Actions'}
]
,
fields:[
    {name:'name',limit:25,type:'icon'},
    {name:'email',limit:30,type:'text'},
    {name:'designation',type:'text'},
    {name:'publications',type:'count'},
    
    
]
,
search:{placeholder:'Author Name or Email'}

}

const toggler=(id)=>{
    setActive(id)
}

const subTabs=[<DataTable key={0} initials={authorFormat} args={args} changeArgs={setArgs}/>,<CreateAuthor key={1}  toggler={setActive}/>,<EditAuthor key={2}  toggler={toggler}  />,<DataTable key={3} args={args} setArgs={setArgs} initials={authorFormat}/>]
const headings=['Authors','Create Author','Edit Author','Search Results']


return <CurrentProvider> <Layout heading={`${headings[active]}`}>
    {active==0&&<button className="flex absolute top-[24%] left-[8%] text-sm justify-between space-x-1 py-2  drop-shadow px-6 rounded-md text-white bg-gradient-to-r from-primary to-indigo-800 items-center" onClick={()=>{toggler(1) }}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
<path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
</svg>


        <h1>Create</h1></button>}
        
        {active==0&&<DataSearch args={args} setArgs={setArgs} placeholder="Author" name="author" toggleToResult={()=>{toggler(3)}}/>}
    {subTabs[active]}

</Layout>
</CurrentProvider> 

}

