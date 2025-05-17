import { IPost, IUser } from ".";

// user
export interface IUserState {
	user?: IUser | null;
    users?: IUser[] | null;
    followers?: IUser[] | null;
	followings?: IUser[] | null;
}

export interface IUserAction {
	type: string;
	payload: IUserState;
}

// post
export interface IPostState {
    posts: IPost[] | null;
}

export interface IPostAction {
    type: string;
    payload: IPost[]
}
