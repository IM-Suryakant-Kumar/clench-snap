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
	signup(user: IUser): Promise<void>;
	login(user: IUser): Promise<void>;
	logout(): Promise<void>;
	getProfile(): Promise<void>;
	updateProfile(user: IUser): Promise<void>;
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
		dispatch({ type: "signup", payload: { success, message } });
	}, []);

	const login = useCallback(async (cred: IUser) => {
		const { success, message } = await loginApi(cred);
		dispatch({ type: "login", payload: { success, message } });
	}, []);

	const logout = useCallback(async () => {
		const { success, message } = await logoutApi();
		dispatch({ type: "logout", payload: { success, message } });
	}, []);

	const getProfile = useCallback(async () => {
		const { success, user } = await getProfileApi();
		dispatch({ type: "get_profile", payload: { success, user } });
	}, []);

	const updateProfile = useCallback(async (updatedUser: IUser) => {
		const { success, message } = await updateProfileApi(updatedUser);
		dispatch({ type: "update_profile", payload: { success, message } });
	}, []);

	useEffect(() => {
		let ignore = false;
		!ignore && getProfile();

		return () => {
			ignore = true;
		};
	}, [getProfile, authState.message]);

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
