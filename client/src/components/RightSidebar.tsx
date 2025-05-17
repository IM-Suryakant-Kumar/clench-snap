import { Link } from "react-router";
import { useLoading, useUser } from "../contexts";
import { ProfilePic } from ".";
import { IUser } from "../types";
import { loadingWrapper } from "../utils";

const RightSidebar = () => {
	const {
		userState: { users, user },
		getAllUser,
		updateProfile,
	} = useUser();

	const {
		loadingState: { loading },
		loadingStart,
		loadingStop,
	} = useLoading();

	!users && (async () => getAllUser())();

	const usersLength = users?.length || 0;

	const randomIdx = Math.floor(Math.random() * usersLength);
	const startIdx = randomIdx === usersLength ? randomIdx - 8 : randomIdx / 2;
	const endIdx = startIdx + 8;

	const filteredUsers = users?.filter(item => item._id !== user?._id);

	const handleFollowing = async (item: IUser) => {
		const fn = async () => {
			// followers
			const followers = item.followers.includes(user?._id as string)
				? item.followers.filter(userId => userId !== user?._id)
				: [...item.followers, user?._id];

			await updateProfile({
				_id: item._id,
				followers,
			} as IUser);

			// followings
			const followings = user?.followings.includes(item._id)
				? user.followings.filter(userId => item._id !== userId)
				: [...(user?.followings as string[]), item._id];

			await updateProfile({
				_id: user?._id,
				followings,
			} as IUser);
		};

		loadingWrapper(loadingStart, loadingStop, fn);
	};

	return (
		<div className="w-[32%] fixed top-[5em] right-0 p-2">
			<div className="w-[15rem] mx-auto">
				<p className="text-lg text-center text-gray-400">You might like</p>
				{filteredUsers?.slice(startIdx, endIdx).map((item, idx) => (
					<div
						key={idx}
						className="flex items-center justify-between gap-[0.5em] border-b-[1px] border-gray-400 text-logo-cl">
						<Link
							to={`/profile/${item.username}/post`}
							className="flex items-center gap-[1em] my-[0.5em]">
							<ProfilePic
								width="2.5rem"
								height="2.5rem"
								size="1em"
								name={item.fullname}
								avatar={item.avatar}
							/>
							<span>{item.fullname}</span>
						</Link>
						<button
							disabled={loading}
							onClick={async () => await handleFollowing(item)}>
							{user?.followings?.includes(item._id) ? "Following" : "follow"}
						</button>
					</div>
				))}
			</div>
		</div>
	);
};

export default RightSidebar;
