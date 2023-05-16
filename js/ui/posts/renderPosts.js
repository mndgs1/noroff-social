import displayMessage from "../common/displayMessage.js";
import toggleLoader from "../common/toggleLoader.js";
import toggleLoadMoreButton from "../common/toggleLoadMoreButton.js";
import { getPosts } from "../../api/posts/read.js";
import { displayPosts } from "./postTemplate.js";

export default function renderPosts() {
    let offset = 0;

    return async function postList() {
        const container = "#postsContainer";

        try {
            toggleLoader(container);
            toggleLoadMoreButton();

            const posts = await getPosts(offset);

            offset = offset + 10;
            displayPosts(posts, container);
            toggleLoader(container);
        } catch (error) {
            displayMessage("danger", error, container);
        }
    };
}
