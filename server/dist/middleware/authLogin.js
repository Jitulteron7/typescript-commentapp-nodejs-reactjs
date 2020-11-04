"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRECT = "iamhero";
const authLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log("i am in ");
        const authorization = req.headers["authorization"];
        // this code was needed only when i was using classical code
        // if(!authorization){
        //     throw new Error("login first");
        // }
        const token = authorization.replace("Bearer ", "");
        // console.log("no error ");
        // console.log(token);
        const userInfo = yield jsonwebtoken_1.default.verify(token, JWT_SECRECT);
        console.log(userInfo);
        const user = yield User_1.default.findById(userInfo.id);
        if (!user) {
            throw new Error("login first");
        }
        req.userInfo = {
            token: token,
            user: user
        };
        next();
    }
    catch (err) {
        next(err);
    }
});
exports.default = authLogin;
