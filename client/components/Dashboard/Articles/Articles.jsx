import { useState } from "react"
import {Layout} from "../Layout"
import {Table} from "../Table"
import {CurrentProvider} from "../CurrentProvider"
import { CreateArticle } from "./CreateArticle"
import { EditArticle } from "./EditArticle"

export const Articles =()=>{

    const articleFormat={
        headers:[
            {name:'Title',width:0.2},
            {name:'Published',width:0.2},
            {name:'Author',width:0.2},
            {name:'Topic',width:0.2},
            {name:'Actions',width:0.2},
        ]
    }
    return <CurrentProvider>
    <Layout heading={'Articles'}>
        
            <Table data={articleFormat}/>
    </Layout>
    </CurrentProvider>

}