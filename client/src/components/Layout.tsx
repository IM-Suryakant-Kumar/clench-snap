import { Outlet } from "react-router";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { usePost, useUser } from "../contexts";

const Layout = () => {
	const {
		userState: { user },
		getProfile,
	} = useUser();

	const {
		postState: { posts },
		getPosts,
	} = usePost();

	(async () => {
		!user && (await getProfile());
		!posts && (await getPosts());
	})();

	return (
		<div>
			<Outlet />
			<ToastContainer
				autoClose={1000}
				transition={Slide}
				pauseOnFocusLoss={false}
				theme="colored"
			/>
		</div>
	);
};

export default Layout;