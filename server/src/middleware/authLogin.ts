import User from "../models/User";
import jwt from "jsonwebtoken";
import {Request,Response,NextFunction} from "express"
const JWT_SECRECT="iamhero"
declare module "express" { 
    export interface Request {
        // optional type;
      userInfo?: any|undefined
    }
  }
const authLogin= async(req:Request,res:Response,next:NextFunction)=>{
    try{
        // console.log("i am in ");
        
        const authorization=<string>req.headers["authorization"];
        // this code was needed only when i was using classical code
        // if(!authorization){
        //     throw new Error("login first");
        // }
        const token=authorization.replace("Bearer ","");
        // console.log("no error ");
        // console.log(token);
        
        const userInfo=<any>await jwt.verify(token,JWT_SECRECT);
        console.log(userInfo);
        
        const user=await User.findById(userInfo.id);
        if(!user){
            throw new Error("login first");
        }
        
        req.userInfo={
            token:token,
            user:user
        }
        next();

    }
    catch(err){
        next(err);
    }

}
export default authLogin;
