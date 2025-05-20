import { IUser } from "../types";

interface IUserState {
	success?: boolean;
	message?: string | null;
	users?: IUser[] | null;
}

interface IUserAction {
	type: "get_users";
	payload: IUserState;
}

export const userInitialState: IUserState = {
	success: false,
  message: null,
	users: null,
};

export const userReducer = (state: IUserState, action: IUserAction) => {
	switch (action.type) {
		case "get_users":
			return { ...state, ...action.payload };
		default:
			return state;
	}
};
