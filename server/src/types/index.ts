export interface IUser {
	fullname: string;
	username: string;
	email: string;
	avatar: string;
	bio: string;
	website: string;
	password: string;
	followers: string[];
	followings: string[];
}

interface IComment {
	userName: string;
	avatar: string;
	content: string;
}

export interface IPost {
	userId: string;
	userName: string;
	avatar: string;
	content: string;
	image: string;
	liked: string[];
	saved: string[];
	comments: IComment[];
}
