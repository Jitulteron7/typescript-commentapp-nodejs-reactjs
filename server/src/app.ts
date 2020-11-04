import express,{Application,Request,Response,NextFunction} from "express";
import connectDB from "./db/db";
import dotEnv from "dotenv";
import Routes from "./routes/index";
dotEnv.config();;

const app:Application=express();
const PORT=4000;

app.use(express.json());

app.get("/",(req:Request,res:Response)=>{

});
app.use("/",Routes);
// app.get("/",(req:Request,res:Response)=>{

// });
// app.get("/",(req:Request,res:Response)=>{

// });
// app.get("/",(req:Request,res:Response)=>{

// });
// app.get("/",(req:Request,res:Response)=>{

// });
// app.get("/",(req:Request,res:Response)=>{

// });


// db connection
connectDB();

app.listen(PORT,()=>{
    console.log("connected to port "+PORT);
    
})