import { LoaderFunctionArgs, Outlet, redirect } from "react-router";
import { getLoggedInUser } from "../apis";

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const searchParams = new URL(request.url).searchParams;
	const pathname = searchParams.get("redirectTo") || "/";
	const data = await getLoggedInUser();
	return data.success ? redirect(pathname) : null;
};

const AuthLayout = () => {
	return <Outlet />;
};

export default AuthLayout;
