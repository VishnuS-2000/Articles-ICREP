const {drive}=require('../config/drive')
const fs=require('fs');

const uploadToGoogleDrive=async(fileMetaData,file)=>{

    const media={
        mimeType:file.mimeType,
        body:fs.createReadStream(file.path)
    }

    const response = await drive.files.create({
        requestBody: fileMetaData,
        media: media,
        fields: "id",
      });

    
      return response

}

const listFilesFromGoogleDrive = async (googleFolderId) => {
  
    try {
      const response = await drive.files.list({
        q: `'${googleFolderId}' in parents`
      });

      // console.log(response?.data)
  
      return response.data;
    } catch (err) {
      throw err;
    }
  };


  const deleteFromGoogleDrive=async(fileId)=>{

    try {
      const response = await drive.files.delete({
        fileId:fileId
      });

      // console.log(response?.data)
  
      return response.data;
    } catch (err) {
      throw err;
    }
  };


  


const downloadFromGoogleDrive=async(googleFileId,mimeType)=>{


    try{

        const response=await drive.files.export({
            fileId:googleFileId,
            mimeType:mimeType,
        })

        // console.log(response.data)
        return response.data

    }   
    catch(err){
        throw err;
    }

}


module.exports = {uploadToGoogleDrive,listFilesFromGoogleDrive,downloadFromGoogleDrive,deleteFromGoogleDrive}

