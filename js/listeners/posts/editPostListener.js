import displayMessage from "../../ui/common/displayMessage.js";
import { displayToast } from "../../utils/ui/displayToast.js";
import * as api from "../../api/posts/index.js";

export function editPostListener() {
    const form = document.querySelector("#postEditForm");

    if (form) {
        form.addEventListener("submit", handleEditPost);
    }
}
async function handleEditPost(event) {
    event.preventDefault();
    const form = event.target;
    const data = new FormData(form);
    const title = data.get("title");
    const body = data.get("body");
    const tags = data.get("tags");
    const media = data.get("media");

    const urlParams = new URLSearchParams(window.location.search);

    const id = urlParams.get("id");

    try {
        const bodyData = { title: title, body: body, tags: [tags], media: media };
        const response = await api.editPost(bodyData, id);
        console.log(response);
        form.reset();
        window.location.href = "/feed/index.html";
        displayToast("Post edited successfully!");
    } catch (error) {
        console.error(error);
        displayMessage("danger", error, "#server-message");
    }
}
