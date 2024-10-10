import { selectPages } from "../services/pdf.lib"
import path from "path";
import fs from 'fs'
import crypto from "crypto";

export const uploadPDF = async (file: Express.Multer.File, selectedPages: number[]) => {
  
   const set= selectedPages.map((index)=>{
    return index-1
   })
   
    const modifiedPDF = await selectPages(file.buffer, set);

    const fileName = crypto.randomBytes(3).toString('hex') + '_' + file.originalname;

    const filePath = path.join(__dirname, '../assets', fileName);
    try {
        fs.writeFileSync(filePath, modifiedPDF);

    } catch (error) {
        console.log(error)
        throw new Error('INTERNAL_SERVER_ERROR')
    }
    return { fileName }
}




export const downloadPDF = async (fileName: string) => {

    const filePath = path.join(__dirname, '../assets', fileName);

    return new Promise((res, rej) => {
        fs.stat(filePath, (err) => {
            if (err) {
                return rej(new Error("NOT_FOUND"))
            }

            fs.readFile(filePath, (error, data) => {
                if (error) {
                    return rej(new Error("INTERNAL_SERVER_ERROR"))
                }
                res(data)
            })
        })
    })

}