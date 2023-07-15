const router=require('express').Router()

const {getPublications,getPublicationById,getPublicationsByQuery,createPublication,updatePublication,deletePublication,getTypes,getAuthors,getIssues,getVolumes,getYears, getPublicationGroup,archiveIssue,unarchiveIssue,getRecentPublications,getArchivePublications}=require('../controllers/publicationController')

const verifyJWT = require('../middleware/verify-jwt')



router.get('/',getPublications)



router.get('/types',getTypes)
router.get('/years',getYears)
router.get('/issues',getIssues)
router.get('/volumes',getVolumes)
router.get('/recent',getRecentPublications)
router.get('/archive',getArchivePublications)
router.get('/group',getPublicationGroup)

router.get('/authors',getAuthors)
router.get('/search',getPublicationsByQuery)

router.get('/:id',getPublicationById)

router.use(verifyJWT)
router.post('/',createPublication)
router.post('/issue/:id/archive',archiveIssue)
router.post('/issue/:id/unarchive',unarchiveIssue)
router.put('/:id',updatePublication)

router.delete('/:id',deletePublication)

module.exports.PublicationRouter=router


