const Publication=require("../model/publication")
const {QueryTypes,Op, where,Sequelize}=require('sequelize')
const Author=require("../model/author")
const {Grant}=require("../model/publication")
const Issue=require("../model/issue")

module.exports.getPublications=async(req,res)=>{

            await Publication.findAndCountAll({
                offset:req.headers.offset?req.headers.offset:0,limit:req.headers.limit?req.headers.limit:null,include:[Author,Issue],order:[[req.headers.orderfield?req.headers.orderfield:'title',req.headers.ordertype?req.headers.ordertype:'ASC']],attributes:req.headers.attributes?req.headers.attributes.split(','):null,distinct:true}).then((result)=>{
                res.status(200).json({result,message:"Data loaded successfully"})
            }).catch((err)=>{
                console.log(err)
                res.status(404).json({error:err,message:"Unkown Error Occured"})}

            )

}
        


module.exports.getPublicationById=async(req,res)=>{
        


        await Publication.findOne({where:{id:req.params.id},include:[Author,Issue],distinct:true,attributes:req.headers.attributes?req.headers.attributes.split(','):null}).then((publication)=>{

            res.status(200).json({result:publication,message:"Data loaded successfully"})
        }).catch((err)=>res.status(404).json({error:err,message:"Publication with given id was not found"}))
        

}


module.exports.getAuthors=async(req,res)=>{

    try{
        const authors=await Author.findAndCountAll({attributes:['id','name','email']})
        res.status(200).json({result:authors})


    }
    catch(err){
        console.log(err)
        res.sendStatus(500)
    }


}




module.exports.getTypes=async(req,res)=>{

        try{
                const types=await Publication.findAndCountAll({attributes:['type'],group:['type']})
                res.status(200).json({result:types})
        }
        catch(err){
                res.sendStatus(404)
        }

}
module.exports.getYears =async(req, res)=>{
    try{
        const years=await Issue.findAndCountAll({attributes:['year'],distinct:true,group:['year'],distinct:true})
        res.status(200).json({result:years})
}
catch(err){
        res.sendStatus(404)
}
}

module.exports.getIssues =async(req, res)=>{
    try{
        const issues=await Issue.findAndCountAll({attributes:['issue'],distinct:true,group:['issue'],distinct:true})
        res.status(200).json({result:issues})
}
catch(err){
        res.sendStatus(404)
}
}


module.exports.getVolumes=async(req, res)=>{
    try{
        const volumes=await Issue.findAndCountAll({attributes:['volume'],group:['volume'],distinct:true})
        res.status(200).json({result:volumes})
}
catch(err){
        res.sendStatus(404)
}
}

module.exports.getPublicationGroup=async(req, res)=>{

    try{
    const publications=await Issue.findAndCountAll({order:[['volume','DESC'],['issue','DESC']],limit:req.headers?.limit?req.headers?.limit:null})
        return res.status(200).json({result:publications})
    }catch(err){
        console.error(err)
        res.sendStatus(500)
    }

}

module.exports.getPublicationsByQuery=async(req,res)=>{

    try{    
    const query={}
    const authorQuery={};
    const issueQuery={};


    Object.keys(req.query).map((field)=>{

        if(field=="year"||field=="issue"||field=="volume"){
            issueQuery[field] = req.query[field]
        }
        else if(field=="title"||field=="term"){
            query['title'] ={[Op.iLike]:`${req.query[field]}%`}
        }
        else if(field=="type"){
            const types=req.query[field].split(',')
            query[field] = {[Op.in]: types}
        }
        else if(field=="keywords"){ 
            const keywords=req.query[field].split(',')
            query[field] = {[Op.contains]: keywords}
        }

        else if(field=="author"){
            authorQuery['name']={[Op.iLike]:`${req.query[field]}%`}
        }

        else if(field=="designation"){
            const categories=req.query[field].split(',')
            authorQuery['designation']={[Op.in]:categories}
        }
    })


    console.log(query,authorQuery,issueQuery);

    
    if(Object.keys(issueQuery).length !== 0&&Object.keys(authorQuery).length !== 0){
        const results=await Publication.findAndCountAll({where:query,limit:req.headers.limit,offset:req.headers.offset,include:[{model:Issue,where:issueQuery},{model:Author,where:authorQuery}],distinct:true,attributes:req.headers.attributes?req.headers.attributes.split(','):null,order:[[req.headers.orderfield?req.headers.orderfield:'title',req.headers.ordertype?req.headers.ordertype:'ASC']]})
        res.status(200).json({result:results})

    }

    else if(Object.keys(issueQuery).length !== 0){
        const results=await Publication.findAndCountAll({where:query,limit:req.headers.limit,offset:req.headers.offset,include:[{model:Issue,where:issueQuery},{model:Author}],distinct:true,attributes:req.headers.attributes?req.headers.attributes.split(','):null,order:[[req.headers.orderfield?req.headers.orderfield:'title',req.headers.ordertype?req.headers.ordertype:'ASC']]})
        res.status(200).json({result:results})
    }
    else if(Object.keys(authorQuery).length !== 0){
        const results=await Publication.findAndCountAll({where:query,limit:req.headers.limit,offset:req.headers.offset,include:[{model:Author,where:authorQuery},{model:Issue}],distinct:true,attributes:req.headers.attributes?req.headers.attributes.split(','):null,order:[[req.headers.orderfield?req.headers.orderfield:'title',req.headers.ordertype?req.headers.ordertype:'ASC']]})
        res.status(200).json({result:results})
    }
    else {
        const results=await Publication.findAndCountAll({where:query,limit:req.headers.limit,offset:req.headers.offset,include:[{model:Issue},{model:Author}],distinct:true,attributes:req.headers.attributes?req.headers.attributes.split(','):null,order:[[req.headers.orderfield?req.headers.orderfield:'title',req.headers.ordertype?req.headers.ordertype:'ASC']]})
        res.status(200).json({result:results})
    }    




}catch(err){
    console.log(err)
    res.sendStatus(500)

}


   
 }
 





