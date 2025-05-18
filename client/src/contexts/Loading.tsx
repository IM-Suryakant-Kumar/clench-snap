import { createContext, useReducer, useContext, FC, useMemo } from "react";
import { initialLoadingState, loadingReducer } from "../reducers";

const intialLoadingContext = {
	loadingState: initialLoadingState,
	loadingStart: () => {},
	loadingStop: () => {},
	submittingStart: () => {},
	submittingStop: () => {},
};

const LoadingContext = createContext(intialLoadingContext);
export const useLoading = () => useContext(LoadingContext);

type Props = {
	children: React.ReactNode;
};

export const LoadingContextProvider: FC<Props> = ({ children }) => {
	const [loadingState, loadingDispatch] = useReducer(
		loadingReducer,
		initialLoadingState
	);
	const memoizedState = useMemo(() => loadingState, [loadingState]);

	const loadingStart = () => {
		loadingDispatch({
			type: "loading",
			value: true,
		});
	};

	const loadingStop = () => {
		loadingDispatch({
			type: "loading",
			value: false,
		});
	};

	const submittingStart = () => {
		loadingDispatch({
			type: "submitting",
			value: true,
		});
	};

	const submittingStop = () => {
		loadingDispatch({
			type: "submitting",
			value: false,
		});
	};

	const providerItem = {
		loadingState: memoizedState,
		loadingStart,
		loadingStop,
		submittingStart,
		submittingStop,
	};

	return (
		<LoadingContext.Provider value={providerItem}>
			{children}
		</LoadingContext.Provider>
	);
};
