const router=require('express').Router()
const {getAuthors,getAuthorById,getAuthorByQuery,createAuthor,updateAuthor,deleteAuthor,groupDeleteAuthors}=require('../controllers/authorController')
const {imageUpload}=require('../config/multer')
const verifyJWT = require('../middleware/verify-jwt')



router.get('/',getAuthors)
router.get('/search',getAuthorByQuery)
router.get('/:id',getAuthorById)


router.use(verifyJWT)


router.post('/',createAuthor)
router.post("/image",imageUpload.single('file'),(req,res)=>{

    try{
    if(!req.file){
       return res.sendStatus(400)
    }
    res.status(200).json({result:req.file.filename})

    }catch(err){
        console.log(err)
        return res.sendStatus(500)
    }
})


router.put("/:id",updateAuthor)
router.delete('/:id',deleteAuthor)




module.exports.AuthorRouter=router