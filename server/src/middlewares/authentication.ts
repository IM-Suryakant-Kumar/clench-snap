import { NextFunction, Response } from "express";
import { UnauthenticatedError } from "../errors";
import { verify } from "jsonwebtoken";
import { User } from "../models";

export const authenticateUser = async (
	req: any,
	res: Response,
	next: NextFunction
) => {
	const token = req.headers.authorization?.split(" ")[1];
	if (!token) throw new UnauthenticatedError("Authentication failed!");

	const { userId } = verify(token, process.env.JWT_SECRET as string) as any;
	if (!userId) throw new UnauthenticatedError("Authentication failed!");

	const user = await User.findById(userId);
	if (!user) throw new UnauthenticatedError("Authentication failed!");

  req.user = user;
	next();
};
