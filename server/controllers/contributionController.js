const Announcement=require('../model/announcement')
const Contribution=require('../model/contribution')
const {uploadToGoogleDrive,deleteFromGoogleDrive}=require('../utils/drive')
const fs=require('fs')
const {Op}=require("sequelize")


const uploadFile = async (req, res) => {
    try {

      if (!req.file||!req.body.folderId) {
        return res.sendStatus(400);
      }

      const response = await uploadToGoogleDrive({
        name: `${req.body.name}.${req.file.originalname.split('.')[1]}`,
        parents: [req.body.folderId]
      },req.file);
      

      fs.unlink(req.file.path,()=>{
      })


      res.status(200).json({ id: response?.data.id });
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  };


const getContributions=async(req,res)=>{

    try{

        const contributions=await Contribution.findAndCountAll({offset:req.headers.offset,limit:req.headers.limit})
        res.status(200).json({result: contributions})

        

    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}


const createContribution=async(req,res)=>{

    try{
        if(!req.body.reference||!req.body.name||!req.body.email||!req.body.contact||!req.body.file||!req.body.bio){
            return res.sendStatus(400)
        }
        const existing=await Contribution.findOne({where:{announcementId:req.body.reference,[Op.or]:[{email:req.body.email},{contact:req.body.contact}]}})

        if(existing){
            if(req.body.file){
            await deleteFromGoogleDrive(existing.file)
            }
            if(req.body.image){
                await deleteFromGoogleDrive(existing.file)
            }

            existing.set({
                file:req.body.file,
                image:req.body.image
            })

            await existing.save()
            return res.sendStatus(204)


        }

        const contribution= await Contribution.build({
            name: req.body.name,
            email: req.body.email,
            contact:req.body.contact,
            file: req.body.file,
            bio:req.body.bio,
            announcementId: req.body.reference,
            
        })

        await contribution.save()
        res.status(200).json({result:contribution})

    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }

}



const getValidContributionReferences=async(req,res)=>{

    try{
        const results=await Announcement.findAndCountAll({
            where:{status:'active',acceptContributions:true},attributes:['id','folderId','title']
        })

        res.status(200).json({result:results})
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}


const deleteContribution=async(req,res)=>{

    try{

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

module.exports={uploadFile,getContributions, deleteContribution,createContribution,getValidContributionReferences}