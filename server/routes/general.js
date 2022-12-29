const GeneralRouter=require('express').Router()
const {documentUpload} = require('../config/multer')
const { getFolder,uploadFile,createContribution,getContributions,deleteContribution}=require('../controllers/generalController')
const verifyJWT = require('../middleware/verify-jwt')

GeneralRouter.get('/folder/:id',getFolder)

GeneralRouter.get('/contribution',getContributions)
GeneralRouter.post('/contribution/upload',documentUpload.single('file'),uploadFile)
GeneralRouter.post('/contribution',createContribution)

GeneralRouter.use(verifyJWT)

GeneralRouter.delete('/contribution/:id',deleteContribution)

module.exports = {
    GeneralRouter
}