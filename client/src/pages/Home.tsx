import { IoPencil } from "react-icons/io5";
import { usePost, usePostModal } from "../contexts";
import { useState } from "react";
import { filteredByCategory } from "../utils";
import { Post, RightSidebar } from "../components";

const Home = () => {
	const { handleToggle, setPostToEdit, setContent } = usePostModal();
	const [filterCat, setFilterCat] = useState<string>("recent");
	const {
		postState: { posts },
	} = usePost();

	const handlePencilClick = () => {
		setPostToEdit(null);
		setContent("");
		handleToggle();
	};

	return (
		<div className="relative min-h-screen">
			<div className="flex mt-[7em] sm:mt-[5em]">
				<div className="ml-auto md:w-[60%] max-w-[40rem]">
					<div className="w-[95%] h-[3rem] mx-auto flex items-center justify-around text-center  mb-[1em]">
						<span
							className={`text-logo-cl cursor-pointer uppercase text-sm flex-1 py-[0.5em] border-b-[3px] ${
								filterCat === "recent" ? "border-logo-cl" : "border-blue-300"
							}`}
							onClick={() => setFilterCat("recent")}
						>
							recent
						</span>
						<span
							className={`text-logo-cl cursor-pointer uppercase text-sm flex-1 py-[0.5em] border-b-[3px] ${
								filterCat === "older" ? "border-logo-cl" : "border-blue-300"
							}`}
							onClick={() => setFilterCat("older")}
						>
							older
						</span>
						<span
							className={`text-logo-cl cursor-pointer uppercase text-sm flex-1 py-[0.5em] border-b-[3px] ${
								filterCat === "trending" ? "border-logo-cl" : "border-blue-300"
							}`}
							onClick={() => setFilterCat("trending")}
						>
							trending
						</span>
					</div>
					{posts &&
						filteredByCategory(posts, filterCat)?.map((post, idx) => (
							<Post key={idx} post={post} />
						))}
				</div>
				<div className="hidden md:block md:w-[40%]">
					<RightSidebar />
				</div>
			</div>
			<div
				className="w-[3rem] h-[3rem] fixed bottom-[2.5em] sm:bottom-[0.5em] right-[1.5em] z-40  text-[1.5rem] p-[0.5em] text-primary-cl bg-logo-cl rounded-full cursor-pointer"
				onClick={handlePencilClick}
			>
				<IoPencil />
			</div>
		</div>
	);
};

export default Home;
