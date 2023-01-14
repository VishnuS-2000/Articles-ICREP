const GeneralRouter=require('express').Router()
const {documentUpload} = require('../config/multer')
const { getFolder,uploadFile,createContribution,getContributions,deleteContribution,getFile,listFile,uploadImage}=require('../controllers/generalController')
const verifyJWT = require('../middleware/verify-jwt')

GeneralRouter.get('/folder/files/:id',listFile)
GeneralRouter.get('/folder/:id',getFolder)
GeneralRouter.get('/file/:id',getFile)
GeneralRouter.get('/contribution',getContributions)
GeneralRouter.post('/contribution/file/upload',documentUpload.single('file'),uploadFile)
GeneralRouter.post('/contribution/image/upload',documentUpload.single('file'),uploadImage)
GeneralRouter.post('/contribution',createContribution)

GeneralRouter.use(verifyJWT)

GeneralRouter.delete('/contribution/:id',deleteContribution)

module.exports = {
    GeneralRouter
}