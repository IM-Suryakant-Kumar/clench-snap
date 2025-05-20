import { Link } from "react-router";
import { ProfilePic } from ".";
import { IUser } from "../types";

type Props = {
	users: IUser[];
};

const SearchModal: React.FC<Props> = ({ users }) => {
	// console.log(users);
	return (
		<div className="overflow-auto w-[80%] max-w-[20rem] max-h-[20rem] px-[1em] py-[0.4em] absolute top-[1.3em] left-0 right-0 mx-auto shadow-lg bg-secondary-cl">
			<div className="flex flex-col justify-center gap-[0.5em]">
				{users.map(user => (
					<Link
						className="my-[0.4em] flex items-center gap-[1em]"
						key={user._id}
						to={`/profile/${user._id}/post`}>
						<ProfilePic
							width="2rem"
							height="2rem"
							size="0.6rem"
							avatar={user.avatar!}
							name={user.name!}
						/>
						<p>{user.name}</p>
					</Link>
				))}
			</div>
		</div>
	);
};

export default SearchModal;
