import { useState } from "react"
import {Layout} from "../Layout"
import {Table} from "../Table"
import CurrentProvider from "../CurrentProvider"
import { CreateArticle } from "./CreateArticle"
import { EditArticle } from "./EditArticle"

export const Articles =()=>{
    const [active,setActive]=useState(0)
    const [args,setArgs]=useState({url:'/article',options:{offset:0,limit:8,include:true}})
    
    const articleFormat={
        name:'article',
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
        },
        headers:[
            {name:'Title',width:25},
            {name:'Author',width:20},
            {name:'Topic',width:20},
            {name:'Actions',width:10},
        ],
        fields:[
            {name:'title',width:20},
            {name:'topic',width:20},
            {name:'author',width:20,type:'nested',subfields:['name']},
          
        ],
        search:{placeholder:'Title or Topic'}
    }

    const subTabs=[<Table initials={articleFormat} args={args} changeArgs={setArgs}/>,<CreateArticle/>,<EditArticle/>]

     return <CurrentProvider>
     <Layout heading={'Articles'}>
         {subTabs[active]}
     </Layout>
     </CurrentProvider>

}