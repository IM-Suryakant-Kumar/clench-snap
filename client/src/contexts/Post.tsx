import {
	createContext,
	FC,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useReducer,
} from "react";
import { IPost } from "../types";
import { postInitialState, postReducer } from "../reducers";
import {
	createPost as createPostApi,
	getPosts as getPostsApi,
	updatePost as updatePostApi,
	deletePost as deletePostApi,
} from "../apis";

interface IPostContext {
	postState: typeof postInitialState;
	getPosts: () => Promise<void>;
	createPost: (post: IPost) => Promise<void>;
	updatePost: (id: string, post: IPost) => Promise<void>;
	deletePost: (id: string) => Promise<void>;
}

const PostContext = createContext<IPostContext | null>(null);
export const usePost = () => useContext(PostContext) as IPostContext;

type Props = {
	children: React.ReactNode;
};

export const PostContextProvider: FC<Props> = ({ children }) => {
	const [postState, dispatch] = useReducer(postReducer, postInitialState);
	const memoizedState = useMemo(() => postState, [postState]);

	const createPost = useCallback(async (post: IPost) => {
		const { success } = await createPostApi(post);
		if (success) {
			const { posts } = await getPostsApi();
			dispatch({
				type: "create_post",
				payload: { posts },
			});
		}
	}, []);

	const getPosts = useCallback(async () => {
		const { success, posts } = await getPostsApi();
		success &&
			dispatch({
				type: "get_posts",
				payload: { posts },
			});
	}, []);

	const updatePost = useCallback(async (id: string, post: IPost) => {
		const { success } = await updatePostApi(id, post);
		if (success) {
			const { posts } = await getPostsApi();
			dispatch({
				type: "create_post",
				payload: { posts },
			});
		}
	}, []);

	const deletePost = useCallback(async (id: string) => {
		const { success } = await deletePostApi(id);
		if (success) {
			const { posts } = await getPostsApi();
			dispatch({
				type: "create_post",
				payload: { posts },
			});
		}
	}, []);

	useEffect(() => {
		let ignore = false;
		if (!ignore) {
			getPosts();
		}

		return () => {
			ignore = true;
		};
	}, [getPosts]);

	const providerItem = {
		postState: memoizedState,
		getPosts,
		createPost,
		updatePost,
		deletePost,
	};

	return (
		<PostContext.Provider value={providerItem}>{children}</PostContext.Provider>
	);
};
