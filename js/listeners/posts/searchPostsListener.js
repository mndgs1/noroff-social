import { searchPosts } from "../../api/posts/read.js";

export function searchPostsListener() {
    const form = document.querySelector("#searchForm");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        console.log("works");
        populateSearch();
    });
}

async function populateSearch() {
    const input = document.querySelector('input[type="search"]');
    const tag = input.value;
    const posts = await searchPosts(tag);
    console.log(posts);
}
