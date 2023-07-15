const { sheets } = require("../config/sheets")

const getSheetData=async({id,range})=>{

    try{
        const response=await sheets.spreadsheets.values.get({
            spreadsheetId:id,
            range:range
        })
   
        return response.data?.values
}catch(err){
    throw err;
}

}

module.exports={
    getSheetData
}