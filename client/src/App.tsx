import { RouterProvider, createBrowserRouter } from "react-router";
import { AuthLayout, HostLayout, Layout } from "./components";
import {
	Explore,
	Home,
	Landing,
	Login,
	NotFound,
	Post,
	Profile,
	ProfileLikedPost,
	ProfilePost,
	ProfileSavedPost,
	Setting,
	Signup,
} from "./pages";

function App() {
	const router = createBrowserRouter([
		{
			Component: Layout,
			children: [
				{ path: "/", Component: Landing },
				{
					Component: HostLayout,
					children: [
						{ path: "home", Component: Home },
						{ path: "explore", Component: Explore },
						{
							Component: Profile,
							children: [
								{ path: "profile/:username/post", Component: ProfilePost },
								{
									path: "profile/:username/liked",
									Component: ProfileLikedPost,
								},
								{
									path: "profile/:username/saved",
									Component: ProfileSavedPost,
								},
							],
						},
						{ path: "settings", Component: Setting },
						{ path: "post/:postId", Component: Post },
					],
				},
				{
					Component: AuthLayout,
					children: [
						{ path: "login", Component: Login },
						{ path: "signup", Component: Signup },
					],
				},
			],
		},
		{ path: "*", Component: NotFound },
	]);

	return <RouterProvider router={router} />;
}

export default App;
