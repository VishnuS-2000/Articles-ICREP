const {uploadToGoogleDrive,downloadFromGoogleDrive,listFilesFromGoogleDrive,deleteFromGoogleDrive} = require('../utils/drive')
const Account=require('../model/account')
const Contribution=require('../model/contribution')
const fs=require('fs')

const {Op}=require('sequelize')




const getFolder=async(req,res)=>{

    try{
        const images=[]
        console.log(req.params)
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

                console.log(exportResults)

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




const uploadFile = async (req, res) => {
    try {
      if (!req.file) {
        return res.sendStatus(400);
      }

      const response = await uploadToGoogleDrive({
        name: req.file.originalname,
        parents: ["14A_PMj3X_17brGQVvCoAZlZqSwYx65Wx"]
      },req.file);
      

      fs.unlink(req.file.path,()=>{
      })

      console.log(response?.data.id)

      res.status(200).json({ id: response?.data.id });
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  };


const getContributions=async(req,res)=>{

    try{

        console.log(req.headers.offset,req.headers.limit)
        const contributions=await Contribution.findAndCountAll({offset:req.headers.offset,limit:req.headers.limit})
        res.status(200).json({result: contributions})

        

    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}


const createContribution=async(req,res)=>{

    try{

        console.log(req.body)
        if(!req.body.name||!req.body.bio||!req.body.email||!req.body.contact||!req.body.file){
            return res.sendStatus(400)
        }


        const existing=await Contribution.findOne({where:{[Op.or]:[{email:req.body.email},{contact:req.body.contact}]}})

        if(existing){
            await deleteFromGoogleDrive(req.body.file)
            return res.sendStatus(204)
        }



        const contribution= await Contribution.build({
            name: req.body.name,
            email: req.body.email,
            contact:req.body.contact,
            file: req.body.file,
            bio: req.body.bio,
            
        })


        await contribution.save()


        res.status(200).json({result:contribution})


    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }

}



const deleteContribution=async(req,res)=>{

    try{

        console.log(req.body)
        if(!req.params.id){
            return res.sendStatus(400)
        }


        const existing=await Contribution.findOne({where:{id:req.params.id}})



        if(!existing){
            return res.sendStatus(404)
        }



       await deleteFromGoogleDrive(existing.file)
       await existing.destroy()
       
        res.sendStatus(200)


    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }

}




module.exports ={
    getFolder,
    uploadFile,
    createContribution,
    getContributions,
    deleteContribution,
    getFile,listFile
}
