import { IPost } from "../types";

export interface IPostState {
	success?: boolean;
	message?: string | null;
	posts?: IPost[] | null;
}

export interface IPostAction {
	type: "create_post" | "get_posts" | "update_post" | "delete_post";
	payload: IPostState;
}

export const postInitialState: IPostState = {
	success: false,
	message: null,
	posts: null,
};

export const postReducer = (state: IPostState, action: IPostAction) => {
	switch (action.type) {
		case "create_post":
			return { ...state, ...action.payload };
		case "get_posts":
			return { ...state, ...action.payload };
		case "update_post":
			return { ...state, ...action.payload };
		case "delete_post":
			return { ...state, ...action.payload };
		default:
			return state;
	}
};
