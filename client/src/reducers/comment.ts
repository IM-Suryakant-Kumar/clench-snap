import { IComment } from "../types";

export interface ICommentState {
	success?: boolean;
	message?: string | null;
	comments?: IComment[] | null;
}

export interface ICommentAction {
	type: "create_comment" | "get_comments" | "update_comment" | "delete_comment";
	payload: ICommentState;
}

export const commentInitialState: ICommentState = {
	success: false,
	message: null,
	comments: null,
};

export const commentReducer = (
	state: ICommentState,
	action: ICommentAction
) => {
	switch (action.type) {
		case "create_comment":
			return { ...state, ...action.payload };
		case "get_comments":
			return { ...state, ...action.payload };
		case "update_comment":
			return { ...state, ...action.payload };
		case "delete_comment":
			return { ...state, ...action.payload };
		default:
			return state;
	}
};
