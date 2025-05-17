// const post

import { useOutletContext } from "react-router";
import { Post } from "../components";
import { IPost } from "../types";

const ProfilePost = () => {
	const { posts } = useOutletContext() as { posts: IPost[] };

	// console.log(posts);

	return (
		<div>
			{posts && (
				<div>
					{posts.map((post, idx) => (
						<Post key={idx} post={post} />
					))}
				</div>
			)}
		</div>
	);
};

export default ProfilePost;
