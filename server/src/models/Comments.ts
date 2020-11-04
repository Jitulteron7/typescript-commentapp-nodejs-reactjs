import mongoose, { Types } from "mongoose";
const CommentSchema=new mongoose.Schema({
    comments:[{
        msg:String,
        by:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        time:{
            type:String,    
        },
        rate:{
            type:Number,
            
        }
    }],
    id:{
        type:String,
        required:true,
    },
   
},{timestamps:true});
export interface insideComment{
    msg:String,
    by:Types.ObjectId   ,
    time:String,
    rate:Number
}
export interface reView extends mongoose.Document{
    id:String,
    comments:Array<insideComment>
}

const Commetns =mongoose.model("Comments",CommentSchema);
export default Commetns;