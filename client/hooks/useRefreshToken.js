import axios from "../axios";
import { useAuth } from "./useAuth";

const useRefreshToken = ()=>{

    const {auth,setAuth}=useAuth()

    const refresh=async()=>{
        const response=await axios.get('/auth/refresh',{
            headers:{'Content-Type':'application/json'},
            withCredentials:true
        })

        setAuth(prev=>{
            
           return  {
            ...prev,
            accessToken:response?.data?.accessToken,
            role:response?.data?.role,
            username:response?.data?.username
        }
    
    })
        return response?.data?.accessToken
    }

    return refresh
}

export default useRefreshToken

