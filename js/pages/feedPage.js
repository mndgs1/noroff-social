import * as listeners from "../listeners/index.js";
import renderPosts from "../ui/posts/renderPosts.js";
import checkValidity from "../utils/validation.js";

export async function homePage() {
    checkValidity();
    listeners.logoutListener();
    listeners.searchPostsListener();
    listeners.createPostListener();
    const postList = renderPosts();
    postList();
    listeners.loadMorePosts(postList);
}
