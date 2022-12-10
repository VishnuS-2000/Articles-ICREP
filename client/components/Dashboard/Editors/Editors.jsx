import { useState } from "react"
import { Layout } from "../Layout"
import {Table} from "../Table"
import { CreateEditor } from "./CreateEditor"
import { ModifyEditor } from "./ModifyEditor"


import CurrentProvider from "../CurrentProvider"

export const Editors=()=>{

   

    return <CurrentProvider>
    <Layout heading="Editors">
    
    </Layout>
    </CurrentProvider> 
}