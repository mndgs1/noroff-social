import { searchPosts } from "../../api/posts/read.js";
import toggleLoadMoreButton from "../../ui/common/toggleLoadMoreButton.js";
import { displayPosts } from "../../ui/posts/postTemplate.js";

export function searchPostsListener() {
    const form = document.querySelector("#searchForm");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        populateSearch();
    });
}

async function populateSearch() {
    const input = document.querySelector('input[type="search"]');
    const tag = input.value;
    const posts = await searchPosts(tag);
    const container = document.querySelector("#postsContainer");
    container.innerHTML = "";
    displayPosts(posts, "#postsContainer");
    toggleLoadMoreButton();
}
