import mongoose from "mongoose";
import md5 from "md5";
let User:any;
const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
},{timestamps:true});


export interface UserInfo extends mongoose.Document{
    name:String,
    email:String,
    password:String,
    _id:String
}
UserSchema.statics.findUserAndValidpassword=async(email:String,password:String)=>{

    const user=await User.findOne({email})
    if(!user){
        throw new Error("sign up first");
    }
    console.log(password);
    console.log(user.password);
    
    if(!(user.password==password)){
        throw new Error("invalid password");
    }
    return user;
}
// UserSchema.pre<UserInfo>("save",function(){
//     const user=this;
//     if(user.isModified("password")){
//         user.password=md5(user.password);
//     }
// });

User=mongoose.model<UserInfo>("User",UserSchema)
export default User;