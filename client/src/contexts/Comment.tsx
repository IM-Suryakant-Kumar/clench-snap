import {
	createContext,
	FC,
	useCallback,
	useContext,
	useEffect,
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
	getComments: () => Promise<void>;
	createComment: (comment: IComment) => Promise<void>;
	updateComment: (id: string, comment: IComment) => Promise<void>;
	deleteComment: (id: string) => Promise<void>;
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

	const createComment = useCallback(async (comment: IComment) => {
		const { success } = await createCommentApi(comment);
		if (success) {
			const { comments } = await getCommentsApi();
			dispatch({
				type: "create_comment",
				payload: { comments },
			});
		}
	}, []);

	const getComments = useCallback(async () => {
		const { success, comments } = await getCommentsApi();
		success &&
			dispatch({
				type: "get_comments",
				payload: { comments },
			});
	}, []);

	const updateComment = useCallback(async (id: string, comment: IComment) => {
		const { success } = await updateCommentApi(id, comment);
		if (success) {
			const { comments } = await getCommentsApi();
			dispatch({
				type: "update_comment",
				payload: { comments },
			});
		}
	}, []);

	const deleteComment = useCallback(async (id: string) => {
		const { success } = await deleteCommentApi(id);
		if (success) {
			const { comments } = await getCommentsApi();
			dispatch({
				type: "delete_comment",
				payload: { comments },
			});
		}
	}, []);

	useEffect(() => {
		let ignore = false;
		if (!ignore) {
			getComments();
		}

		return () => {
			ignore = true;
		};
	}, [getComments]);

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
