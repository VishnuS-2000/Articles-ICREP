const { Router } = require("express");
const express = require("express");
const router = express.Router();

const {
  handleLogin,
  register,
  verifyRegister,
  handleRefreshToken,
  handleLogout,
  resetPassword,
  updateAccount,
  getAccount,
  changePassword,
  verifyOTP,
  sendOTP,
  sendVerifyEmailOTP,
  changeEmail,
} = require("../controllers/authController");
const {imageUpload}=require('../config/multer')

const verifyJWT = require("../middleware/verify-jwt");

router.post("/register", register);
router.post("/verify/register/:token",verifyRegister);


router.post("/login", handleLogin);

router.post('/sendotp',sendOTP);
router.post('/verifyotp',verifyOTP)
router.post('/resetPassword',resetPassword);

router.get("/refresh", handleRefreshToken);
router.get("/account", getAccount);

router.get("/logout", handleLogout);




router.use(verifyJWT);
router.get('/account',getAccount)
router.post('/verifyEmail',sendVerifyEmailOTP)
router.post('/changeEmail',changeEmail)
router.post("/change", changePassword);

router.put('/account',updateAccount)
router.post('/account/changePassword',changePassword)

router.post("/image",imageUpload.single('file'),(req,res)=>{
  console.log(req.file)
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


module.exports.AuthRouter = router;

module.exports.AuthRouter=router;
