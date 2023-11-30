import { useState } from "react";
import { usePost } from "../contexts";
import Post from "../components/Post";
import RightSidebar from "../components/RightSidebar";
import PostModal from "../components/PostModal";

const Explore = () => {
	const [toggleModal, setToggleModal] = useState<boolean>(true);

	const {
		postState: { posts },
	} = usePost();

	const handleToggle = () => {
		setToggleModal(prevState => !prevState);
	};

	return (
		<div className="relative min-h-screen">
			<div className="flex mt-[7em] sm:mt-[5em]">
				<div className="mx-auto md:w-[60%] max-w-[40rem]">
					{posts?.map((post, idx) => (
						<Post
							key={idx}
							post={post}
						/>
					))}
				</div>
				<div className="hidden md:block md:w-[40%]">
					<RightSidebar />
				</div>
			</div>
			<PostModal
				toggleModal={toggleModal}
				handleToggle={handleToggle}
			/>
		</div>
	);
};

export default Explore;
