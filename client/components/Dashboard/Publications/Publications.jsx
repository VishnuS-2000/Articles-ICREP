import { useState } from "react"
import {Layout} from "../Layout"
import {DataTable} from "../Table"
import { CreatePublication } from "./CreatePublication"
import { EditPublication } from "./EditPublication"
import CurrentProvider from "../CurrentProvider"
import { PublicationGrid } from "./PublicationsGrid"
import {DataSearch} from "../DataSearch"

export const Publications =()=>{
    const [active,setActive]=useState(0)
    const [args,setArgs]=useState({url:'/publication',dataResetUrl:'/publication',options:{offset:0,limit:8,include:true}})
    const [selection,setSelection]=useState({volume:null,issue:null})
    const [isSearchActive,setIsSearchActive]=useState(false)

    const publicationFormat={
        name:'publication',
        controls:{
            create:{
                toggle:()=>{setActive(2)}
            },
            edit:{
                toggle:()=>{setActive(3); }
            },
            view:{
                toggle:()=>{setActive(4)}
    
            },
        },
        headers:[
            {name:'Title'},
            {name:'Type'},
            {name:'Author'},
            {name:'Actions'},
        ],
        fields:[
            {name:'title',limit:40},
            {name:'type'},
            {name:'authors',type:'nestedWithIcon',subfields:['name']},
        ],
    }


    const searchPublicationFormat={
        name:'publication',
        controls:{
            create:{
                toggle:()=>{setActive(2)}
            },
            edit:{
                toggle:()=>{setActive(3); }
            },
            view:{
                toggle:()=>{setActive(4)}
    
            },
        },
        headers:[
            {name:'Title'},
            {name:'Type'},
            {name:'Volume'},
            {name:'Issue'},
            {name:'Author'},
            {name:'Actions'},
            
        ],
        fields:[
            {name:'title',limit:40},
            {name:'type'},
            {name:'issue',type:'nestedObject',subFields:['volume']},
            {name:'issue',type:'nestedObject',subFields:['issue']},
            {name:'authors',type:'nestedWithIcon',subFields:['name']},
            
        ],
        search:{placeholder:'Title'}
    }


    const toggler=(id)=>{
        setActive(id)
    }





    const subTabs=[<PublicationGrid key={0} setSelection={setSelection} args={args} setArgs={setArgs} toggler={toggler}/>,<DataTable key={1} initials={publicationFormat}  args={args} changeArgs={setArgs}/>,<CreatePublication key={2} />,<EditPublication key={3} />,<DataTable key={4} initials={searchPublicationFormat} args={args} setArgs={args}/>]
    const headings=['Publications',`Publications`,'Create Publication','Edit Publication','Search Results']
     return <><CurrentProvider>
     <Layout heading={`${headings[active]}`}>
     {selection?.volume&&selection?.volume&&active!==4&&<h1 className="text-gray-600 text-sm ">{`Volume ${selection?.volume}  Issue ${selection?.issue}`}</h1>}
        {active==0&&<DataSearch args={args} setArgs={setArgs} toggleToResult={()=>{toggler(4)}} placeholder={`Publication Title`} name="publication"/>}
         {subTabs[active]}
     </Layout>
     </CurrentProvider>
     
       
        </>
}



