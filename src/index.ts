import express from "express";
import cors from "cors";
import morgan from 'morgan'

import { PORT,CLIENT_URL } from "./constants/env";
import userRoutes from "./presentation/routes";

console.log(CLIENT_URL)
const app = express();

app.use(
    cors({
        origin: CLIENT_URL,
        credentials:true
    })
)
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'))

app.get('/pdfManagerServer',(req,res)=>res.send('You are all set'))

app.use('/pdfManagerServer/user',userRoutes)


app.listen(PORT,()=>{
    console.log(`server running on port: ${PORT}`)
})