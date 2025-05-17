import { useParams } from "react-router";
import { useLoading, usePost, useUser } from "../contexts";
import { useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { CommentModal, Post as PostC, ProfilePic } from "../components";
import { IPost } from "../types";
import { loadingWrapper } from "../utils";

const Post = () => {
	const { postId } = useParams() as { postId: string };
	const [toggleModalIdx, setToggleModalIdx] = useState<number | null>(null);
	const [toggleCommentModal, setToggleCommentModal] = useState<boolean>(false);
	const [commentToEdit, setCommentToEdit] = useState<{
		userName: string;
		content: string;
	} | null>(null);

	const {
		loadingState: { submitting, loading },
		submittingStart,
		submittingStop,
		loadingStart,
		loadingStop,
	} = useLoading();

	const {
		postState: { posts },
		updatePost,
	} = usePost();

	const {
		userState: { user },
	} = useUser();

	const [content, setContent] = useState<string>("");

	const post = posts?.find(post => post._id === postId) as IPost;

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const fn = async () => {
			const formData = new FormData(e.currentTarget);
			const comment = {
				userName: user?.fullname,
				avatar: user?.avatar,
				content: formData.get("content") as string,
			};

			await updatePost({
				_id: post._id,
				comments: [...post.comments, comment],
			} as IPost);
			// erase content
			setContent("");
		};

		loadingWrapper(submittingStart, submittingStop, fn);
	};

	// Action Modal
	const handleModal = (idx: number) => {
		setToggleModalIdx(prevIdx => (prevIdx === null ? idx : null));
	};

	const handleCommentModal = () =>
		setToggleCommentModal(prevState => !prevState);

	const handleEdit = (userName: string, content: string) => {
		setCommentToEdit({ userName, content });
		handleCommentModal();
		setToggleModalIdx(null);
	};

	const HandleDeleteComment = async (userName: string, content: string) => {
		const fn = async () => {
			const updatedComments = post.comments.filter(c => {
				if (c.userName === userName && c.content === content) return false;
				return true;
			});
			await updatePost({
				_id: post._id,
				comments: updatedComments,
			} as IPost);
			setToggleModalIdx(null);
		};

		loadingWrapper(loadingStart, loadingStop, fn);
	};

	return (
		<div className="max-w-[40rem] mx-auto mt-[7em] sm:mt-[5em]">
			{/* ModalToEditComment */}
			{toggleCommentModal && (
				<CommentModal
					handleCommentModal={handleCommentModal}
					commentToEdit={
						commentToEdit as {
							userName: string;
							content: string;
						}
					}
					post={post}
				/>
			)}
			{post && <PostC post={post} />}
			<div className="w-[95%] h-[3rem] mx-auto bg-secondary-cl flex items-center">
				<div className="w-[10%] min-w-[3rem] flex justify-center">
					<ProfilePic
						width="2rem"
						height="2rem"
						size="0,8rem"
						avatar={user?.avatar as string}
						name={user?.fullname as string}
					/>
				</div>
				<form
					onSubmit={handleSubmit}
					className="w-[90%] flex items-center gap-[0.5em]">
					<input
						className="w-[80%] h-[1.5rem] outline-none border-[1px] border-logo-cl rounded-md pl-[0.5em] text-sm"
						type="text"
						name="content"
						placeholder="comment as"
						value={content}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setContent(e.target.value)
						}
						required
					/>
					<button
						className="w-[20%] ml-auto mr-[0.5em] bg-logo-cl text-primary-cl h-[1.5rem] text-sm rounded-md px-[0.4em] "
						disabled={submitting}>
						{submitting ? "sending..." : "Send"}
					</button>
				</form>
			</div>
			{post && (
				<div className="w-[95%] pb-[3em] mx-auto bg-secondary-cl mt-[0.5em] flex flex-col justify-center">
					{post.comments.map((c, idx) => (
						<div
							key={idx}
							className="py-[0.5em] border-b-[1px] border-logo-cl flex relative">
							<div className="w-[10%] min-w-[3rem] flex justify-center">
								<ProfilePic
									width="2rem"
									height="2rem"
									size="0.8rem"
									avatar={c.avatar as string}
									name={c.userName as string}
								/>
							</div>
							<div className="pl-[0.5em]">
								<p className="text-md">{c.userName}</p>
								<p className="text-sm">{c.content}</p>
							</div>
							<div
								className="ml-auto cursor-pointer text-md"
								onClick={() => handleModal(idx)}>
								<HiOutlineDotsVertical />
							</div>
							{/* ActionModals */}
							{toggleModalIdx === idx && user?.fullname === c.userName && (
								<div className="w-[8rem] p-[0.2em] absolute top-[2.5em] right-[0.8em] z-40 bg-primary-cl shadow-md">
									<button
										className="w-full text-sm text-center hover:bg-secondary-cl py-[0.2em]"
										onClick={() => handleEdit(c.userName, c.content)}>
										Edit
									</button>
									<button
										className="w-full text-sm text-center hover:bg-secondary-cl py-[0.2em]"
										disabled={loading}
										onClick={() => HandleDeleteComment(c.userName, c.content)}>
										Delete
									</button>
								</div>
							)}
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default Post;
