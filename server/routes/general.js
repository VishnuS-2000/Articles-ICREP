const GeneralRouter=require('express').Router()
const { getFolder,getFile,listFile,getDoc, getSheet}=require('../controllers/generalController')



GeneralRouter.get('/folder/files/:id',listFile)
GeneralRouter.get('/folder/:id',getFolder)
GeneralRouter.get('/file/:id',getFile)
GeneralRouter.get('/doc/:id',getDoc)
GeneralRouter.get('/sheet/:id',getSheet)



module.exports = {
    GeneralRouter
}