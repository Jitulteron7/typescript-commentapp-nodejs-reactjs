import express,{Request,Response,NextFunction} from "express";
const router=express();
import authRouter from "./auth";
import authLogin from "../middleware/authLogin";
import commentsRouter from "./comment";
router.use("/api",authRouter);
router.use("/api",commentsRouter);

declare module "express" { 
    export interface Request {
        // optional type;
      userInfo?:any
    }
  }
router.get("/api",authLogin,(req:Request,res:Response)=>{
    // console.log(req.userInfo.user._id);
    res.send("login");

})
router.use((error:express.ErrorRequestHandler, req:Request, res:Response, next:NextFunction) => {
    console.error(error);
    res.status(500).json({error,yo:true});
  });

  export default router;