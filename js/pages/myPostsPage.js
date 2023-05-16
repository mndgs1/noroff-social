import { getMyPosts } from "../api/posts/read.js";
import toggleLoadMoreButton from "../ui/common/toggleLoadMoreButton.js";
import { displayPosts } from "../ui/posts/postTemplate.js";
import * as listeners from "../listeners/index.js";
import toggleLoader from "../ui/common/toggleLoader.js";
import displayMessage from "../ui/common/displayMessage.js";

export async function myPostsPage() {
    listeners.searchPostsListener();
    listeners.createPostListener();
    const postList = renderPosts();
    postList();
    listeners.loadMorePosts(postList);
}

function renderPosts() {
    let offset = 0;

    return async function postList() {
        const container = "#postsContainer";

        try {
            toggleLoader(container);
            toggleLoadMoreButton();

            const posts = await getMyPosts(offset);

            offset = offset + 10;
            displayPosts(posts, container);
            toggleLoader(container);
        } catch (error) {
            displayMessage("danger", error, container);
        }
    };
}
