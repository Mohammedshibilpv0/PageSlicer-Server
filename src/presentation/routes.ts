import express from "express"
import multer from "multer";
import { onDownloadPDF, onUploadPDF } from "./Pdfcontrollers";

const storage = multer.memoryStorage();
const upload = multer({ storage })

const router = express.Router()

//uploads the pdf file to serve
router.route('/upload')
    .post(upload.single('pdf'),onUploadPDF);

 //retrieves the file from the server   
router.route('/download/:fileName')
    .get(onDownloadPDF)

export default router;