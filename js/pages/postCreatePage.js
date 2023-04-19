import { createPostListener } from "../listeners/posts/index.js";

export async function postCreatePage() {
	createPostListener();
}
