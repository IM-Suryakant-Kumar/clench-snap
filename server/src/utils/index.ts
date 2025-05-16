import { Response } from "express";

const sendToken = (
	user: any,
	statusCode: number,
	res: Response,
	message: string
) => {
	const token = user.createJWTToken();

	res.status(statusCode).json({ success: true, message, token });
};

export default sendToken;
