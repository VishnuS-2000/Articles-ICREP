import { useState } from "react"
import { Layout } from "./Layout"
import { Tabs, TabList, TabPanels, Tab, TabPanel, FormLabel } from '@chakra-ui/react'
import { FormControl,InputGroup,Input } from "@chakra-ui/react"
import { useAuth } from "../../hooks/useAuth"

export const Settings=()=>{
    
    const {auth}=useAuth()
    console.log(auth)
    return <Layout heading={'Settings'}>
        
        <div className="py-5 tablet:py-8 ">
            <Tabs>
                    <TabList>
                            <Tab>General</Tab>
                            <Tab>Security</Tab>
                    </TabList>


            <TabPanels>
                    <TabPanel>
                        <General />
                    </TabPanel>

                    <TabPanel>
                        <Security username={auth?.username}/>
                    </TabPanel>

            </TabPanels>

    
            </Tabs>
        </div>
    
    </Layout>
}



const General=({role,lastLogin})=>{


    return <div className="flex flex-col">
        <form className="space-y-5  tablet:space-y-8">
     
            
            <FormControl>
                <FormLabel>Role</FormLabel>
                <Input value={role} variant="filled" disabled/>
            </FormControl>
            
            <div className="space-y-3">
            <h1 className="text-black">Last Login</h1>
            <p className="text-gray-400 italic">Time{lastLogin}</p>
            </div>

            </form>

        </div>

}

const Security=({username})=>{
    
    const [email,setEmail]=useState('')
    const [oldPassword,setOldPassword]=useState('')
    const [newPassword,setNewPassword]=useState('')
    const [ConfirmPassword,setConfirmPassword]=useState('')

    const handleEmailChange=(e)=>{
        e.preventDefault();
        
        if(!email){
            alert("Bad Request")
            return
        }

    }


    const handlePasswordChange=(e)=>{
        e.preventDefault()
        if(!oldPassword||!newPassword||!ConfirmPassword){
            alert("Bad Request");
            return
        }
        else if(oldPassword==newPassword){
            alert("New Password same as old password")
            return
        }

        else if(newPassword!==ConfirmPassword){
            alert("Confirm Password and Password do not match")    
            return
        }


    }

    return <div className="space-y-8">
        <form className="space-y-5" onSubmit={handleEmailChange}>
        <FormControl>
                <FormLabel>Email</FormLabel>
                <Input variant="filled" value={username} disabled/>
            </FormControl>
        <h1 className="text-lg font-[600]">Change Email</h1>
            <FormControl>
                <FormLabel>New Email</FormLabel>
                <Input variant="filled" type="email" onChange={(e)=>{setEmail(e.target.value)}}/>
            </FormControl>
            <button type="submit" className="flex text-base justify-evenly py-1  drop-shadow px-3 rounded-full text-white bg-gradient-to-r from-primary to-indigo-800 items-center" >
            Verify</button>
        </form>

            <form className="space-y-5" onSubmit={handlePasswordChange}>
                <h1 className="text-lg font-[600]">Change Password</h1>
            <FormControl>
                <FormLabel>Old Password</FormLabel>
                <Input type="password" variant="filled" onChange={(e)=>{setOldPassword(e.target.value)}}/>
            </FormControl>

            <FormControl>
                <FormLabel>New Password</FormLabel>
                <Input type="password" variant="filled" onChange={(e)=>{setNewPassword(e.target.value)}}/>
            </FormControl>

            <FormControl>
                <FormLabel>Confirm New Password</FormLabel>
                <Input type="password" variant="filled" onChange={(e)=>{setConfirmPassword(e.target.value)}}/>
            </FormControl>

            <button type="submit" className="flex text-base justify-evenly py-1  drop-shadow px-3 rounded-full text-white bg-gradient-to-r from-primary to-indigo-800 items-center" >
            Change
            </button>

            </form>
            </div>

}