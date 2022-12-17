const Article=require("../model/article")
const {QueryTypes,Op}=require('sequelize')
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


        await Article.findOne({where:{id:req.params.id},include:[Author]}).then((article)=>{

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


module.exports.getTopics=async(req,res)=>{

        try{
                const topics=await Article.findAndCountAll({attributes:['topic'],group:['topic']})
                res.status(200).json({result:topics})
        }
        catch(err){
                res.sendStatus(404)
        }

}




module.exports.getArticlesByQuery=async(req,res)=>{

    const query = {
        [Op.or]:[
            {[Op.and]:[{},{}]},{
                
            }
        ]
    }

    const author={
        model:Author,
        where:{
            name:{
                [Op.iLike]:``
            }
        }        
    }


    const result=await Article.findAndCountAll({
        offset: req.query.offset,
        limit: req.query.limit,
        where:query,
        attributes:req.query.attributes?req.query.attributes:null
    })


}





module.exports.createArticle=async(req,res)=>{
    
    console.log(req.body.type)

    try{
    const article= await Article.build({
        title:req.body.title,
        topic:req.body.topic,
        type:req.body.type,
        content:req.body.content,
        richText:req.body.richText,
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
    
    console.log(req.body.authors)
    
    try{
    const article=await Article.findOne({where:{id:req.params.id}})

    if(!article) return res.sendStatus(404);


        article.set({
            title:req.body.title,
            topic:req.body.topic,
            type:req.body.type,
            content:req.body.content,
            richText:req.body.richText,
                     
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