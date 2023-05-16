import toggleLoadMoreButton from "../common/toggleLoadMoreButton.js";
import { getName } from "../../helpers/storage.js";

export function displayPosts(posts, container) {
    const parent = document.querySelector(container);
    const postHtml = posts.map((post) => createPost(post));
    parent.append(...postHtml);
    if (posts.length === 10) {
        toggleLoadMoreButton(false);
    }
}

export function createPost(post) {
    const anchor = document.createElement("a");
    anchor.href = `/feed/post.html?id=${post.id}`;
    const el = document.createElement("div");
    el.classList.add("card");

    if (!post.author.avatar) {
        post.author.avatar = `/images/Portrait_Placeholder.png`;
    }

    const body = document.createElement("div");
    body.classList.add("card-body");

    const profileContainer = document.createElement("div");
    profileContainer.classList.add("profile-container");

    const profile = document.createElement("div");
    profile.classList.add("profile");

    const authorImg = document.createElement("img");
    authorImg.src = post.author.avatar;
    authorImg.classList.add("avatar");

    const authorName = document.createElement("p");
    authorName.innerText = post.author.name;
    authorName.classList.add("author-name");

    const postTitle = document.createElement("h5");
    postTitle.innerText = post.title;
    postTitle.classList.add("card-title");

    const cardText = document.createElement("p");
    cardText.innerText = post.body;
    cardText.classList.add("card-text");

    const comments = document.createElement("a");
    comments.setAttribute("data-bs-toggle", "modal");
    comments.setAttribute("data-bs-target", `#commentsModal${post.id}`);
    comments.innerText = `${post._count.comments} comments`;

    el.appendChild(body);
    body.appendChild(profileContainer);
    profileContainer.appendChild(profile);
    profile.appendChild(authorImg);
    profile.appendChild(authorName);
    body.appendChild(postTitle);
    body.appendChild(cardText);
    body.appendChild(comments);

    if (post.media) {
        const img = document.createElement("img");
        img.classList.add("post-media");
        img.src = post.media;
        el.appendChild(img);
    }

    if (post.author.name === getName()) {
        const edit = document.createElement("a");
        edit.innerText = "Edit post";
        edit.classList.add("btn", "btn-primary");
        edit.href = `../../../admin/posts/edit.html?id=${post.id}`;
        el.appendChild(edit);
    }

    anchor.appendChild(el);
    return anchor;
}
