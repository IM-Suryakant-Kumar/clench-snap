import { Outlet } from "react-router";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = () => (
	<>
		<Outlet />
		<ToastContainer
			autoClose={1000}
			transition={Slide}
			pauseOnFocusLoss={false}
			theme="colored"
		/>
	</>
);

export default Layout;
