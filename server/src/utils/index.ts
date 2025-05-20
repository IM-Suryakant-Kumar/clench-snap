import { Response } from "express";
import { IUser } from "../types";

const sendToken = (
	user: IUser,
	statusCode: number,
	res: Response,
	message: string
) => {
	const token = user.createJWTToken();
	res.status(statusCode).json({ success: true, message, token });
};

export default sendToken;
