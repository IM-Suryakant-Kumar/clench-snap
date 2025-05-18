interface ILoadingState {
	loading: boolean;
	submitting: boolean;
}

type ILoadingAction = {
	type: "loading" | "submitting";
	value: boolean;
};

export const initialLoadingState: ILoadingState = {
	loading: false,
	submitting: false,
};

export const loadingReducer = (
	state: ILoadingState,
	action: ILoadingAction
) => {
	switch (action.type) {
		case "loading": {
			return { ...state, loading: action.value };
		}
		case "submitting": {
			return { ...state, submitting: action.value };
		}
		default: {
			return state;
		}
	}
};
