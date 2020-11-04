import mongoose from "mongoose";
const MONGO_URL="mongodb://localhost:27017/CommentApp";
const connecDB=()=>{
    mongoose.connect(MONGO_URL,{
        useCreateIndex:true,
        useFindAndModify:true,
        useNewUrlParser:true,
        useUnifiedTopology:true
    });
    mongoose.connection.on("connected",()=>{
        console.log("mongoose connected");
    });
    mongoose.connection.on("error",(err)=>{
        console.log("mongoose error :",err);
    });
    
    
}

export default connecDB;
