import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
export const SECRET = "ritik";

export const authenticateJWT = (req : Request , res : Response , next : NextFunction) => {
    const authHeaders = req.headers.authorization;
    if(authHeaders) {
        const token = authHeaders.split(' ')[1];
        jwt.verify(token , SECRET , (err , user)=>{
            // "string"
            if(err) {
                return res.sendStatus(401);
            }
            if(!user)return res.sendStatus(403)
            if(typeof user === "string")return res.sendStatus(403)
            req.headers["userId"] = user.id;
            next();
        })
    }
    else {
        return res.sendStatus(403);
    }
}

