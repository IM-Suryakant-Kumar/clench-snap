import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "../../contexts";

const AuthLayout = () => {
	const pathname = useLocation().state?.redirectTo || "/home";
	const {
		authState: { user },
	} = useAuth();

	return user ? <Navigate to={pathname} replace /> : <Outlet />;
};

export default AuthLayout;
