export interface IUser {
	_id?: string;
	name?: string;
	username?: string;
	password?: string;
	email?: string;
	avatar?: string;
	bio?: string;
	website?: string;
	followers?: string[];
	followings?: string[];
	posts?: string[];
}

export interface IPost {
	_id?: string;
	author?: string;
	content?: string;
	image?: string;
	liked?: string[];
	saved?: string[];
	comments?: string[];
}

export interface IComment {
	_id?: string;
	post?: string;
	author?: string;
	content?: string;
}

// response
export type TData = {
	success: boolean;
	message?: string;
	token?: string;
	user?: IUser;
	users?: IUser[];
	posts?: IPost[];
	comments?: IComment[];
};

interface SuccessResponse {
	data: TData;
}

interface FailedResponse {
	response: {
		data: TData;
	};
}

export interface IApiRes extends SuccessResponse, FailedResponse {}
