import { useState } from "react";

import { Home } from "../../components/Dashboard/Home";
import { Authors} from "../../components/Dashboard/Authors/Authors"
import { Articles } from "../../components/Dashboard/Articles/Articles";

import {Contributions} from "../../components/Dashboard/Contributions"
import { Settings } from "../../components/Dashboard/Settings"

import {Sidebar} from "../../components/Dashboard/Sidebar"
import { AuthRequired } from "../../components/Auth/requireAuth";
import { PersistLogin } from "../../components/Auth/persistLogin";

import { Notification } from "../../components/Notification";
import useNotification from "../../hooks/useNotification";
import  Head from "next/head"

export default function Dashboard(){



    const [active,setActive]=useState(0)
    const {notification}=useNotification()

    const tabs=[<Home/>,<Authors/>,<Articles/>,<Contributions/>,<Settings/>]
    const toggler=(id)=>{
        setActive(id)
    }



    return <>
    <Head>
        <title>Dashboard</title>
    </Head>
    
    <PersistLogin>
    <AuthRequired>
    {notification?.createdAt&&<Notification options={notification}/>}
    <div className="flex flex-col min-h-screen w-full ">
            <div className="flex">
                  <Sidebar toggler={toggler} active={active}/>
                  {tabs[active]}
            </div>




    </div>
    </AuthRequired>
    </PersistLogin>
    </>
}