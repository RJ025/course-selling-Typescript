import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import adminRouter from "./routes/admin"

const app = express();
app.use(express.json());
app.use(cors());

app.get('/' , (req , res)=>{
    res.json({
        message : "hi there"
    })
})

app.use('/admin' , adminRouter)

mongoose.connect('mongodb+srv://ritikjain025:ritik@cluster0.qgylsum.mongodb.net/' , {
    dbName : 'courses'
})

app.listen(3000 , ()=>{
    console.log('http://localhost:3000')
})