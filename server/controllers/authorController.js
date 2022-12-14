const Author=require("../model/author")
const Article=require('../model/article')

const {Op}=require('sequelize')

module.exports.getAuthors=async(req,res)=>{
        await Author.findAndCountAll({offset:req.headers.offset,limit:req.headers.limit,distinct:true,include:req.headers.include?[Article]:null,attributes:req.headers.attributes,order:[[req.headers.orderfield?req.headers.orderfield:'name',req.headers.ordertype?req.headers.ordertype:'ASC']]}).then((authors)=>{
            res.status(200).json({result:authors})
        }).catch((err)=>{
            console.log(err)
            res.sendStatus(500)
        })      
           
}

module.exports.getAuthorById=async(req,res)=>{
    await Author.findOne({where:{id:req.params.id},include:req.headers.include?[Article]:null,attributes:req.headers.attributes}).then((author)=>{
        res.status(200).json({result:author})

    }).catch((err)=>res.sendStatus(404))

    
}

module.exports.getAuthorByQuery=async(req,res)=>{

    console.log(req.query)
    await Author.findAndCountAll({where:{
       [Op.or]:[{name:{[Op.iLike]:`${req.query.term}%`} },{email:{[Op.iLike]:`${req.query.term}%`}}]
    },limit:req.query.limit,offset:req.query.offset,include:req.query.include?[Article]:null}).then((authors)=>{
        +
        console.log(authors)
        res.status(200).json({result:authors});
    
    }).catch((err)=>res.sendStatus(404))

}



module.exports.createAuthor=async(req,res)=>{

    // console.log("Requested :",req.body)
    const author=Author.build({
        id:req.body.id,
        name:req.body.name,
        email:req.body.email,
        designation:req.body.designation,
        bio:req.body.bio,
        photo:req.body.photo,
        specialization:req.body.specialization,  
        image:req.body.image

    })
    author.save().then((author)=>{
        res.status(201).json({result:author})

    }).catch((err)=>{
        console.log(err)
        res.sendStatus(422)})

}



module.exports.updateAuthor=async(req,res)=>{
    
    
    const author=await Author.findOne({where:{id:req.params.id}}).then((author)=>{
        
        author.set(req.body)
        return author

    }).catch((err)=>res.sendStatus(404) )

    await author.save().then((author)=>{

        res.status(200).json({result:author})
    }).catch((err)=>{
        console.log(err)
        res.sendStatus(422)
    })

}



module.exports.deleteAuthor=async(req,res)=>{

    try{
    console.log(req.params.id)
    if(!req.params.id) return res.status(400)

    const author=await Author.findOne({where:{id:req.params.id}})

    await author.destroy()

    res.sendStatus(200)

}

catch(err){
    res.sendStatus(500)

}

}

module.exports.groupDeleteAuthors=async(req,res)=>{

    try{
        await Author.destroy({where:{id:req.headers.ids.split(',')}})
        res.sendStatus(200)
    }

    catch(err){
        res.sendStatus(404)
    }
}



