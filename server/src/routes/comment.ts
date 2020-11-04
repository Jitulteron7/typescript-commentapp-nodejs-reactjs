import express,{Request,Response,NextFunction} from 'express';
const router=express.Router();
import Comments from "../models/Comments";
import moment from "moment";
import User from "../models/User";
import authLogin from "../middleware/authLogin";
router.post("/comments",async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const time =moment().format("LLL");
        let {rate,comment,dish,userID}=req.body;
        const userid=await User.findById(userID);
        // console.log(typeof(userid._id));
        // console.log(dish);
        const Item=await Comments.findOne({id:dish});
        console.log(Item);
        const info={
            msg:comment,
            by:userid._id,
            time,
            rate
        }
         if(!Item){
         const user= await Comments.create({
                    comments:info,
                    id:dish
                });
                return res.status(201).json(user);
            }    
            
             Comments.findOneAndUpdate({id:dish},{
                $push:{comments:info}
            },{new:true}).populate("comments.by","name")
            // .sort("-createdAt")
            .exec(((err,data)=>{
                if(err){
                    throw err   
                }
                else{
                    console.log(data);
                    
                    res.status(200).json({data});
                }
            }))
            // .populate("")
         }
         
    catch(err){
        next(err)
    }
    

});

router.post("/allcomment/:id", async(req:Request,res:Response,next:NextFunction)=>{
    try{
        // const {id}=req.params.id
        const allComments=await Comments.findOne({id:req.params.id})
        .populate("comments.by","name")
        // .sort("-comments.by.time")

        res.status(200).json(allComments);    
    }
    catch(err){
        next(err)
    }
    

})

export default router;