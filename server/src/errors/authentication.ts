import { CustomAPIError } from "./custom-api";

export class UnauthenticatedError extends CustomAPIError {
	statusCode: number;
	constructor(message: string) {
		super(message);
		this.statusCode = 401;
	}
}

export class UnauthorizedError extends CustomAPIError {
	statusCode: number;
	constructor(message: string) {
		super(message);
		this.statusCode = 403;
	}
}