import { useState,useContext} from "react"

import {Layout} from "../Layout"
import {DataTable} from "../Table"
import CurrentProvider from "../CurrentProvider"
import { CreateAuthor } from "./CreateAuthor"
import {EditAuthor} from "./EditAuthor"
import {v4 as uuidv4} from "uuid"
export const Authors=()=>{

const [active,setActive]=useState(0)
const [args,setArgs]=useState({url:'/author',options:{offset:0,limit:8,include:true}})

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
    {name:'articles',type:'count'},
    
    
]
,
search:{placeholder:'Author Name or Email'}

}

const toggler=(id)=>{
    setActive(id)
}

const subTabs=[<DataTable key={0} initials={authorFormat} args={args} changeArgs={setArgs}/>,<CreateAuthor key={1}  toggler={setActive}/>,<EditAuthor key={2}  toggler={toggler}  />]


return <CurrentProvider> <Layout heading={'Authors'}>
    {subTabs[active]}
</Layout>
</CurrentProvider> 

}

