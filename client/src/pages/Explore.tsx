import { Post, RightSidebar } from "../components";
import { usePost } from "../contexts";

const Explore = () => {
	const {
		postState: { posts },
	} = usePost();

	return (
		<div className="relative min-h-screen">
			<div className="flex mt-[7em] sm:mt-[5em]">
				<div className="ml-auto md:w-[60%] max-w-[40rem]">
					{posts?.map((post, idx) => (
						<Post key={idx} post={post} />
					))}
				</div>
				<div className="hidden md:block md:w-[40%]">
					<RightSidebar />
				</div>
			</div>
		</div>
	);
};

export default Explore;
