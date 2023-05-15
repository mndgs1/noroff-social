import { displayToast } from "../../utils/ui/displayToast.js";
import * as api from "../../api/posts/index.js";

export function deletePostListener() {
    const deleteButton = document.querySelector("[data-delete]");
    deleteButton.addEventListener("click", removePost);
}

async function removePost(event) {
    console.log(event.target);
    const urlParams = new URLSearchParams(window.location.search);

    const id = urlParams.get("id");

    const shouldDelete = confirm("Are you sure you want to delete the post with id: " + id);
    if (shouldDelete) {
        await api.deletePost(id);
        displayToast("Post deleted successfully!");
        window.location.href = "/feed/index.html";
    }
}
