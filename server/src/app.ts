import "dotenv/config";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import {
	authenticateUser,
	errorHandlerMiddleware,
	notFoundMiddleware,
} from "./middlewares";
import connectDB from "./db";
import { authRouter, commentRouter, postRouter, userRouter } from "./routes";
import { Comment, Post, User } from "./models";

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
const CLIENT_URL = process.env.CLIENT_URL;

const app = express();

app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));
app.use(cors({ origin: CLIENT_URL, credentials: true }));

app.use("/auth", authRouter);
app.use("/user", authenticateUser, userRouter);
app.use("/post", authenticateUser, postRouter);
app.use("/comment", authenticateUser, commentRouter);

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

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
(async () => {
	try {
		await connectDB(MONGO_URI);
		app.listen(PORT, () =>
			console.log(`App is running at http://localhost:${PORT}`)
		);
	} catch (error) {
		console.log(error);
	}
})();
