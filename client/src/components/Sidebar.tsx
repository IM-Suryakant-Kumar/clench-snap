import {
	MdOutlineExplore,
	MdOutlineHome,
	MdOutlinePersonOutline,
	MdOutlineSettings,
} from "react-icons/md";
import { NavLink } from "react-router";
import { useAuth } from "../contexts";

const Sidebar = () => {
	const {
		authState: { user },
	} = useAuth();

	return (
		<div className="sidebar fixed bottom-0 h-[3rem] w-full bg-secondary-cl sm:bg-inherit sm:w-[10rem] sm:h-auto sm:top-[5em] z-50">
			<div className="h-full flex justify-around items-center text-logo-cl sm:flex-col sm:items-stretch sm:justify-stretch">
				<NavLink
					to="/home"
					className="w-[1.5rem] h-[1.5rem] flex justify-center items-center rounded-[50%] sm:w-full sm:h-[3.5rem] sm:rounded-none"
				>
					<div className="sm:w-full sm:h-full sm:flex sm:items-center sm:pl-[1em] text-[1.2rem] sm:text-[1.5rem]">
						<MdOutlineHome />
						<span className="hidden sm:inline-block text-[1.2rem] pl-[1.5em]">
							Home
						</span>
					</div>
				</NavLink>
				<NavLink
					to="/explore"
					className="w-[1.5rem] h-[1.5rem] flex justify-center items-center rounded-[50%] sm:w-full sm:h-[3.5rem] sm:rounded-none"
				>
					<div className="sm:w-full sm:h-full sm:flex sm:items-center sm:pl-[1em] text-[1.2rem] sm:text-[1.5rem]">
						<MdOutlineExplore />
						<span className="hidden sm:inline-block text-[1.2rem] pl-[1.5em]">
							Explore
						</span>
					</div>
				</NavLink>
				<NavLink
					to={`/profile/${user?.username}/post`}
					className="w-[1.5rem] h-[1.5rem] flex justify-center items-center rounded-[50%] sm:w-full sm:h-[3.5rem] sm:rounded-none"
				>
					<div className="sm:w-full sm:h-full sm:flex sm:items-center sm:pl-[1em] text-[1.2rem] sm:text-[1.5rem]">
						<MdOutlinePersonOutline />
						<span className="hidden sm:inline-block text-[1.2rem] pl-[1.5em]">
							Profile
						</span>
					</div>
				</NavLink>
				<NavLink
					to="/settings"
					className="w-[1.5rem] h-[1.5rem] flex justify-center items-center rounded-[50%] sm:w-full sm:h-[3.5rem] sm:rounded-none"
				>
					<div className="sm:w-full sm:h-full sm:flex sm:items-center sm:pl-[1em] text-[1.2rem] sm:text-[1.5rem]">
						<MdOutlineSettings />
						<span className="hidden sm:inline-block text-[1.2rem] pl-[1.5em]">
							Settings
						</span>
					</div>
				</NavLink>
			</div>
		</div>
	);
};

export default Sidebar;
