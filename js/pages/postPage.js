import { getPost } from "../api/posts/read.js";

export async function postPage() {
    const queryString = window.location.search;

    const params = new URLSearchParams(queryString);

    const id = params.get("id");

    const post = await getPost(id);

    const title = document.querySelector(".post-title");
    title.innerHTML = post.title;

    const body = document.querySelector(".post-body");
    body.innerHTML = post.body;

    const tagsContainer = document.querySelector(".post-tags");
    post.tags.forEach((tag) => {
        const tagContainer = document.createElement("div");
        tagContainer.innerHTML = tag;
        tagsContainer.appendChild(tagContainer);
    });

    const comments = document.querySelector(".comments");
    comments.innerHTML = `${post._count.comments} comments`;

    const reactions = document.querySelector(".reactions");
    reactions.innerHTML = `${post._count.reactions} reactions`;

    if (post.media) {
        const postContainer = document.querySelector(".post-container");

        const img = document.createElement("img");
        img.classList.add("img-fluid");
        img.src = post.media;

        postContainer.appendChild(img);
    }
}
