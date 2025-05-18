import { IUser } from "../types";

interface IAuthState {
	user: IUser | null;
	errorMessage: string;
}

type IAuthAction = {
	type: "signup" | "login" | "logout" | "get_profile" | "update_profile" | "error";
	payload: IAuthState;
};

export const initialAuthState: IAuthState = {
	user: null,
	errorMessage: "",
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
			return { user: null, errorMessage: "" };
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
