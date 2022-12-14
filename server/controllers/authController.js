require("dotenv").config();

const Account = require("../model/account");
const Token=require("../model/token");
const { generatePassword, verifyPassword, issueJWT,generateOTP } = require("../utils/auth");
const jwt = require("jsonwebtoken");

const {sendMail}=require("../config/nodemailer")

const {Op}=require("sequelize")

const { google } = require("googleapis");


const register = async (req, res) => {
  try {

    // console.log(req.body)

    if (!req.body.email || !req.body.password || !req.body.role) {
      return res.status(400).json({ success: false, message: "Invalid response" });
    }
    const account = await Account.findOne({ where: { username: req.body.email } });

    if (account) {
      return res.sendStatus(409)
    } else {

     const token=jwt.sign({username:req.body.email,password:req.body.password,role:req.body.role},process.env.REGISTER_SECRET,{
        expiresIn:'2min'
     })

   

     const adminMail={
        from:`ICREP CUSAT <>${process.env.EMAIL}<>`,
        to:`ICREP CUSAT <>${process.env.EMAIL}<>`,
        subject:`Verify Register Account ${req.body.email}`,
        text:`Hi,A Register request for new account for ${req.body.role} has been received,please click the below link to approve ${process.env.CLIENT_URL}/admin/approve/register?verify=${token}
        
        Link valid for only 2 mins.
        `,
        html:`<div>
        Hi,A Register request for new account for ${req.body.role} has been received,please click the below link to approve ${process.env.CLIENT_URL}/admin/approve/register?verify=${token}
        Link valid for only 2 mins.
        </div>`
     }

    const result=sendMail(adminMail)

    if(result){
        return res.sendStatus(200)
    }
    else{
        throw new Error('Something went wrong')
    }

    }    

    }catch (err) {
        console.log(err)
    res.sendStatus(500)
  }
};


const verifyRegister=async(req,res)=>{
    try{

      // console.log(req.params)
        if(!req.params.token){
            res.sendStatus(401)
        }       
        
        jwt.verify(req.params.token,process.env.REGISTER_SECRET,async(err,decoded)=>{
            if (err) return res.sendStatus(403)

            const {username,password,role} =decoded
            console.log(decoded)

            const {salt,hash}=generatePassword(password)
            const account=await Account.build({
                salt,hash,username,role,settings:{}
            })

            await account.save()

            const userMail={
                from:`ICREP CUSAT <>${process.env.EMAIL}<>`,
                to:`${account?.username}`,
                subject:`Account Verified ICREP JIS`,
                text:`Hi,Your Account has been successfully verified.Please Login to continue.
                `,
                html:`<div>
                <p>
                Hi,Your Account has been successfully verified.Please Login to continue.
                </p>
                </div>`
             }
            
             sendMail(userMail)
            
            res.status(201).json({email:account?.username,role:account?.role})
        })

    }catch(err){
        res.sendStatus(500)
    }
}

const handleLogin = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.sendStatus(400);
    }

    const account = await Account.findOne({ where: { username: req.body.email } });

    // console.log(account)
    if (account) {
   
      const match = verifyPassword(
        req.body.password,
        account.hash,
        account.salt
      );

      if (match) {
        //successfull login issue JWT

        const { accessToken, refreshToken } = issueJWT(account.username);

        //update refreshtoken in db
        account.set({
          refreshToken,
        });
        await account.save();

        res.cookie("jwt", refreshToken, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
          sameSite: "none",
          secure: "true",
        });

        res.status(200).json({
          username: account.username,
          accessToken,
          refreshToken,
          role:account.role,
          displayName: account.displayName,
        });
      } else {
        // console.log("Invalid Username")
        return res.sendStatus(401);
      }
    } else {
      // console.log("Invalid password")
      return res.sendStatus(401);
    }
  } catch (err) {
    console.log(err)
    return res.sendStatus(500);
  }
};


