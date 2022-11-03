const express=require('express')
const app=express()



app.get('/',(req,res)=>{
    res.status(200).json({message:'Welcome to the ICREP CUSAT Articles Server '})
})


app.listen(4000,()=>console.log('Server listening on port 4000'))





