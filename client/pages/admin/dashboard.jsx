import { useState } from "react";

import { Home } from "../../components/Dashboard/Home";
import { Authors} from "../../components/Dashboard/Authors/Authors"
import { Articles} from "../../components/Dashboard/Articles"
import { Manuscript } from "../../components/Dashboard/Manuscript";
import {Customize} from "../../components/Dashboard/Customize"
import { Settings } from "../../components/Dashboard/Settings"

import {Sidebar} from "../../components/Dashboard/Sidebar"
import Footer from "../../components/footer";

export default function Dashboard(){



    const [active,setActive]=useState(0)

    const tabs=[<Home/>,<Authors/>,<Articles/>,<Manuscript/>,<Customize/>,<Settings/>]
    const toggler=(id)=>{
        setActive(id)
    }



    return <>
    <div className="flex flex-col min-h-screen w-full ">
            <div className="flex">
                  <Sidebar toggler={toggler} active={active}/>
                  {tabs[active]}
            </div>




    </div>
    </>

}