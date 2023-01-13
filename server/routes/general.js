const GeneralRouter=require('express').Router()
const {documentUpload} = require('../config/multer')
const { getFolder,uploadFile,createContribution,getContributions,deleteContribution,getFile,listFile}=require('../controllers/generalController')
const verifyJWT = require('../middleware/verify-jwt')

GeneralRouter.get('/folder/files/:id',listFile)
GeneralRouter.get('/folder/:id',getFolder)
GeneralRouter.get('/file/:id',getFile)
GeneralRouter.get('/contribution',getContributions)
GeneralRouter.post('/contribution/upload',documentUpload.single('file'),uploadFile)
GeneralRouter.post('/contribution',createContribution)

GeneralRouter.use(verifyJWT)

GeneralRouter.delete('/contribution/:id',deleteContribution)

module.exports = {
    GeneralRouter
}