const sendOTP=async(req,res)=>{

    // console.log(req.body.username)

    try{

      const foundAccount=await Account.findOne({where:{username:req.body.username}})

      if(!foundAccount){ return res.sendStatus(404)}     


      const otp=generateOTP()


      const token=jwt.sign({otp},process.env.RESET_PASSWORD_SECRET,{
        expiresIn:'5min'
      })

      const foundToken=await Token.findOne({where:{[Op.and]:[{username:req.body.username},{purpose:'reset-password'}]}})

      if(foundToken){
        foundToken.set({jwt:token,status:'pending'})
        await foundToken.save()
      }

      else{
          const newToken=await Token.build({username:foundAccount.username,purpose:'reset-password',jwt:token,status:'pending'})
          await newToken.save()
        }

      
     const passwordResetMail={
      from:`ICREP CUSAT <>${process.env.EMAIL}<>`,
      to:`${foundAccount.username}`,
      subject:`Password Reset ICREP JIS`,
      text:`Hi,a password reset request for your ICREP JIS account has been received,please use otp ${otp}
      OTP valid for only 5 mins.
      `,
      html:`<div>
      Hi,a password reset request for your ICREP JIS account has been received,please use otp ${otp}
      OTP valid for only 5 mins.
      </div>`
   }

   const result=sendMail(passwordResetMail)

   if(result){
    return res.sendStatus(200)
   }  
   else{
    throw new Error(`Something went wrong`)
   }

    }
    catch(err){
      console.log(err)
      res.sendStatus(500)

    }

    

}


const verifyOTP=async(req,res)=>{ 

  // console.log(req.body)
try{
if(!req.body.otp || !req.body.username){
  return res.sendStatus(400)
}

const foundToken=await Token.findOne({where:{[Op.and]:[{username:req.body.username},{purpose:'reset-password'}]}})

if(!foundToken?.jwt){
  console.log("No token")
  return res.sendStatus(401)
}

jwt.verify(foundToken.jwt,process.env.RESET_PASSWORD_SECRET,(err,decoded)=>{

  if(err) return res.sendStatus(403)

  // console.log(decoded)
  if(decoded.otp===Number(req.body.otp)){
    foundToken.set({status:"verified"})
    foundToken.save()
    return res.sendStatus(200)
  }

  else{
    return res.sendStatus(401)
  }


})



} 
catch(err){
  console.log(err)
  res.sendStatus(500)
}



}


const resetPassword = async (req,res) => {
  try {
    console.log(req.body)
    if (!req.body.password||!req.body.username) {
      return res.sendStatus(400);
    }

    const foundToken=await Token.findOne({where:{[Op.and]:[{username:req.body.username},{purpose:'reset-password'}]}})

    if(!foundToken||foundToken.status!=="verified") return res.sendStatus(401);

    const account = await Account.findOne({ username: req.body.username });

    if (!account) {
      return res.sendStatus(401);
    }

      const { hash, salt } = generatePassword(req.body.password);
      account.set({
        hash,
        salt,
      });
      await account.save();
      await foundToken.destroy()
      return res.sendStatus(200);
    
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};



const handleRefreshToken = async (req, res) => {
  try {
    const cookies = req.cookies;
    // console.log(cookies.jwt);

    if (!cookies?.jwt) return res.sendStatus(401);

    const refreshToken = cookies.jwt;

    const foundAccount = await Account.findOne({ where: { refreshToken } });

    console.log(foundAccount)
    if (!foundAccount) return res.sendStatus(403);

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        console.log(decoded.username)
        if (err || decoded.username !== foundAccount.username)
          return res.sendStatus(403)

        // console.log(foundAccount.username)

        const accessToken = jwt.sign(
          { username: foundAccount.username },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "2hr" }
        );

        res.json({
          accessToken,
          role:foundAccount.role,
          username: foundAccount.username,
          displayName: foundAccount.displayName,
        });
      }
    );
  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false, message: err.message });
  }
};


const handleLogout = async (req, res) => {
  // on Client delete access token

  const cookies = req.cookies;
  // console.log(cookies)

  if (!cookies?.jwt) return res.sendStatus(204); //No Content

  const refreshToken = cookies.jwt;

  //is refreshToken in DB
  const foundAccount = await Account.findOne({
    where: { refreshToken: refreshToken },
  });
  // console.log(foundAccount)
  if (!foundAccount) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
    return res.sendStatus(204);
  }

  foundAccount.set({
    refreshToken: null,
  });
  await foundAccount.save();
  res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true }); //set secure to true on production https
  res.sendStatus(200);
};

