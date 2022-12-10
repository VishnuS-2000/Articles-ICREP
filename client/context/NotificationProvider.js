import { createContext,useState } from "react";

export const NotificationContext=createContext()



export default function NotificationProvider({children}){

    const [notification,setNotification]=useState({
        title:null,
        message:null,
        status:null,
        createdAt:null
    })


    return <NotificationContext.Provider value={{notification,setNotification}}>
        {children}
    </NotificationContext.Provider>


}