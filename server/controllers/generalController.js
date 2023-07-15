const {uploadToGoogleDrive,downloadFromGoogleDrive,listFilesFromGoogleDrive,deleteFromGoogleDrive} = require('../utils/drive')
const {getRichTextFromDocumentId} = require('../utils/docs')
const {getSheetData}=require('../utils/sheets');
const Account=require('../model/account')
const Contribution=require('../model/contribution')
const fs=require('fs')

const {Op}=require('sequelize')


const getFolder=async(req,res)=>{

    try{
        const images=[]
        const data=await listFilesFromGoogleDrive(req.params.id)
        if(data){
            const exportData=[]
            data?.files.map((file)=>{
                    if(file.mimeType=='application/vnd.google-apps.document'){
                        exportData.push({id:file.id,requiredType:'text/plain'})
                    }   
                    else if(file.mimeType=='image/jpg'||file.mimeType=="image/jpeg"||file.mimeType=="image/png"){
                        images.push(file.id)
                    }
                    else if(file.mimeType=='application/vnd.google-apps.spreadsheet'){
                        exportData.push({id:file.id,requiredType:'text/csv'})
                    }

            })  


            if(exportData){

                const exportResults=await Promise.all(exportData.map(async(element)=>{

                    const result=await downloadFromGoogleDrive(element?.id, element?.requiredType)
                    return {type:element?.requiredType,result:result};
                    

                }))


                return res.status(200).json({result:{exports:exportResults,images:images}})


            }


        }
        res.sendStatus(404)
}

catch(e){
    console.log(e)
    res.sendStatus(500)

}

}

const listFile=async(req, res)=>{
    try{
        const data=await listFilesFromGoogleDrive(req.params.id)
        if(data){
            return res.status(200).json({result:data})
        }
        res.sendStatus(404)
    }
    catch(err){
        console.log(err)
        res.sendStatus(500)

    }
}


const getFile=async(req,res) =>{
    try{


        const exportResult=await downloadFromGoogleDrive(req.params.id,req.headers.format)

        return res.status(200).json({result:exportResult})
    }
    catch(err){
        console.log(err)
        res.sendStatus(500)

    }

}






const getDoc=async(req,res)=>{

    try{

    if(!req.params.id){
        return res.sendStatus(400)
    }       

    const result= await getRichTextFromDocumentId(req.params.id)
    return res.status(200).json({result})
}catch(err){
    console.log(err)
    return res.sendStatus(500)

}

    
}


const getSheet=async(req,res)=>{
        try{
            const result = await getSheetData({id:req.params.id,range:req.headers.range?req.headers.range:'Sheet1'})
            
            res.status(200).json({result:result})
        }catch(err){
        console.error(err)
        res.sendStatus(500)
        }
}



module.exports ={
    getFolder,
    getFile,listFile,getDoc,getSheet
}
