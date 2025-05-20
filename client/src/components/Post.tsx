/* eslint-disable no-mixed-spaces-and-tabs */
import { useState } from "react";
import { Link } from "react-router";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { FaHeart, FaRegComment, FaRegHeart } from "react-icons/fa";
import { MdBookmark, MdOutlineBookmarkBorder } from "react-icons/md";
import { useAuth, usePost, useUser } from "../contexts";
import { ActionModal, ProfilePic } from ".";
import { IPost } from "../types";

type Props = {
	post: IPost;
};

const Post: React.FC<Props> = ({ post }) => {
	const {
		authState: { user },
	} = useAuth();
	const {
		userState: { users },
	} = useUser();
	const { updatePost } = usePost();

	const postUser = users?.find((u) => post.author === u._id);

	const [showModalId, setShowModalId] = useState<string>("");

	const handleLike = async () => {
		const liked = post?.liked?.includes(user?._id as string)
			? post.liked.filter((uid) => uid !== user?._id)
			: [...(post?.liked as string[]), user?._id];
		await updatePost(post._id!, { liked } as IPost);
	};

	const handleSave = async () => {
		const saved = post?.saved?.includes(user?._id as string)
			? post.saved.filter((uid) => uid !== user?._id)
			: [...(post?.saved as string[]), user?._id];
		await updatePost(post._id!, { saved } as IPost);
	};

	const handleActionModal = (postId: string) => {
		setShowModalId((prevId) => (prevId === postId ? "" : postId));
	};

	return (
		<div className="w-[95%] mx-auto bg-secondary-cl mb-[1em] rounded-lg relative">
			<div className="flex items-center p-[0.5em]">
				<Link
					to={`/profile/${postUser?.username}/post`}
					className="flex items-center"
				>
					<ProfilePic
						width="2rem"
						height="2rem"
						size="1rem"
						name={postUser?.name as string}
						avatar={postUser?.avatar as string}
					/>
					<h1 className="ml-[1em] font-medium text-md">{postUser?.name}</h1>
				</Link>
				<div
					className="ml-auto cursor-pointer text-md"
					onClick={() => handleActionModal(post._id!)}
				>
					<HiOutlineDotsVertical />
				</div>
				{/* action modals */}
				{showModalId === post._id && (
					<ActionModal postToEdit={post} postUserId={post.author!} />
				)}
			</div>
			<p className="p-[0.5em]">
				{post.content!.length >= 100
					? post.content!.substring(0, 99) +
					  <Link to={`/post/${post._id}`}>&nbsp;...</Link>
					: post.content}
			</p>
			{post.image && (
				<div className="my-[0.5em] border-[1px] border-gray-400">
					<img className="w-full h-full object-cover" src={post.image} alt="" />
				</div>
			)}
			<div className="p-[0.5em] flex items-center text-xl">
				<div className="cursor-pointer" onClick={handleLike}>
					{post.liked?.includes(user?._id as string) ? (
						<FaHeart />
					) : (
						<FaRegHeart />
					)}
				</div>{" "}
				<p className="text-[1rem] font-normal ml-[0.5em]">
					{post.liked?.length}
				</p>
				<div className="cursor-pointer ml-[1em]">
					<Link to={`/post/${post._id}`}>
						<FaRegComment />
					</Link>
				</div>
				<p className="text-[1rem] font-normal ml-[0.5em]">
					{post.comments?.length}
				</p>
				<div className="cursor-pointer ml-auto" onClick={handleSave}>
					{post?.saved?.includes(user?._id as string) ? (
						<MdBookmark />
					) : (
						<MdOutlineBookmarkBorder />
					)}
				</div>
			</div>
		</div>
	);
};

export default Post;
