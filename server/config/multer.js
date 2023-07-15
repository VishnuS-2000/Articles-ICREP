const multer=require('multer')
const imageStorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./public/images")
    },
    filename:(req,file,cb)=>{
        var fileType='' 
        if(file.mimetype=="image/png"){
            fileType='png'
         }
         else if(file.mimetype=="image/jpeg"){
            fileType='jpeg'
         }
         else if(file.mimetype=="image/jpg"){
            fileType='jpg'
         }
         cb(null,'image-'+Date.now()+'.'+fileType)

    }
})

const documentStorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./public/documents")
    },
    filename:(req,file,cb)=>{
        var fileType='' 
        if(file.mimetype=="application/msword"){
            fileType='doc'
         }
         else if(file.mimetype=="application/vnd.openxmlformats-officedocument.wordprocessingml.document"){
            fileType='docx'
         }
         else if(file.mimetype=="application/vnd.oasis.opendocument.text"){
            fileType='odt'
         }
         else if(file.mimetype=="application/pdf"){
            fileType='pdf'
         }
         cb(null,'document-'+Date.now()+'.'+fileType)

    }
})

module.exports.imageUpload=multer({storage:imageStorage})
module.exports.documentUpload=multer({storage:documentStorage})