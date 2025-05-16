import { CustomAPIError } from "./custom-api";

export class NotFoundError extends CustomAPIError {
	statusCode: number;
	constructor(message: string) {
		super(message);
		this.statusCode = 404;
	}
}