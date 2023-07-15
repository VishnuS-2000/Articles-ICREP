const router=require('express').Router()
const {getContributions,createContribution,uploadFile,uploadImage, getValidContributionReferences}=require('../controllers/contributionController');
const {documentUpload} = require('../config/multer')
const verifyJWT = require('../middleware/verify-jwt')


router.get('/references',getValidContributionReferences)
router.post('/',createContribution)
router.post('/file',documentUpload.single('file'),uploadFile)

router.use(verifyJWT)
router.get('/',getContributions)



module.exports.ContributionRouter=router