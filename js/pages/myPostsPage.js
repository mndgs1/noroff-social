import * as listeners from "../listeners/index.js";
import renderPosts from "../ui/posts/renderPosts.js";
import checkValidity from "../utils/validation.js";
import { getName } from "../helpers/storage.js";

export async function myPostsPage() {
    checkValidity();
    listeners.logoutListener();
    listeners.createPostListener();
    const postList = renderPosts();
    const user = getName();
    postList(user);
    listeners.loadMorePosts(postList);
}
