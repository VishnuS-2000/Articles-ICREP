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

        return response.data

    }   
    catch(err){
        throw err;
    }

}

const createFolder=async({folderName,parentFolderId})=>{
  try {
    const response = await drive.files.list({
      q: `name='${folderName}' and '${parentFolderId}' in parents and mimeType='application/vnd.google-apps.folder'`,
      fields: 'files(id)',
      spaces: 'drive'
    });

    if (response.data.files.length > 0) {
      return response.data.files[0].id;
    }

    const folderMetadata = {
      name: folderName,
      mimeType: 'application/vnd.google-apps.folder',
      parents: [parentFolderId]
    };

    const createdFolder = await drive.files.create({
      resource: folderMetadata,
      fields: 'id'
    });

    return createdFolder.data.id;
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
}





module.exports = {uploadToGoogleDrive,listFilesFromGoogleDrive,downloadFromGoogleDrive,deleteFromGoogleDrive,createFolder}

