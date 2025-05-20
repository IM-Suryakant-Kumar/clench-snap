import { IUser } from "../types";

interface IAuthState {
	success?: boolean;
	message?: string | null;
	user?: IUser | null;
}

type IAuthAction = {
	type: "signup" | "login" | "logout" | "get_profile" | "update_profile";
	payload: IAuthState;
};

export const initialAuthState: IAuthState = {
	user: null,
	message: null,
	success: false,
};

export const authReducer = (state: IAuthState, action: IAuthAction) => {
	switch (action.type) {
		case "signup": {
			return { ...state, ...action.payload };
		}
		case "login": {
			return { ...state, ...action.payload };
		}
		case "logout": {
			return { ...state, ...action.payload, user: null };
		}
		case "get_profile": {
			return { ...state, ...action.payload };
		}
		case "update_profile": {
			return { ...state, ...action.payload };
		}
		default: {
			return state;
		}
	}
};
