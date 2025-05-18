import { Navigate, Outlet, useLocation } from "react-router";
import { Navbar, PostModal, Sidebar } from "..";
import { useAuth } from "../../contexts";

const HostLayout = () => {
	const pathname = useLocation().pathname;
	const {
		authState: { user },
	} = useAuth();

	return user ? (
		<div className="min-h-screen">
			<Navbar />
			<Sidebar />
			<div className="mt-[6em] mb-[4em] sm:mb-0 sm:w-[cacl(100%-10rem)] sm:ml-[10em] sm:mt-[5em]">
				<Outlet />
				<PostModal />
			</div>
		</div>
	) : (
		<Navigate
			to="/login"
			state={{ message: "You must login first.", redirectTo: pathname }}
			replace
		/>
	);
};

export default HostLayout;
