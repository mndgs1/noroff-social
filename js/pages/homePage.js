import { postList } from "../ui/posts/index.js";
import { deletePostListener } from "../listeners/posts/index.js";

export async function homePage() {
	await postList();
	deletePostListener();
}
