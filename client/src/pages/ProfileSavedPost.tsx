import { useOutletContext } from "react-router";
import { Post } from "../components";
import { IPost } from "../types";

const ProfileSavedPost = () => {
	const { savedPosts } = useOutletContext() as { savedPosts: IPost[] };

	return (
		<div>
			{savedPosts && (
				<div>
					{savedPosts.map((post, idx) => (
						<Post key={idx} post={post} />
					))}
				</div>
			)}
		</div>
	);
};

export default ProfileSavedPost;
