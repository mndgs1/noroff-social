import { displayToast } from "../../utils/ui/displayToast.js";
import * as api from "../../api/posts/index.js";

export function deletePostListener() {
	const buttons = document.querySelectorAll("[data-delete]");
	console.log(buttons);
	buttons.forEach((button) => button.addEventListener("click", removePost));
}

async function removePost(event) {
	console.log(event.target);
	const { id } = event.target.dataset;
	const shouldDelete = confirm("Are you sure you want to delete the post with id: " + id);
	if (shouldDelete) {
		await api.deletePost(id);
		event.target.parentElement.remove();
		displayToast("Post deleted successfully!");
	}
}
