import express,{Request,Response,NextFunction} from 'express';
const router=express.Router();
import User from "../models/User";
import jwt from "jsonwebtoken";
import { nextTick } from 'process';
// import md5 from "md5";
const JWT_SECRECT="iamhero";
const jwtToken=async (id:any)=>{
    return await jwt.sign({id},JWT_SECRECT,{
        expiresIn:"1h"
    });

}
router.post("/register", async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const {name,email,password}=req.body;
         const user= await User.create({
            name,
            password,
            email
        });
        const userRefined=user.toObject();
        delete userRefined.password;
        const token=await jwtToken(user._id);

        res.status(201).json({userRefined,token});
        
    }
    catch(err){
        next(err)
    }
    

});

router.post("/login", async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const {email,password}=req.body;
        const user=await User.findUserAndValidpassword(email,password); 
        const userRefined=user;
        delete userRefined.password;
        const token=await jwtToken(user._id);
        res.status(201).json({user,token});
        
    }
    catch(err){
        next(err)
    }
    

})

export default router;