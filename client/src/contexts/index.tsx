import { LoadingContextProvider } from "./Loading";
import { UserContextProvider } from "./User";
import { PostContextProvider } from "./Post";
import { PostModalContextProvider } from "./PostModal";
import { AuthContextProvider } from "./Auth";
import { CommentContextProvider } from "./Comment";

type Props = {
	children: React.ReactNode;
};

const MainContextProvider: React.FC<Props> = ({ children }) => {
	return (
		<LoadingContextProvider>
			<AuthContextProvider>
				<UserContextProvider>
					<PostContextProvider>
						<PostModalContextProvider>
							<CommentContextProvider>
                {children}
              </CommentContextProvider>
						</PostModalContextProvider>
					</PostContextProvider>
				</UserContextProvider>
			</AuthContextProvider>
		</LoadingContextProvider>
	);
};

export { useLoading } from "./Loading";
export { useAuth } from "./Auth";
export { useUser } from "./User";
export { usePost } from "./Post";
export { useComment } from "./Comment";
export { usePostModal } from "./PostModal";
export default MainContextProvider;
