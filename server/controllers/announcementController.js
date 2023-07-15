const Contribution = require('../model/contribution')
const Announcement=require('../model/announcement')
const {createFolder}=require('../utils/drive')
const fs=require('fs')

module.exports.getAnnouncements=async (req,res)=>{
    try{
        await Announcement.findAndCountAll({
            offset:req.headers.offset?req.headers.offset:0,limit:req.headers.limit?req.headers.limit:null,include:[Contribution],order:[[req.headers.orderfield?req.headers.orderfield:'title',req.headers.ordertype?req.headers.ordertype:'ASC']],attributes:req.headers.attributes?req.headers.attributes.split(','):null,distinct:true}).then((result)=>{
            res.status(200).json({result})
        }).catch((err)=>{
            console.log(err)
            res.status(404).json({error:err})}
        )
    }catch(err){
        console.error(err)
        res.sendStatus(500)
    }
}

module.exports.getAnnouncementById=async(req,res)=>{
    try{
        if(!req.params.id) return res.sendStatus(400)
        await Announcement.findOne({where:{id:req.params.id},attributes:req.headers.attributes?req.headers?.attributes.split(','):null,include:req.headers.include?[Contribution]:null}).then((result)=>{
            res.status(200).json({result})
        }).catch((err)=>{
            console.log(err)
            res.status(404).json({error:err})}
        )
    }catch(err){
        console.error(err)
        res.sendStatus(500)
    }
}

module.exports.getActiveAnnouncements=async (req,res)=>{
    try{
        await Announcement.findAndCountAll({
            where:{status:'active'},
            offset:req.headers.offset?req.headers.offset:0,limit:req.headers.limit?req.headers.limit:null,include:[Contribution],order:[[req.headers.orderfield?req.headers.orderfield:'title',req.headers.ordertype?req.headers.ordertype:'ASC']],attributes:req.headers.attributes?req.headers.attributes.split(','):null,distinct:true}).then((result)=>{
            res.status(200).json({result})
        }).catch((err)=>{
            console.log(err)
            res.status(404).json({error:err})}
        )
    }catch(err){
        console.error(err)
        res.sendStatus(500)
    }
}



module.exports.getArchivedAnnouncements=async (req,res)=>{
    try{
        await Announcement.findAndCountAll({
            where:{status:'archived'},
            offset:req.headers.offset?req.headers.offset:0,limit:req.headers.limit?req.headers.limit:null,include:[Contribution],order:[[req.headers.orderfield?req.headers.orderfield:'title',req.headers.ordertype?req.headers.ordertype:'ASC']],attributes:req.headers.attributes?req.headers.attributes.split(','):null,distinct:true}).then((result)=>{
            res.status(200).json({result})
        }).catch((err)=>{
            console.log(err)
            res.status(404).json({error:err})}
        )
    }catch(err){
        console.error(err)
        res.sendStatus(500)
    }
}



module.exports.createAnnouncement = async(req,res)=>{

    try{
    if(!req.body.title||!req.body.dated||!req.body.acceptContributions){
        return res.sendStatus(400)

    }   
        const folderId=await createFolder({parentFolderId:process.env.CONTRIBUTION_FOLDER_ID,folderName:req.body.title.slice(0,25)})
        const announcement = await Announcement.build({
            title: req.body.title,
            dated: req.body.dated,
            acceptContributions: req.body.acceptContributions,
            description: req.body.description,
            file:req.body.file,
            folderId:folderId,

        })  

        await announcement.save()
        
        res.status(200).json({result:announcement})

    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}

module.exports.archiveAnnouncement=async(req,res)=>{
    try{
        const announcement=await Announcement.findOne({where:{id:req.params.id}})
    
        if(!announcement) return res.sendStatus(404);

    
            announcement.set({
               status:'archived'
            })
            await announcement.save();


            res.sendStatus(204)
    }catch(err){
        console.log(err)
        return res.sendStatus(500)
    }
}
module.exports.unarchiveAnnouncement=async(req,res)=>{
    try{
        const announcement=await Announcement.findOne({where:{id:req.params.id}})
    
        if(!announcement) return res.sendStatus(404);

    
            announcement.set({
               status:'active'
            })
            await announcement.save();


            res.sendStatus(204)
    }catch(err){
        console.log(err)
        return res.sendStatus(500)
    }
}


module.exports.updateAnnouncement = async(req,res)=>{

    try{
        const announcement=await Announcement.findOne({where:{id:req.params.id}})
    
        if(!announcement) return res.sendStatus(404);


        if(req.body.file!==announcement.file){
            fs.unlink(`../public/documents/${announcement.file}`,(err)=>{
                if(err){
                console.error(err)
              
                }

            })
        }
    
    
            announcement.set({
                title:req.body.title,
                dated:req.body.dated,
                acceptContributions: req.body.acceptContributions,
                description: req.body.description,
                file:req.body.file

            })
            await announcement.save();


            res.status(200).json({result:announcement})
    }catch(err){
        console.log(err)
        return res.sendStatus(500)
    }
}

module.exports.deleteAnnouncement = async(req, res)=>{
    try{    
        
        const announcement=await Announcement.findOne({id:req.params.id})
        if(!announcement){
            return res.sendStatus(404)

        }

        await announcement.destroy()
        res.status(200).json({result:announcement})

    }catch(err){
        console.log(err)
    }
}