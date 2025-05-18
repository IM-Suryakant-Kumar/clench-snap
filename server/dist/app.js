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
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const middlewares_1 = require("./middlewares");
const db_1 = __importDefault(require("./db"));
const routes_1 = require("./routes");
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
const CLIENT_URL = process.env.CLIENT_URL;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use((0, cors_1.default)({ origin: CLIENT_URL, credentials: true }));
app.use("/auth", routes_1.authRouter);
app.use("/user", middlewares_1.authenticateUser, routes_1.userRouter);
app.use("/post", middlewares_1.authenticateUser, routes_1.postRouter);
app.use("/comment", middlewares_1.authenticateUser, routes_1.commentRouter);
// app.get("/", async (req: any, res: any) => {
// 	const posts = [
// 		{
// 			_id: "65681dc8f365e5498080ad37",
// 			author: "655fbcccb41b2cd8b0121153",
// 			content: "My first post🫠",
// 			image:
// 				"https://res.cloudinary.com/dyh9ryswk/image/upload/v1701322182/clench_snap/post/wug9wxabr0rwdxm7aku2.png",
// 			comments: [
// 				"682834deec403395cd025273",
// 				"682834deec403395cd025274",
// 				"682834deec403395cd025275",
// 			],
// 			liked: [
// 				"6570bddb539b70602e175e2e",
// 				"655fbcccb41b2cd8b0121153",
// 				"656eae2ad477bde45f522a6f",
// 				"656eae2ad477bde45f522a6f",
// 			],
// 			saved: ["655fbcccb41b2cd8b0121153"],
// 			createdAt: "2023-11-30T05:29:44.227Z",
// 			updatedAt: "2023-11-30T05:29:44.227Z",
// 			__v: 0,
// 		},
// 		{
// 			_id: "65681cdbf365e5498080ad0b",
// 			author: "655f7d1e3f112b13077f4027",
// 			content: "Hello World🤨",
// 			image:
// 				"https://res.cloudinary.com/dyh9ryswk/image/upload/v1701321945/clench_snap/post/trk4ebxiu51n9seenrvj.png",
// 			liked: ["655fbcccb41b2cd8b0121153", "656eae2ad477bde45f522a6f"],
// 			saved: ["655fbcccb41b2cd8b0121153"],
// 			comments: [
// 				"682834deec403395cd025270",
// 				"682834deec403395cd025271",
// 				"682834deec403395cd025272",
// 			],
// 			createdAt: "2023-11-30T05:25:47.148Z",
// 			updatedAt: "2023-11-30T05:25:47.148Z",
// 			__v: 0,
// 		},
// 		{
// 			_id: "657509128cd0f210963d5eee",
// 			author: "655f7d1e3f112b13077f4027",
// 			content: "jdf😆",
// 			image: "",
// 			liked: ["655f7d1e3f112b13077f4027", "65704e332d22c13b2556d0f4"],
// 			saved: ["65704e332d22c13b2556d0f4"],
// 			comments: [
// 				"682834deec403395cd025276",
// 				"682834deec403395cd025277",
// 				"682834deec403395cd025278",
// 				"682834deec403395cd025279",
// 			],
// 			createdAt: "2023-12-10T00:40:50.388Z",
// 			updatedAt: "2023-12-10T00:40:50.388Z",
// 			__v: 0,
// 		},
// 		{
// 			_id: "67cd0311c2465ea5c7d846e7",
// 			author: "655f7d1e3f112b13077f4027",
// 			content: "I don't really know what I'm doing atm",
// 			image: "",
// 			comments: [],
// 			createdAt: "2025-03-09T02:55:13.224Z",
// 			updatedAt: "2025-03-09T02:55:13.224Z",
// 			__v: 0,
// 		},
// 	];
// 	const postsData = await Post.create(posts);
// 	res.json({ postsData });
// });
app.use(middlewares_1.notFoundMiddleware);
app.use(middlewares_1.errorHandlerMiddleware);
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, db_1.default)(MONGO_URI);
        app.listen(PORT, () => console.log(`App is running at http://localhost:${PORT}`));
    }
    catch (error) {
        console.log(error);
    }
}))();
