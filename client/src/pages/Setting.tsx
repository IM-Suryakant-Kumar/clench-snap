import { MdOutlineModeEditOutline } from "react-icons/md";
import { useAuth, useLoading, useUser } from "../contexts";
import { useState } from "react";
import { clodinary } from "../apis";
import { toast } from "react-toastify";
import { ProfilePic } from "../components";
import { loadingWrapper } from "../utils";

const Setting = () => {
	const {
		authState: { user },
		logout,
		updateProfile,
	} = useAuth();
	const { getUsers } = useUser();
	const {
		loadingState: { loading, submitting },
		loadingStart,
		loadingStop,
		submittingStart,
		submittingStop,
	} = useLoading();

	const [imagePreview, setImagePreview] = useState<string>("");

	const handleImagePreview = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const fileList = e.target.files as FileList;
		const file = fileList[0];
		setImagePreview(URL.createObjectURL(file));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const fn = async () => {
			const formData = new FormData(e.currentTarget);
			const name = formData.get("name") as string;
			const username = formData.get("username") as string;
			// const email = formData.get("email") as string;
			let avatar: string = user?.avatar as string;
			const bio = formData.get("bio") as string;
			const website = formData.get("website") as string;
			const file = formData.get("avatar") as File;

			file && (avatar = await clodinary(file));

			await updateProfile({ name, username, avatar, bio, website });
			await getUsers();

			toast.success("Successfully Updated!");
		};

		loadingWrapper(submittingStart, submittingStop, fn);
	};

	const handleLogout = async () => {
		const fn = async () => {
			await logout();
		};
		loadingWrapper(loadingStart, loadingStop, fn);
	};

	return (
		<form
			spellCheck={false}
			className="flex flex-col items-center gap-[0.5em]"
			onSubmit={handleSubmit}
		>
			<div className="w-[80%] max-w-[25rem] h-[8rem] flex justify-center items-center mb-[2em]">
				<div className="w-[6rem] h-[6rem] relative z-0">
					<ProfilePic
						width="6rem"
						height="6rem"
						size="2rem"
						name={user?.name as string}
						avatar={imagePreview || (user?.avatar as string)}
					/>
					<input
						className="w-[1.5rem] h-[1.5rem] absolute bottom-[0.5em] right-[0.5em] z-10 rounded-full opacity-0"
						type="file"
						accept="image/png, image/jpg, image/jpeg"
						name="avatar"
						onChange={handleImagePreview}
					/>
					<div className="w-[1.5rem] h-[1.5rem] absolute bottom-[0.4em] right-[0.4em] rounded-full bg-secondary-cl text-logo-cl flex justify-center items-center">
						<MdOutlineModeEditOutline size="1rem" />
					</div>
				</div>
			</div>
			{/* name */}
			<label
				htmlFor="name"
				className="w-[80%] max-w-[25rem] pl-[0.2em] mt-[0.5em] -mb-[0.5em]"
			>
				Name
			</label>
			<input
				className="w-[80%] max-w-[25rem] py-[0.1em] outline-none border-2 border-logo-cl rounded-lg pl-[0.4em] bg-inherit"
				type="text"
				id="name"
				name="name"
				defaultValue={user?.name}
			/>
			{/* username */}
			<label
				htmlFor="username"
				className="w-[80%] max-w-[25rem] pl-[0.2em] mt-[0.5em] -mb-[0.5em]"
			>
				Username
			</label>
			<input
				className="w-[80%] max-w-[25rem] py-[0.1em] outline-none border-2 border-logo-cl rounded-lg pl-[0.4em] bg-inherit"
				type="text"
				id="username"
				name="username"
				defaultValue={user?.username}
			/>
			{/* email */}
			<label
				htmlFor="email"
				className="w-[80%] max-w-[25rem] pl-[0.2em] mt-[0.5em] -mb-[0.5em]"
			>
				Email
			</label>
			<input
				className="w-[80%] max-w-[25rem] py-[0.1em] outline-none border-2 border-logo-cl rounded-lg pl-[0.4em] bg-inherit"
				id="email"
				type="email"
				name="email"
				defaultValue={user?.email}
        disabled
			/>
			{/* Bio */}
			<label
				htmlFor="bio"
				className="w-[80%] max-w-[25rem] pl-[0.2em] mt-[0.5em] -mb-[0.5em]"
			>
				Bio
			</label>
			<textarea
				className="w-[80%] max-w-[25rem] py-[0.1em] outline-none border-2 border-logo-cl rounded-lg pl-[0.4em] bg-inherit resize-none"
				id="bio"
				name="bio"
				defaultValue={user?.bio}
			/>
			{/* Website */}
			<label
				htmlFor="bio"
				className="w-[80%] max-w-[25rem] pl-[0.2em] mt-[0.5em] -mb-[0.5em]"
			>
				Website
			</label>
			<input
				className="w-[80%] max-w-[25rem] py-[0.1em] outline-none border-2 border-logo-cl rounded-lg pl-[0.4em] bg-inherit"
				id="website"
				type="text"
				name="website"
				defaultValue={user?.website}
			/>
			<button
				type="submit"
				className="w-[80%] h-[2rem] max-w-[25rem] bg-logo-cl text-primary-cl rounded-lg mt-[2.5em] mb-[0.4em]"
				disabled={submitting}
			>
				{submitting ? "SAVING..." : "SAVE"}
			</button>
			<button
				className="w-[80%] h-[2rem] max-w-[25rem] bg-logo-cl text-primary-cl rounded-lg"
				onClick={handleLogout}
				disabled={loading}
			>
				{loading ? "Logging out..." : "Logout"}
			</button>
		</form>
	);
};

export default Setting;
