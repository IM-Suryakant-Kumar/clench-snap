import { useOutletContext } from "react-router";
import { Post } from "../components";
import { IPost } from "../types";

const ProfileLikedPost = () => {
	const { likedPosts } = useOutletContext() as { likedPosts: IPost[] };

	return (
		<div>
			{likedPosts && (
				<div>
					{likedPosts.map((post, idx) => (
						<Post key={idx} post={post} />
					))}
				</div>
			)}
		</div>
	);
};

export default ProfileLikedPost;
