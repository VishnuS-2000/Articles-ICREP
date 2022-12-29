const Account=require("../model/account")


const getEditors= async (req, res) => { 

    try{
        const editors=await Account.findAll({where:{role:'editor'},attributes:['name','username','photo','bio','permissions']})
        res.status(200).json({result:editors})
    }
    catch(err){

        console.log(err)
        res.sendStatus(500)

    }

}


const updateEditors=async(req,res)=>{


}




module.exports={
    getEditors,updateEditors

}