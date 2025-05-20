import {
	createContext,
	FC,
	useCallback,
	useContext,
	useMemo,
	useReducer,
} from "react";
import { IComment } from "../types";
import { commentInitialState, commentReducer } from "../reducers";
import {
	createComment as createCommentApi,
	getComments as getCommentsApi,
	updateComment as updateCommentApi,
	deleteComment as deleteCommentApi,
} from "../apis";

interface ICommentContext {
	commentState: typeof commentInitialState;
	getComments(): Promise<void>;
	createComment(comment: IComment): Promise<void>;
	updateComment(id: string, comment: IComment): Promise<void>;
	deleteComment(id: string): Promise<void>;
}

const CommentContext = createContext<ICommentContext | null>(null);
export const useComment = () => useContext(CommentContext) as ICommentContext;

type Props = {
	children: React.ReactNode;
};

export const CommentContextProvider: FC<Props> = ({ children }) => {
	const [commentState, dispatch] = useReducer(
		commentReducer,
		commentInitialState
	);
	const memoizedState = useMemo(() => commentState, [commentState]);

	const getComments = useCallback(async () => {
		const { success, comments } = await getCommentsApi();
		dispatch({ type: "get_comments", payload: { success, comments } });
	}, []);

	const createComment = useCallback(
		async (comment: IComment) => {
			const { success, message } = await createCommentApi(comment);
			success && (await getComments());
			!success &&
				dispatch({ type: "create_comment", payload: { success, message } });
		},
		[getComments]
	);

	const updateComment = useCallback(
		async (id: string, comment: IComment) => {
			const { success, message } = await updateCommentApi(id, comment);
			success && (await getComments());
			!success &&
				dispatch({ type: "update_comment", payload: { success, message } });
		},
		[getComments]
	);

	const deleteComment = useCallback(
		async (id: string) => {
			const { success, message } = await deleteCommentApi(id);
			success && (await getComments());
			!success &&
				dispatch({ type: "delete_comment", payload: { success, message } });
		},
		[getComments]
	);

	// fetching user and we have to call getProfile explicitly whenever update happen
	!memoizedState.comments && getComments();

	const providerItem = {
		commentState: memoizedState,
		getComments,
		createComment,
		updateComment,
		deleteComment,
	};

	return (
		<CommentContext.Provider value={providerItem}>
			{children}
		</CommentContext.Provider>
	);
};
