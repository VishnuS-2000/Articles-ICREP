const {docs}=require("../config/docs")

const getRichTextFromDocumentId=async(documentId)=>{
    const { data } = await docs.documents.get({ documentId });

    // Extract the document content as rich text
    const content = data.body.content;
    const richTextContent = content.map(element => element.paragraph ? element.paragraph.elements.map(e => e.textRun.content).join('') : '').join('');

    return richTextContent;
}



module.exports = {
    getRichTextFromDocumentId
}