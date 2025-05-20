/* eslint-disable no-mixed-spaces-and-tabs */
import {
	createContext,
	useReducer,
	useContext,
	useCallback,
	useEffect,
	useMemo,
} from "react";
import { userInitialState, userReducer } from "../reducers";
import { getUsers as getUsersApi } from "../apis";
import { useAuth } from "./Auth";

interface IUserContext {
	userState: typeof userInitialState;
	getUsers(): Promise<void>;
}

const UserContext = createContext<IUserContext | null>(null);
export const useUser = () => useContext(UserContext) as IUserContext;

type Props = {
	children: React.ReactNode;
};

export const UserContextProvider: React.FC<Props> = ({ children }) => {
	const [userState, dispatch] = useReducer(userReducer, userInitialState);
	const memoizedState = useMemo(() => userState, [userState]);
	const { authState } = useAuth();

	const getUsers = useCallback(async () => {
		const { success, users } = await getUsersApi();
		success &&
			dispatch({
				type: "get_users",
				payload: { success, users },
			});
	}, []);

	useEffect(() => {
		let ignore = false;
		if (!ignore) {
			getUsers();
		}

		return () => {
			ignore = true;
		};
	}, [getUsers, authState.message, userState.message]);

	const providerItem = {
		userState: memoizedState,
		getUsers,
	};

	return (
		<UserContext.Provider value={providerItem}>{children}</UserContext.Provider>
	);
};
