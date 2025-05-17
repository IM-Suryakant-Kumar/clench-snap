import { createContext, useReducer, useContext, FC } from "react";
import { loadingInitialState, loadingReducer } from "../reducers";

const intialLoadingContext = {
	loadingState: loadingInitialState,
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
		loadingInitialState
	);

	const loadingStart = () => {
		loadingDispatch({
			type: "LOADING",
			value: true,
		});
	};

	const loadingStop = () => {
		loadingDispatch({
			type: "LOADING",
			value: false,
		});
	};

	const submittingStart = () => {
		loadingDispatch({
			type: "SUBMITTING",
			value: true,
		});
	};

	const submittingStop = () => {
		loadingDispatch({
			type: "SUBMITTING",
			value: false,
		});
	};

	const providerItem = {
		loadingState,
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
