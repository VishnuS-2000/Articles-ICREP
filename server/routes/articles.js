const router=require('express').Router()

const {getArticles,getArticleById,getArticlesByQuery,createArticle,updateArticle,deleteArticle,getTypes,getAuthors,getIssues,getVolumes,getYears}=require('../controllers/articleController')

const verifyJWT = require('../middleware/verify-jwt')



router.get('/',getArticles)

router.get('/types',getTypes)
router.get('/years',getYears)
router.get('/issues',getIssues)
router.get('/volumes',getVolumes)

router.get('/authors',getAuthors)
router.get('/search',getArticlesByQuery)

router.get('/:id',getArticleById)

router.use(verifyJWT)

router.post('/',createArticle)
router.put('/:id',updateArticle)

router.delete('/:id',deleteArticle)

module.exports.ArticlesRouter=router