const changePassword = async () => {
  try {
    if (!req.body.password || !req.body.newPassword) {
      return res.sendStatus(400);
    }

    const account = await Account.findOne({ username: req.user });

    if (!account) {
      return res.sendStatus(401);
    }

    const match = verifyPassword(
      req.body.password,
      account.password,
      account.salt
    );

    if (match) {
      const { hash, salt } = generatePassword(req.body.newPassword);
      account.set({
        hash,
        salt,
      });
      await account.save();
      return res.sendStatus(200);
    } else {
      return res.sendStatus(401);
    }
  } catch (err) {
    // console.log(err.message);
    res.sendStatus(500);
  }
};



const getAccount = async (req, res) => {
  try {
    console.log(req?.headers.email);
    const account = await Account.findOne({
      where: { email: req?.headers.email },
    });

    if (!account) return res.sendStatus(404);

    const { id, name, email, settings, createdAt, updatedAt } = account;
    res
      .status(200)
      .json({ result: { id, name, email, settings, createdAt, updatedAt } });
  } catch (err) {
    // console.log(err);
    res.sendStatus(500);
  }
};

const sendVerifyEmailOTP= async (req, res) => {
  try {
    if (!req.body.email||req.body.newEmail) return res.sendStatus(400);

    const account = await Account.findOne(
      { where: { username: req?.params.email } },
      { fields: ["username"] }
    );

    if (!account) return res.sendStatus(404);

      
    const otp=generateOTP()

    const token=jwt.sign({otp},process.env.RESET_EMAIL_SECRET,{
      expiresIn:'5min'
    })

    const foundToken=await Token.findOne({where:{[Op.and]:[{username:req.body.username},{purpose:'reset-email'}]}})

    if(foundToken){
      foundToken.set({jwt:token,status:'pending'})
      await foundToken.save()
    }

    else{
        const newToken=await Token.build({username:foundAccount.username,newUsername:req.body.newEmail,purpose:'reset-email',jwt:token,status:'pending'})
        await newToken.save()
      }

    
   const emailResetMail={
    from:`ICREP CUSAT <>${process.env.EMAIL}<>`,
    to:`${foundAccount.username}`,
    subject:`Verify Email ICREP JIS`,
    text:`Hi,a email change request for your ICREP JIS account has been received,please use otp ${otp}
    OTP valid for only 5 mins.
    `,
    html:`<div>
    Hi,an email change request for your ICREP JIS account has been received,please use otp ${otp}
    OTP valid for only 5 mins.
    </div>`
 }

 const result=sendMail(emailResetMail)

 if(result){
  return res.sendStatus(200)
 }  
 else{
  throw new Error(`Something went wrong`)
 }

  }
  catch(err){
    console.log(err)
    res.sendStatus(500)

  }
  
};

const changeEmail=async(req,res)=>{

try{

if(!req.body.otp || !req.body.username){
  return res.sendStatus(400)
}

const foundToken=await Token.findOne({where:{[Op.and]:[{username:req.body.username},{purpose:'reset-email'}]}})

if(!foundToken?.jwt){
  console.log("No token")
  return res.sendStatus(401)
}

jwt.verify(foundToken.jwt,process.env.RESET_EMAIL_SECRET,async(err,decoded)=>{

  if(err) return res.sendStatus(403)


  // console.log(decoded)
  if(decoded.otp===Number(req.body.otp)){
    const account = await Account.findOne({ username: req.body.username });

    if (!account) {
      return res.sendStatus(401);
    }
      account.set({
        username:decoded.newUsername
      });
      await account.save();
      await foundToken.destroy()
      return res.sendStatus(200);
    
  }
  else{
    return res.sendStatus(401)
  }
  
})

}
catch(err) {
    console.log(err)
    res.sendStatus(500)

  }

}







module.exports.handleLogin = handleLogin;
module.exports.register = register;
module.exports.verifyRegister =verifyRegister;
module.exports.handleRefreshToken = handleRefreshToken;
module.exports.handleLogout = handleLogout;
module.exports.changePassword = changePassword;
module.exports.getAccount = getAccount;
module.exports.resetPassword=resetPassword;
module.exports.sendOTP= sendOTP;
module.exports.verifyOTP=verifyOTP
module.exports.sendVerifyEmailOTP=sendVerifyEmailOTP
module.exports.changeEmail=changeEmail

