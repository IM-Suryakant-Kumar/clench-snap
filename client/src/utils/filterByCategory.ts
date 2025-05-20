import { IPost } from "../types";

export const filteredByCategory = (posts: IPost[], cat: string) => {
	let filteredPosts: IPost[] = posts.map(p => p);

	cat === "recent" && (filteredPosts = filteredPosts.reverse());
	cat === "older" && (filteredPosts = posts);
	cat === "trending" &&
		(filteredPosts = filteredPosts?.sort(
			(a, b) => (b.liked?.length ?? 1) - (a.liked?.length ?? 1)
		));

	return filteredPosts;
};
