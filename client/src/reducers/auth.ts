import { IUser } from "../types";

interface IAuthState {
	user: IUser | null;
}

type IAuthAction = {
	type: "SIGNUP" | "LOGIN" | "LOGOUT" | "GET_PROFILE" | "UPDATE_PROFILE";
  value: IUser;
};

export const initialAuthState: IAuthState = {
  user: null
}

export const authReducer = (state: IAuthState, action:  IAuthAction) => {
  switch(action.type) {
    case "SIGNUP":
      return state;
  }
}
