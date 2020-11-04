"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default();
const auth_1 = __importDefault(require("./auth"));
const authLogin_1 = __importDefault(require("../middleware/authLogin"));
const comment_1 = __importDefault(require("./comment"));
router.use("/api", auth_1.default);
router.use("/api", comment_1.default);
router.get("/api", authLogin_1.default, (req, res) => {
    // console.log(req.userInfo.user._id);
    res.send("login");
});
router.use((error, req, res, next) => {
    console.error(error);
    res.status(500).json({ error, yo: true });
});
exports.default = router;
