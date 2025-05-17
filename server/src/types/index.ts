export interface IUser {
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
	author: IUser;
	content: string;
	image: string;
	comments: IComment[];
}

export interface IComment {
  post: IPost;
	author: IUser;
	content: string;
}