const Article=require("../model/article")
const {QueryTypes,Op}=require('sequelize')
const {sequelize}=require("../config/database")
const Author=require("../model/author")



module.exports.getArticles=async(req,res)=>{

        // console.log(req.headers.offset,req.headers.limit)
            await Article.findAndCountAll({offset:req.headers.offset?req.headers.offset:0,limit:req.headers.limit?req.headers.limit:null,include:[Author],order:[[req.headers.orderfield?req.headers.orderfield:'title',req.headers.ordertype?req.headers.ordertype:'ASC']]}).then((result)=>{
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


   if(req.query.term){
      await  Article.findAndCountAll({
        where:{
            [Op.or]:[{title:{
                [Op.iLike]:`${req.query.term}%`
            }},
                {topic:{
                    [Op.iLike]:`${req.query.term}%`}}               
            
        ],
          
        }   ,  include:[Author] 
   }).then((result)=>{
       res.status(200).json({success:true,result:result,message:'Query Processed'})

   }).catch((err)=>{
       res.status(401).json({success:false,error:err,message:'Query Failed'})
   })

}

else if(req.query.topic){

    await Article.findAndCountAll({

        where:{
            topic:{
                [Op.like]:req.query.topic?`%${req.query.topic}%`:'% %'
            }
          
            
        },include:[Author]

   }).then((result)=>{

    
       res.status(200).json({success:true,result:result,message:'Query Processed'})
   }).catch((err)=>{
            res.status(401).json({success:false,error:err,message:'Query Failed'})
   })


}

else{

await Article.findAndCountAll({
    where:{
        title:{
            [Op.iLike]:req.query.title?`%${req.query.title}%`:'% %'
        },
          content:{
              [Op.iLike]:req.query.keyword?`%${req.query.keyword}%`:'% %'}
       
        
    },include:[{
        model:Author,
        where:{
            name:{
                [Op.iLike]:req.query.author?`%${req.query.author}%`:'% %'
            }
        }
    }]

}).then((result)=>{


   res.status(200).json({success:true,result:result,message:'Query Processed'})
}).catch((err)=>{
        res.status(401).json({success:false,error:err,message:'Query Failed'})
})

}

}





module.exports.createArticle=async(req,res)=>{
    
    console.log(req.body)

    try{
    const article= await Article.build({
        title:req.body.title,
        topic:req.body.topic,
        content:req.body.content,
        richText:req.body.richText,
        authorId:req.body.authorId
    })

    await article.save()

    res.status(200).json({result:article})

}
catch(err){
    console.log(err)
    res.sendStatus(500)
}

}



module.exports.updateArticle=async(req,res)=>{
    const article=await Article.findOne({where:{id:req.params.id}}).then((article)=>{

        article.set(req.body)

        return article
       
    }).catch((err)=>{
        
        res.status(422).json({error:err,message:"Article with given id not found"})

    })

    article.save().then((article)=>{
        res.status(200).json({success:true,result:article,message:"Article Updated"})
    })

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