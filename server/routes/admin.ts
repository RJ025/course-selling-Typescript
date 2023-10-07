import mongoose from "mongoose"
import jwt from  "jsonwebtoken"
import  express  from "express"
const router = express.Router();
import { Admin , Course } from "../db";
import { authenticateJWT , SECRET } from "../middleware/auth";

router.post('/signup' , async (req , res)=>{
    const {username , password} = req.body;
    const admin = await Admin.findOne({username});
    if(admin) {
        return res.status(201).json({
            message : "admin already registered"
        })
    }
    else {
        const cred = {username , password};
        const newAdmin = new Admin(cred);
        newAdmin.save();

        const token = jwt.sign({username , role : 'admin'} , SECRET , {expiresIn : '1h'});
        res.json({
            message : `${username} registered` ,
            token
        })
    }
})

router.post('/login' , async (req , res)=>{
    const {username , password} = req.body;
    const admin = await Admin.findOne({username});
    if(admin) {
        const token = jwt.sign({username  , role : 'admin'} , SECRET , {expiresIn : '1h'});
        return res.status(201).json({
            message : `${username} welcome` ,
            token
        })
    }
    else {
        res.status(401).json({
            message : 'unauth access'
        })
    }

})

router.post('/course' , authenticateJWT , (req , res)=>{
    
})

export default router