import "express-async-errors";
import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import {
	authenticateUser,
	errorHandlerMiddleware,
	notFoundMiddleware,
} from "./middlewares";
import connectDB from "./db";
import { authRouter, commentRouter, postRouter, userRouter } from "./routes";

const PORT = process.env.PORT;
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

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
(async () => {
	try {
		await connectDB();
		app.listen(PORT, () =>
			console.log(`App is running at http://localhost:${PORT}`)
		);
	} catch (error) {
		console.log(error);
	}
})();

export default app;
