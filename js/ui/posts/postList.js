import displayMessage from "../common/displayMessage.js";
import { getPosts } from "../../api/posts/index.js";

export async function postList() {
	try {
		const posts = await getPosts();
		renderPosts(posts);
	} catch (error) {
		console.log(error);
		displayMessage("danger", error, ".postsContainer");
	}
}

function renderPosts(posts) {
	const postsContainer = document.querySelector(".postsContainer");
	postsContainer.innerHTML = "";
	const postsHtml = posts.map((post) => createPost(post));
	postsContainer.append(...postsHtml);
}

function createPost(post) {
	const div = document.createElement("div");
	div.classList.add("post");
	const span = document.createElement("span");
	span.innerText = post.title;
	div.append(span);
	const editButton = document.createElement("a");
	editButton.classList.add("btn");
	editButton.classList.add("btn-primary");
	editButton.innerText = "Edit";
	editButton.href = `/admin/posts/edit.html?id=${post.id}`;
	div.append(editButton);
	const deleteButton = document.createElement("button");
	deleteButton.classList.add("btn");
	deleteButton.classList.add("btn-danger");
	deleteButton.innerText = "Delete";
	deleteButton.dataset.id = post.id;
	deleteButton.dataset.delete = true;
	div.append(deleteButton);
	return div;
}