module.exports.createPublication=async(req,res)=>{

    try{

    const issue= await Issue.findOrCreate({where:{volume:req.body.volume,issue:req.body.issue},defaults:{isArchived:false,period:req.body.period,year:req.body.year}});
   
    const publication= await Publication.build({
        title:req.body.title,
        topic:req.body.topic,
        mode:req.body.mode,
        type:req.body.type,
        content:req.body.content,
        year:req.body.year,
        issueId:issue[0].id,
        keywords:req.body.keywords,
        footnotes:req.body.footnotes,
        references:req.body.references
    })

    await publication.save()

    const associations=[]

    req.body.authors.map((author)=>{
        associations.push({publicationId:publication?.id,authorId:author})

    })

    await Grant.bulkCreate(associations)
    

    res.status(200).json({result:publication})

}
catch(err){
    console.log(err)
    res.sendStatus(500)
}

}



module.exports.updatePublication=async(req,res)=>{
    
    try{
    const publication=await Publication.findOne({where:{id:req.params.id}})

    if(!publication) return res.sendStatus(404);

    const issue= await Issue.findOrCreate({where:{volume:req.body.volume,issue:req.body.issue},defaults:{isArchived:false,period:req.body.period,year:req.body.year}});
    
    if(req.body.period!==issue.period){
        issue.period = req.body.period;
    }

        publication.set({
            title:req.body.title,
            topic:req.body.topic,
            mode:req.body.mode,
            type:req.body.type,
            content:req.body.content,
            year:req.body.year,
            issueId:issue[0].id,
            keywords:req.body.keywords,
            references:req.body.references,
            footnotes:req.body.footnotes         
        })

    
    await Grant.destroy({where:{publicationId:publication.id}})

    const newAssociations=[]

    req.body.authors.map((author)=>{
        newAssociations.push({publicationId:publication?.id,authorId:author})
    })

    await Grant.bulkCreate(newAssociations)

    publication.save()
    res.status(200).json({result:publication})
}
catch(err){

console.log(err)
res.sendStatus(500)

}


}


module.exports.deletePublication=async(req,res)=>{

    
    const publication=await Publication.findOne({where:{id:req.params.id}}).then((publication)=>{
        return publication

    }).catch((err)=>{
        console.log(err);
        res.status(401).json({success:false,error:err,message:"Publication with given id not found"})

    })

    const issueId=publication?.issueId;

    publication.destroy().then(async()=>{

        const morePublications = await Publication.findAndCountAll({where:{issueId: issueId},limit:0});
        console.log(morePublications);
        if(morePublications?.count==0){
            const issue=await Issue.findOne({where:{id:publication?.issueId}});
            await issue.destroy();
        }
        res.status(200).json({success:true,messge:"Publication Deleted"})
    }).catch((err)=>{
        console.log(err);
        res.status(422).json({success:false,error:err,message:"Unable to delete the publication"})})
        
   

}


module.exports.groupDeletePublications=async(req,res)=>{
 
    try{
        await Publication.destroy({where:{id:req.headers.ids.split(',')}})
        res.status(200).json({success:true,message:'Publications deleted successfully'})
    }

    catch(err){

        res.status(401).json({success:false,message:'Failed to delete Publications'})
    }
}

module.exports.archiveIssue=async(req,res)=>{
    try{
        if(!req.params.id){
            res.sendStatus(400)
        }
        const issue=await Issue.findByPk(req.params.id);
        issue.isArchived=true;
        await issue.save();
        res.sendStatus(204)
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}

module.exports.unarchiveIssue=async(req,res)=>{
    try{
        if(!req.params.id){
            res.sendStatus(400)
        }
        const issue=await Issue.findByPk(req.params.id);
        issue.isArchived=false;
        await issue.save();
        res.sendStatus(204)
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }

}

module.exports.getRecentPublications=async(req,res)=>{
    try{
        const recentPublications=await Issue.findAndCountAll({where:{isArchived:false},limit:req.headers.limit?req.headers.limit:0,offset:req.headers.offset?req.headers.offset:0})
        res.status(200).json({result:recentPublications})
    }catch(err){
        console.error(err)
        res.status(500)
    }
}

module.exports.getArchivePublications=async(req,res)=>{
    try{
        const recentPublications=await Issue.findAndCountAll({where:{isArchived:true},limit:req.headers.limit?req.headers.limit:0,offset:req.headers.offset?req.headers.offset:0})
        res.status(200).json({result:recentPublications})
    }catch(err){
        console.error(err)
        res.status(500)
    }
}