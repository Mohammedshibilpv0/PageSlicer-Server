import { PDFDocument } from "pdf-lib"

export const selectPages = async (file:Buffer,pagesForNewPDF:number[]):Promise<Uint8Array>=>{
    const pdfDoc = await PDFDocument.load(file);
    const newPDFDoc = await PDFDocument.create()
    const newPDFPages = await newPDFDoc.copyPages(pdfDoc,pagesForNewPDF)
    newPDFPages.forEach(page=>{
        newPDFDoc.addPage(page)
    })
  
    const pdfBytes = await newPDFDoc.save();
    return pdfBytes
}