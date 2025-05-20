import {
	useAuth,
	useLoading,
	usePost,
	usePostModal,
	useUser,
} from "../contexts";
import { IPost, IUser } from "../types";
import { loadingWrapper } from "../utils";

type Props = {
	postToEdit: IPost;
	postUserId: string;
};

const ActionModal: React.FC<Props> = ({ postToEdit, postUserId }) => {
	const { handleToggle, setPostToEdit, setContent } = usePostModal();

	const {
		authState: { user },
		updateProfile,
	} = useAuth();
	const {
		userState: { users },
	} = useUser();

	const { deletePost } = usePost();

	const {
		loadingState: { loading },
		loadingStart,
		loadingStop,
	} = useLoading();

	const handleEdit = async () => {
		setPostToEdit(postToEdit);
		setContent(postToEdit.content!);
		handleToggle();
	};

	const handleDelete = async () => await deletePost(postToEdit._id!);

	const handleFollowing = async () => {
		const postUser = users?.find((item) => item._id === postUserId);
		const fn = async () => {
			// followers
			const followers = postUser?.followers!.includes(user?._id as string)
				? postUser.followers!.filter((userId) => userId !== user?._id)
				: [...(postUser?.followers as string[]), user?._id];

			await updateProfile({ followers } as IUser);

			// followings
			const followings = user?.followings!.includes(postUserId)
				? user.followings!.filter((userId) => postUserId !== userId)
				: [...(user?.followings as string[]), postUserId];

			await updateProfile({ followings } as IUser);
		};

		loadingWrapper(loadingStart, loadingStop, fn);
	};

	return (
		<div className="w-[10rem] p-[0.2em] absolute top-[2.5em] right-[0.8em] bg-primary-cl shadow-md">
			{user?._id === postUserId && (
				<button
					className="w-full text-center hover:bg-secondary-cl py-[0.5em]"
					onClick={handleEdit}
				>
					Edit
				</button>
			)}
			{user?._id === postUserId && (
				<button
					className="w-full text-center hover:bg-secondary-cl py-[0.5em]"
					onClick={handleDelete}
				>
					Delete
				</button>
			)}
			{user?._id !== postUserId && (
				<button
					className="w-full text-center hover:bg-secondary-cl py-[0.5em]"
					onClick={handleFollowing}
					disabled={loading}
				>
					{user?.followings?.includes(postUserId) ? "Following" : "follow"}
				</button>
			)}
		</div>
	);
};

export default ActionModal;
