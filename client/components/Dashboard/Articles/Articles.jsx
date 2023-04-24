import { useState } from "react"
import {Layout} from "../Layout"
import {DataTable} from "../Table"
import CurrentProvider from "../CurrentProvider"
import { CreateArticle } from "./CreateArticle"
import { EditArticle } from "./EditArticle"
import {v4 as uuidv4} from "uuid"
import Script from 'next/script'

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
            {name:'Title'},
            {name:'Type'},
            {name:'Issue'},
            {name:'Volume'},
            {name:'Author'},
            {name:'Actions'},
        ],
        fields:[
            {name:'title',limit:40},
            {name:'type'},
            {name:'volume'},
            {name:'issue'},
            {name:'authors',type:'nested',subfields:['name']},
        ],
        search:{placeholder:'Title or Topic'}
    }


    

    const subTabs=[<DataTable key={0}  initials={articleFormat} args={args} changeArgs={setArgs}/>,<CreateArticle key={1} />,<EditArticle key={2} />]
    const headings=['Articles','Create Article','Edit Article']
     return <>

     <CurrentProvider>
     <Layout heading={headings[active]}>
         {subTabs[active]}
     </Layout>
     </CurrentProvider>
        </>
}