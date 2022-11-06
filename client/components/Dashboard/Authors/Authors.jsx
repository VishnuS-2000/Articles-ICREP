import { useState,useContext} from "react"

import {Layout} from "../Layout"
import {Table} from "../Table"
import CurrentProvider from "../CurrentProvider"
import { CreateAuthor } from "./CreateAuthor"
import {EditAuthor} from "./EditAuthor"
export const Authors=()=>{

const [active,setActive]=useState(0)


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
    {name:'Author',width:0.1},
    {name:'Name',width:0.3},
    {name:'Articles',width:0.2},
    {name:'Topics',width:0.2},
    {name:'Actions',width:0.2}
]

}
 
const subTabs=[<Table data={authorFormat}/>,<EditAuthor  />]


return <CurrentProvider> <Layout heading={'Authors'}>
    {subTabs[active]}
</Layout>
</CurrentProvider> 

}