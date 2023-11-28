import { IoPencil } from "react-icons/io5";
import RightSidebar from "../components/RightSidebar";
import PostModal from "../components/PostModal";
import { useState } from "react";

const Home = () => {
	const [toggleModal, setToggleModal] = useState<boolean>(true);

    const handleToggle = () => {
        setToggleModal(prevState => !prevState)
    }

	return (
		<div className="relative min-h-screen">
			<PostModal toggleModal={toggleModal} handleToggle={handleToggle} />
			<RightSidebar />
			<div
				className="w-[3rem] h-[3rem] fixed bottom-[2.5em] sm:bottom-[0.5em] right-[0.5em] z-40  text-[1.5rem] p-[0.5em] text-primary-cl bg-logo-cl rounded-full cursor-pointer"
				onClick={handleToggle}
			>
				<IoPencil />
			</div>
		</div>
	);
};

export default Home;
