const router=require('express').Router()

const {getEditors,updateEditors} = require('../controllers/accountController')
const verifyJWT=require('../middleware/verify-jwt')




router.use(verifyJWT)

router.get('/editors',getEditors)
router.put('/editors',updateEditors)




module.exports.AccountsRouter=router

