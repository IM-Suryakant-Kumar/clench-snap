import { Link, useLocation } from "react-router";
import { useAuth, useLoading } from "../contexts";
import { loadingWrapper } from "../utils";

const Login = () => {
	const {
		authState: { message: errorMessage },
		login,
	} = useAuth();
	const state = useLocation().state;
	const pathname = state?.redirectTo;
	const message = errorMessage || state?.message;
	const {
		loadingState: { loading, submitting },
		submittingStart,
		submittingStop,
		loadingStart,
		loadingStop,
	} = useLoading();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const fn = async () => {
			const formData = new FormData(e.currentTarget);
			const email = formData.get("email") as string;
			const password = formData.get("password") as string;
			await login({ email, password });
		};

		loadingWrapper(submittingStart, submittingStop, fn);
	};

	const handleGuestLogin = async () => {
		const fn = async () => {
			const cred = { email: "clenchsnap@gmail.com", password: "secret" };
			await login(cred);
		};

		loadingWrapper(loadingStart, loadingStop, fn);
	};

	return (
		<div className="min-h-screen flex justify-center items-center">
			<form
				className="w-[90%] max-w-[24rem] bg-secondary-cl flex flex-col gap-[1em] py-[2em] px-[1em] rounded-md"
				onSubmit={handleSubmit}
			>
				<h1 className="text-2xl font-semibold font-cinzel text-center text-logo-cl mb-[1em]">
					Log In
				</h1>
				{/* messages */}
				{message && (
					<span className="text-red-500 text-center text-sm">{message}</span>
				)}
				<input
					className="outline-none border-b-2 border-logo-cl bg-inherit"
					type="email"
					name="email"
					placeholder="email"
				/>
				<input
					className="outline-none border-b-2 border-logo-cl bg-inherit"
					type="password"
					name="password"
					placeholder="password"
				/>
				<button
					className="w-full h-[2rem] bg-logo-cl text-sm text-primary-cl rounded-md mt-[2em]"
					disabled={submitting}
				>
					{submitting ? "Logging in..." : "Log in"}
				</button>
				<button
					type="button"
					className="w-full h-[2rem] bg-blue-400 text-sm text-primary-cl rounded-md -mt-[0.5em]"
					onClick={handleGuestLogin}
					disabled={loading}
				>
					{loading ? "Guest Loging in..." : "Guest Login"}
				</button>
				<span className="text-sm text-gray-400 text-center mt-[1em]">
					Don't have an account?&nbsp;
					<Link to={`/signup?redirectTo=${pathname}`} className="text-logo-cl">
						Create now
					</Link>{" "}
				</span>
			</form>
		</div>
	);
};

export default Login;
