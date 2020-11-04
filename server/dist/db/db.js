"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const MONGO_URL = "mongodb://localhost:27017/CommentApp";
const connecDB = () => {
    mongoose_1.default.connect(MONGO_URL, {
        useCreateIndex: true,
        useFindAndModify: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    mongoose_1.default.connection.on("connected", () => {
        console.log("mongoose connected");
    });
    mongoose_1.default.connection.on("error", (err) => {
        console.log("mongoose error :", err);
    });
};
exports.default = connecDB;
