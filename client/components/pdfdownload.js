import html2pdf from 'html2pdf.js';
import { useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


const DownloadPdfButton=()=>{



  const downloadPdf=()=>{
      const options = {
        destination: window.chrome ? 'Save as PDF' : 'pdf',
      };
      window.print(options);
  }
  
  
  
  return <>
  <button onClick={downloadPdf}>Download/Print PDF</button>
  </>

}

export default DownloadPdfButton;