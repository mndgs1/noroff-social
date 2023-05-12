import displayMessage from "../common/displayMessage.js";
import toggleLoader from "../common/toggleLoader.js";
import toggleLoadMoreButton from "../common/toggleLoadMoreButton.js";
import { getPosts } from "../../api/posts/read.js";
import { getName } from "../../helpers/storage.js";

export default function renderPosts() {
    let offset = 0;

    return async function postList(user) {
        const container = "#postsContainer";

        try {
            toggleLoader(container);
            toggleLoadMoreButton();

            let posts;

            if (user) {
                posts = await getPosts(offset, user);
            } else {
                posts = await getPosts(offset);
            }

            offset = offset + 10;
            displayPosts(posts, container);
            toggleLoader(container);
        } catch (error) {
            displayMessage("danger", error, container);
        }
    };
}

function displayPosts(posts, container) {
    const parent = document.querySelector(container);
    const postHtml = posts.map((post) => createPost(post));
    parent.append(...postHtml);
    if (posts.length === 10) {
        toggleLoadMoreButton(false);
    }
}

function createPost(post) {
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

    const modalsContainer = document.createElement("div");
    modalsContainer.innerHTML = `
    <div class="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" id="editPostModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content rounded-4 shadow">
            <div class="modal-header p-5 pb-4 border-bottom-0">
                <h1 class="fw-bold mb-0 fs-2">Edit Post</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div class="modal-body p-5 pt-0">
                <form class="needs-validation" id="postEditForm" novalidate>
                    <!--  -->
                    <div class="mb-3">
                        <label for="title" class="form-label">Title:</label>
                        <input type="text" name="title" class="rounded-3 form-control form-control-lg" id="editTitle" placeholder="" aria-label="Post title" minlength="4" required />
                        <div class="invalid-feedback">Title must contain a character</div>
                    </div>
                    <div class="mb-3">
                        <label for="postBody" class="form-label">Body:</label>
                        <textarea name="body" class="form-control" id="editBody" rows="3"></textarea>
                    </div>
                    <div class="mb-3">
                        <label for="tags" class="form-label">Tags:</label>
                        <input name="tags" type="text" name="tags" class="form-control form-control-lg rounded-3" id="editTags" placeholder="" aria-label="Tags" />
                    </div>
                    <div class="mb-3">
                        <label for="media" class="form-label">Media url:</label>
                        <input name="media" type="text" name="media" class="form-control form-control-lg rounded-3" id="editMedia" placeholder="" aria-label="Tags" />
                    </div>
                    <button class="mb-2 btn rounded-3 btn-primary" type="submit">Edit Post</button>
                    <button class="mb-2 btn rounded-3 btn-danger" type="button">Delete Post</button>
                </form>
            </div>
        </div>
    </div>
</div>
    <div class="modal fade" id="commentsModal${post.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">${post.id}</div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
            </div>
        </div>
    </div>
 `;

    el.appendChild(body);
    body.appendChild(profileContainer);
    profileContainer.appendChild(profile);
    profile.appendChild(authorImg);
    profile.appendChild(authorName);
    body.appendChild(postTitle);
    body.appendChild(cardText);
    body.appendChild(comments);

    if (post.reactions.length > 0) {
        const reactions = document.createElement("div");
        reactions.classList.add("reactions");

        const json = JSON.stringify(post.reactions);

        const regex = /[\u{1F300}-\u{1F5FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{1F910}-\u{1F93F}\u{1F980}-\u{1F9E0}]/gu;

        // const emojis = json.match(regex);

        // const emojiString = emojis.join("");
        // const codePoint = post.reactions.symbol.codePointAt(0); // returns 128522
        // const encodedStr = `&#x${codePoint.toString(16)};`; // encodes the code point as HTML

        // reactions.innerText = emojiString + post._count.reactions;
        body.appendChild(reactions);
    }

    if (post.media) {
        const img = document.createElement("img");
        img.classList.add("post-media");
        img.src = post.media;
        el.appendChild(img);
    }

    if (getName() === post.author.name) {
        const editEl = document.createElement("a");
        editEl.setAttribute("data-bs-toggle", "modal");
        editEl.setAttribute("data-bs-target", "#editPostModal");
        const editIcon = document.createElement("i");
        editEl.classList.add("fa-solid", "fa-pen-to-square", "fa-2xl");
        editEl.appendChild(editIcon);
        profileContainer.appendChild(editEl);
        // <button type="button" class="btn btn btn-primary" data-bs-toggle="modal" data-bs-target="#createPostModal">Create Post</button>
        openEditPostListner(post, editEl);
    }

    body.appendChild(modalsContainer);

    return el;
}

function openEditPostListner(post, editEl) {
    editEl.addEventListener("click", (e) => {
        const postTitle = document.querySelector("#editTitle");
        console.log(postTitle);
        console.log(post.title);
        postTitle.value = post.title;
        const postBody = document.querySelector("#editBody");
        postBody.value = post.body;
        const postTags = document.querySelector("#editTags");
        post.tags.forEach((tag) => {
            postTags.value = tag;
        });
        // postTags.innerText = ;
        const postMedia = document.querySelector("#editMedia");
        postMedia.value = post.media;
    });
}
