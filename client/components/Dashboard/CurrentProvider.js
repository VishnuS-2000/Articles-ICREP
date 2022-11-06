import { createContext } from "react";
import { useState } from "react";
export const CurrentContext=createContext()


export default function CurrentProvider({children}){

    const [current,setCurrent]=useState()

    return <CurrentContext.Provider value={{current,setCurrent}}>
        {children}
    </CurrentContext.Provider>
}
