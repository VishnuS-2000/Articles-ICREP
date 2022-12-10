import axios from "../axios";
import { useAuth } from "./useAuth";

const useRefreshToken = ()=>{

    const {auth,setAuth}=useAuth()

    const refresh=async()=>{
        console.log("Awaiting refresh token")
        const response=await axios.get('/auth/refresh',{
            headers:{'Content-Type':'application/json'},
            withCredentials:true
        })

        console.log(response)
        setAuth(prev=>{
            
           return  {
            ...prev,
            accessToken:response?.data?.accessToken
        }
    
    })
        console.log(response?.data?.accessToken)
        return response?.data?.accessToken
    }

    return refresh
}

export default useRefreshToken

