import * as apiFunctions from "../api/posts/read.js";
import { logoutListener } from "../listeners/auth/logoutListener.js";

export async function homePage() {
    const token = localStorage.getItem("token").slice(1, -1);

    const posts = await apiFunctions.getPosts(token);

    const main = document.querySelector("main");
    const container = main.querySelector(".container");

    posts.forEach((post) => {
        const el = document.createElement("div");
        el.classList.add("card");

        if (!post.author.avatar) {
            post.author.avatar = `/images/Placeholder-image.jpg`;
        }

        el.innerHTML = `<div class="card" style="width: 18rem">
    <div class="card-body" display="flex">
    <img src="${post.author.avatar}" width="32px" height="32px" />
    <p>${post.author.name}</p>
    <p class="text-muted"></p>
    </div>
    <div class="card-body">
    <h5 class="card-title">${post.title}</h5>
    <p class="card-text">${post.body}</p>
    </div>
    <div class="card-body">
    <div>${post._count.reactions}</div>
    <div>${post._count.comments}</div>
    </div>
    <div>
    </div>
    <img src="${post.media}" alt="..." />
    </div>`;
        container.appendChild(el);
    });

    logoutListener();
}
