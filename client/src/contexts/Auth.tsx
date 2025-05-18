import {
	createContext,
	FC,
	ReactNode,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useReducer,
} from "react";
import { authReducer, initialAuthState } from "../reducers";
import {
	signup as signupApi,
	login as loginApi,
	logout as logoutApi,
	getProfile as getProfileApi,
	updateProfile as updateProfileApi,
} from "../apis";
import { IUser } from "../types";

interface initialAuthContext {
	authState: typeof initialAuthState;
	signup: (user: IUser) => Promise<void>;
	login: (user: IUser) => Promise<void>;
	logout: () => Promise<void>;
	getProfile: () => Promise<void>;
	updateProfile: (user: IUser) => Promise<void>;
}

const AuthContext = createContext<initialAuthContext | null>(null);
export const useAuth = () => useContext(AuthContext) as initialAuthContext;

interface Props {
	children: ReactNode;
}

export const AuthContextProvider: FC<Props> = ({ children }) => {
	const [authState, dispatch] = useReducer(authReducer, initialAuthState);
	const memoizedState = useMemo(() => authState, [authState]);

	const signup = useCallback(async (cred: IUser) => {
		const { success, message } = await signupApi(cred);
		if (success) {
			const { user } = await getProfileApi();
			dispatch({
				type: "signup",
				payload: { user, errorMessage: "" },
			});
		} else {
			dispatch({
				type: "signup",
				payload: { user: null, errorMessage: message },
			});
		}
	}, []);

	const login = useCallback(async (cred: IUser) => {
		const { success, message } = await loginApi(cred);
		if (success) {
			const { user } = await getProfileApi();
			dispatch({
				type: "login",
				payload: { user, errorMessage: "" },
			});
		} else {
			dispatch({
				type: "login",
				payload: { user: null, errorMessage: message },
			});
		}
	}, []);

	const logout = useCallback(async () => {
		const { success, message } = await logoutApi();
		if (success) {
			dispatch({
				type: "logout",
				payload: { user: null, errorMessage: "" },
			});
		} else {
			dispatch({
				type: "logout",
				payload: { user: null, errorMessage: message },
			});
		}
	}, []);

	const getProfile = useCallback(async () => {
		const { success, message, user } = await getProfileApi();
		if (success) {
			dispatch({
				type: "get_profile",
				payload: { user, errorMessage: "" },
			});
		} else {
			dispatch({
				type: "get_profile",
				payload: { user: null, errorMessage: message },
			});
		}
	}, []);

	const updateProfile = useCallback(async (updatedUser: IUser) => {
		const { success, message } = await updateProfileApi(updatedUser);
		if (success) {
			const { user } = await getProfileApi();
			dispatch({
				type: "update_profile",
				payload: { user, errorMessage: "" },
			});
		} else {
			dispatch({
				type: "update_profile",
				payload: { user: null, errorMessage: message },
			});
		}
	}, []);

	useEffect(() => {
		let ignore = false;
		if (!ignore) {
			getProfile();
		}

		return () => {
			ignore = true;
		};
	}, [getProfile]);

	const providerItem = {
		authState: memoizedState,
		signup,
		login,
		logout,
		getProfile,
		updateProfile,
	};

	return (
		<AuthContext.Provider value={providerItem}>{children}</AuthContext.Provider>
	);
};
