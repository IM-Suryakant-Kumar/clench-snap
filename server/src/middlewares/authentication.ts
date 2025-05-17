import { NextFunction, Response } from "express";
import { verify } from "jsonwebtoken";
import { asyncWrapper } from "./async-wrapper";

export const authenticateUser = asyncWrapper(
	async (req: any, res: Response, next: NextFunction) => {
		const token = req.headers.authorization?.split(" ")[1];
		req.user = verify(token, process.env.JWT_SECRET as string);
		next();
	}
);
