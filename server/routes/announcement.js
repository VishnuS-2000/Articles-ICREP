const router=require('express').Router()
const {getAnnouncements,createAnnouncement,updateAnnouncement,deleteAnnouncement,getAnnouncementById,getActiveAnnouncements,getArchivedAnnouncements,archiveAnnouncement,unarchiveAnnouncement} = require('../controllers/announcementController')
const verifyJWT=require('../middleware/verify-jwt')
const {documentUpload}=require('../config/multer')

router.get('/',getAnnouncements)
router.get('/active',getActiveAnnouncements)
router.get('/archive',getArchivedAnnouncements)
router.get('/:id',getAnnouncementById)

router.use(verifyJWT)


router.post('/',createAnnouncement)
router.post('/document',documentUpload.single('file'),(req,res)=>{
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

router.put('/:id/archive',archiveAnnouncement)
router.put('/:id/active',unarchiveAnnouncement)
router.put('/:id',updateAnnouncement)

router.delete('/:id',deleteAnnouncement)

module.exports.AnnouncementRouter=router


