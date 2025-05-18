import { IUser } from "../types";

interface IUserState {
	users: IUser[] | null;
}

interface IUserAction {
	type: "get_users";
	payload: IUserState;
}

export const userInitialState: IUserState = {
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
