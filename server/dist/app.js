"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./db/db"));
const dotenv_1 = __importDefault(require("dotenv"));
const index_1 = __importDefault(require("./routes/index"));
dotenv_1.default.config();
;
const app = express_1.default();
const PORT = 4000;
app.use(express_1.default.json());
app.get("/", (req, res) => {
});
app.use("/", index_1.default);
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
db_1.default();
app.listen(PORT, () => {
    console.log("connected to port " + PORT);
});
