import {useEffect,useState} from "react"
import useRefreshToken from "../../hooks/useRefreshToken"



export const PersistLogin=({children})=>{


    const refresh=useRefreshToken()
    const [loading,setLoading]=useState(true)


    useEffect(()=>{

        const verifyRefreshToken = async()=>{

            try{
                await refresh()
            }
            catch(err){
                console.log(err)
            }finally{
        setLoading(false)
    
            }

        }
        
        verifyRefreshToken()


    },[])
    
    return<>
    {loading?<h1>Loading...</h1>:
       <>{children}</>
        
        }
    </>


}

