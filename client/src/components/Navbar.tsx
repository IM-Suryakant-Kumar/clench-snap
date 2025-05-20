import { Link, useNavigate } from "react-router";
import Logo from "../assets/share.svg";
import { MdSearch } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { useAuth, useUser } from "../contexts";
import { useEffect, useMemo, useState } from "react";
import { ProfilePic, SearchModal } from ".";
import { IUser } from "../types";
import { debounce } from "../utils";

const Navbar = () => {
	const navigate = useNavigate();
	const {
		authState: { user },
	} = useAuth();
	const {
		userState: { users },
	} = useUser();

	const [searchedText, setSearchedText] = useState<string>("");
	const [searchedUsers, setSearchedUsers] = useState<IUser[] | []>([]);

	const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
		setSearchedText(e.target.value);

	const debounceChangeHandler = useMemo(
		() => debounce(changeHandler, 1000),
		[]
	);

	useEffect(() => {
		if (searchedText) {
			setSearchedUsers(
				users?.filter((user) => {
					if (user.name?.toLowerCase().includes(searchedText.toLowerCase()))
						return true;
					else if (
						user.username?.toLowerCase().includes(searchedText.toLowerCase())
					)
						return true;
					return false;
				}) as IUser[]
			);
		} else {
			setSearchedUsers([]);
		}
	}, [searchedText, users]);

	return (
		<header className="w-full h-[6rem] sm:h-[4rem] bg-secondary-cl px-1 fixed top-0 z-10">
			<nav className="h-full flex flex-wrap">
				<div className="w-[75%] sm:w-[34%] flex items-center gap-[0.3125em] sm:gap-2 py-1">
					<img className="w-7 h-7 sm:h-9 sm:w-9" src={Logo} alt="Logo" />
					<Link to="/">
						<span className="text-xl sm:text-2xl font-semibold font-cinzel text-logo-cl">
							ClenchSnap
						</span>
					</Link>
				</div>
				<div
					className="w-[25%] sm:w-[10%] sm:order-3 flex items-center justify-end pr-[1em] text-[1.5rem] sm:text-[1.8rem] cursor-pointer"
					onClick={() => navigate("/settings")}
				>
					{user ? (
						<ProfilePic
							name={user.name!}
							avatar={user.avatar!}
							width="1.5rem"
							height="1.5rem"
							size="0.5rem"
						/>
					) : (
						<CgProfile color="#3a86ff" />
					)}
				</div>
				<div className="w-[100%] sm:w-[56%] flex items-center justify-center sm:justify-end sm:order-2">
					<div className="w-[90%] sm:max-w-[30rem] h-[1.6rem] sm:h-[1.8rem] bg-primary-cl rounded-md flex relative">
						<input
							className="w-[85%] bg-inherit text-gray-400 outline-none text-sm ml-3"
							type="search"
							name="search"
							placeholder="Search..."
							onChange={debounceChangeHandler}
						/>
						<button className="w-[15%] pr-[1em] flex justify-end items-center">
							<MdSearch size="1rem" color="#3a86ff" />
						</button>
						{searchedUsers.length > 0 && (
							<div
								onClick={() => {
									setSearchedUsers([]);
									setSearchedText("");
								}}
							>
								<SearchModal users={searchedUsers} />
							</div>
						)}
					</div>
				</div>
			</nav>
		</header>
	);
};

export default Navbar;
