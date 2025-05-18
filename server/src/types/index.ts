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
  posts: IPost[];
}

export interface IPost {
  author: IUser;
	content: string;
	image: string;
  liked: IPost[];
  saved: IPost[];
	comments: IComment[];
}

export interface IComment {
  post: IPost;
	author: IUser;
	content: string;
}