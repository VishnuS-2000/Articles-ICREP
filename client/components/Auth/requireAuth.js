import { useRouter } from "next/router"
import {useAuth} from "../../hooks/useAuth"

export const AuthRequired=({children})=>{

    const router=useRouter()
    const {auth}=useAuth()
    if(typeof(window)!=="undefined"){

        if(auth?.accessToken){
            return <>
            {children}
            </>
        }

        else{
            router.replace('/admin/login')
        }
    }
  

}