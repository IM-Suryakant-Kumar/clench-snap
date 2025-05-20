/* eslint-disable no-mixed-spaces-and-tabs */
import {
	createContext,
	useReducer,
	useContext,
	useCallback,
	useMemo,
} from "react";
import { userInitialState, userReducer } from "../reducers";
import { getUsers as getUsersApi } from "../apis";

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

	const getUsers = useCallback(async () => {
		const { success, users } = await getUsersApi();
		dispatch({ type: "get_users", payload: { success, users } });
	}, []);

	!memoizedState.users && getUsers();

	const providerItem = {
		userState: memoizedState,
		getUsers,
	};

	return (
		<UserContext.Provider value={providerItem}>{children}</UserContext.Provider>
	);
};
