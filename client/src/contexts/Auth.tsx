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

	const getProfile = useCallback(async () => {
		const { success, user } = await getProfileApi();
		dispatch({ type: "get_profile", payload: { success, user } });
	}, []);

	const signup = useCallback(
		async (cred: IUser) => {
			const { success, message } = await signupApi(cred);
			success && (await getProfile());
			!success && dispatch({ type: "signup", payload: { success, message } });
		},
		[getProfile]
	);

	const login = useCallback(
		async (cred: IUser) => {
			const { success, message } = await loginApi(cred);
			success && (await getProfile());
			!success && dispatch({ type: "login", payload: { success, message } });
		},
		[getProfile]
	);

	const logout = useCallback(async () => {
		const { success, message } = await logoutApi();
		dispatch({ type: "logout", payload: { success, message } });
	}, []);

	const updateProfile = useCallback(async (updatedUser: IUser) => {
		const { success, message } = await updateProfileApi(updatedUser);
    success && (await getProfile());
		!success && dispatch({ type: "update_profile", payload: { success, message } });
	}, [getProfile]);

  useEffect(() => {
    let ignore = false;
    if(!ignore) {
      getProfile();
    }

    return () => {
      ignore = true;
    }
  }, [getProfile])

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
