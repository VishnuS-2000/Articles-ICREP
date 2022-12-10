const router=require('express').Router()

const {getArticles,getArticleById,getArticlesByQuery,createArticle,updateArticle,deleteArticle,getTopics,getAuthors}=require('../controllers/articleController')

const verifyJWT = require('../middleware/verify-jwt')



router.get('/',getArticles)

router.get('/topics',getTopics)
router.get('/authors',getAuthors)
router.get('/search',getArticlesByQuery)

router.get('/:id',getArticleById)

router.use(verifyJWT)

router.post('/',createArticle)
router.put('/:id',updateArticle)

router.delete('/:id',deleteArticle)

module.exports.ArticlesRouter=router


