const Article=require("../model/article")
const {QueryTypes,Op, where}=require('sequelize')
const {sequelize}=require("../config/database")
const Author=require("../model/author")
const {Grant}=require("../model/article")


module.exports.getArticles=async(req,res)=>{

            await Article.findAndCountAll({
                offset:req.headers.offset?req.headers.offset:0,limit:req.headers.limit?req.headers.limit:null,include:[Author],order:[[req.headers.orderfield?req.headers.orderfield:'title',req.headers.ordertype?req.headers.ordertype:'ASC']],attributes:req.headers.attributes?req.headers.attributes.split(','):null,distinct:true}).then((result)=>{
                res.status(200).json({result,message:"Data loaded successfully"})
            }).catch((err)=>{
                console.log(err)
                res.status(404).json({error:err,message:"Unkown Error Occured"})}

            )

}
        


module.exports.getArticleById=async(req,res)=>{


        await Article.findOne({where:{id:req.params.id},include:[Author],distinct:true,attributes:req.headers.attributes?req.headers.attributes.split(','):null}).then((article)=>{

            res.status(200).json({result:article,message:"Data loaded successfully"})
        }).catch((err)=>res.status(404).json({error:err,message:"Article with given id was not found"}))
        

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
                const types=await Article.findAndCountAll({attributes:['type'],group:['type']})
                res.status(200).json({result:types})
        }
        catch(err){
                res.sendStatus(404)
        }

}
module.exports.getYears =async(req, res)=>{
    try{
        const years=await Article.findAndCountAll({attributes:['year'],group:['year']})
        res.status(200).json({result:years})
}
catch(err){
        res.sendStatus(404)
}
}

module.exports.getIssues =async(req, res)=>{
    try{
        const issues=await Article.findAndCountAll({attributes:['issue'],group:['issue']})
        res.status(200).json({result:issues})
}
catch(err){
        res.sendStatus(404)
}
}


module.exports.getVolumes=async(req, res)=>{
    try{
        const volumes=await Article.findAndCountAll({attributes:['volume'],group:['volume']})
        res.status(200).json({result:volumes})
}
catch(err){
        res.sendStatus(404)
}
}



module.exports.getArticlesByQuery=async(req,res)=>{

    try{    
    const query={}
    const authorQuery={
   
    }


    Object.keys(req.query).map((field)=>{

        if(field=="year"||field=="issue"||field=="volume"){
        query[field] = req.query[field]
        }
        else if(field=="title"){
            query[field] ={[Op.iLike]:`${req.query[field]}%`}
        }
        else if(field=="type"){
            const types=req.query[field].split(',')
            // console.log(types)
            query[field] = {[Op.in]: types}
        }
        else if(field=="keywords"){ 
            const keywords=req.query[field].split(',')
            // console.log(keywords)
            query[field] = {[Op.contains]: keywords}
        }

        else if(field=="author"){
            authorQuery['name']={[Op.iLike]:`${req.query[field]}%`}
        }

        else if(field=="designation"){
            const categories=req.query[field].split(',')
            // console.log(categories)
            authorQuery['designation']={[Op.in]:categories}
        }
    })
    
    // console.log(query,authorQuery)

    

    const results=await Article.findAndCountAll({where:query,limit:req.headers.limit,offset:req.headers.offset,include:{model:Author,where:authorQuery},distinct:true,attributes:req.headers.attributes?req.headers.attributes.split(','):null,order:[[req.headers.orderfield?req.headers.orderfield:'title',req.headers.ordertype?req.headers.ordertype:'ASC']]})


    res.status(200).json({result:results})

}catch(err){
    console.log(err)
    res.sendStatus(500)

}


   
 }
 



module.exports.createArticle=async(req,res)=>{
    

    try{
    const article= await Article.build({
        title:req.body.title,
        topic:req.body.topic,
        mode:req.body.mode,
        type:req.body.type,
        content:req.body.content,
        richText:req.body.richText,
        year:req.body.year,
        issue:req.body.issue,
        volume:req.body.volume,
        keywords:req.body.keywords,
        footnotes:req.body.footnotes,
        references:req.body.references
    })

    await article.save()

    const associations=[]

    req.body.authors.map((author)=>{
        associations.push({articleId:article?.id,authorId:author})

    })

    await Grant.bulkCreate(associations)
    

    res.status(200).json({result:article})

}
catch(err){
    console.log(err)
    res.sendStatus(500)
}

}



module.exports.updateArticle=async(req,res)=>{
    
    // console.log(req.body)
    try{
    const article=await Article.findOne({where:{id:req.params.id}})

    if(!article) return res.sendStatus(404);


        article.set({
            title:req.body.title,
            topic:req.body.topic,
            mode:req.body.mode,
            type:req.body.type,
            content:req.body.content,
            richText:req.body.richText,
            year:req.body.year,
            issue:req.body.issue,
            volume:req.body.volume,
            keywords:req.body.keywords,
            references:req.body.references
                     
        })

    
    await Grant.destroy({where:{articleId:article.id}})

    const newAssociations=[]

    req.body.authors.map((author)=>{
        newAssociations.push({articleId:article?.id,authorId:author})
    })

    await Grant.bulkCreate(newAssociations)

    article.save()
    res.status(200).json({result:article})
}
catch(err){

console.log(err)
res.sendStatus(500)

}


}


module.exports.deleteArticle=async(req,res)=>{

    const article=await Article.findOne({where:{id:req.params.id}}).then((article)=>{
        return article

    }).catch((err)=>{
        
        res.status(401).json({success:false,error:err,message:"Article with given id not found"})

    })

    article.destroy().then(()=>{
        res.status(200).json({success:true,messge:"Article Deleted"})
    }).catch((err)=>res.status(422).json({success:false,error:err,message:"Unable to delete the article"}))

   

}


module.exports.groupDeleteArticles=async(req,res)=>{
 
    try{
        await Article.destroy({where:{id:req.headers.ids.split(',')}})
        res.status(200).json({success:true,message:'Articles deleted successfully'})
    }

    catch(err){

        res.status(401).json({success:false,message:'Failed to delete articles'})
    }
}