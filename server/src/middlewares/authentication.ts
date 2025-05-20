import { NextFunction, Response } from "express";
import { verify } from "jsonwebtoken";
import { User } from "../models";
import { UnauthenticatedError } from "../errors";

export const authenticateUser = async (
	req: any,
	res: Response,
	next: NextFunction
) => {
	const token = req.headers.authorization?.split(" ")[1];
	const { _id } = verify(token, process.env.JWT_SECRET as string) as {
		_id: string;
	};
	const user = await User.findById(_id);
	if (!user) throw new UnauthenticatedError("Authentication failed!");
	req.user = user;
	next();
};
