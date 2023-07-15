import { useState } from "react"
import {Layout} from "../Layout"
import {DataTable} from "../Table"
import CurrentProvider from "../CurrentProvider"
import { CreateAnnouncement } from "./CreateAnnouncement"
import { EditAnnouncement } from "./EditAnnouncement"
import { AnnouncementGrid } from "./AnnouncementsGrid"
import { ContributionsGrid } from "./ContributionsGrid"

export const Announcements =()=>{
    const [active,setActive]=useState(0)
    const [selection,setSelection]=useState(null)
    

    const toggler=(id)=>{
        setActive(id)
    }

    

    const subTabs=[<AnnouncementGrid key={0} setSelection={setSelection} toggler={toggler}/>,<CreateAnnouncement key={1} />,<EditAnnouncement key={2} />,<ContributionsGrid key={3} id={selection} />]
    const headings=['Announcments','Create Announcement','Edit Announcment','Contributions']
     return <>

     <CurrentProvider>
     <Layout heading={headings[active]}>
         {subTabs[active]}
     </Layout>
     </CurrentProvider>
        </>
}