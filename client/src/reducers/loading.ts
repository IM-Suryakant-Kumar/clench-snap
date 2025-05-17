interface ILoadingState {
	loading: boolean;
	submitting: boolean;
}

type ILoadingAction = {
	type: "LOADING" | "SUBMITTING";
	value: boolean;
};

export const loadingInitialState: ILoadingState = {
	loading: false,
	submitting: false,
};

export const loadingReducer = (
	state: ILoadingState,
	action: ILoadingAction
) => {
	switch (action.type) {
		case "LOADING":
			return { ...state, loading: action.value };
		case "SUBMITTING":
			return { ...state, submitting: action.value };
		default:
			return state;
	}
};
