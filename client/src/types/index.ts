export interface IUser {
	_id: string;
	name: string;
	username: string;
	email: string;
	avatar: string;
	bio: string;
	website: string;
	password: string;
	followers: IUser[];
	followings: IUser[];
	liked: IPost[];
	saved: IPost[];
	posts: IPost[];
}

export interface IPost {
	_id: string;
	author: IUser;
	content: string;
	image: string;
	comments: IComment[];
}

export interface IComment {
	_id: string;
	post: IPost;
	author: IUser;
	content: string;
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

export * from "./statesAndActions";
