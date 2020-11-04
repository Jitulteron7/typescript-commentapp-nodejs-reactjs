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
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const Comments_1 = __importDefault(require("../models/Comments"));
const moment_1 = __importDefault(require("moment"));
const User_1 = __importDefault(require("../models/User"));
router.post("/comments", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const time = moment_1.default().format("LLL");
        let { rate, comment, dish, userID } = req.body;
        const userid = yield User_1.default.findById(userID);
        // console.log(typeof(userid._id));
        // console.log(dish);
        const Item = yield Comments_1.default.findOne({ id: dish });
        console.log(Item);
        const info = {
            msg: comment,
            by: userid._id,
            time,
            rate
        };
        if (!Item) {
            const user = yield Comments_1.default.create({
                comments: info,
                id: dish
            });
            return res.status(201).json(user);
        }
        Comments_1.default.findOneAndUpdate({ id: dish }, {
            $push: { comments: info }
        }, { new: true }).populate("comments.by", "name")
            // .sort("-createdAt")
            .exec(((err, data) => {
            if (err) {
                throw err;
            }
            else {
                console.log(data);
                res.status(200).json({ data });
            }
        }));
        // .populate("")
    }
    catch (err) {
        next(err);
    }
}));
router.post("/allcomment/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const {id}=req.params.id
        const allComments = yield Comments_1.default.findOne({ id: req.params.id })
            .populate("comments.by", "name");
        // .sort("-comments.by.time")
        res.status(200).json(allComments);
    }
    catch (err) {
        next(err);
    }
}));
exports.default = router;
