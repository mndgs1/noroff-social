import displayMessage from "../../ui/common/displayMessage.js";
import { displayToast } from "../../utils/ui/displayToast.js";
import * as api from "../../api/posts/index.js";

export function createPostListener() {
    const form = document.querySelector("#postForm");

    // TODO: add form validation
    // disable form while api call is in progress
    // some kind of spinner or indicator that the form is being submitted

    if (form) {
        form.addEventListener("submit", handleCreatePost);
    }
}
async function handleCreatePost(event) {
    event.preventDefault();
    const form = event.target;
    const data = new FormData(form);
    const title = data.get("title");
    const body = data.get("body");
    const tags = data.get("tags");
    const media = data.get("media");

    try {
        const bodyData = { title: title, body: body, tags: [tags], media: media };
        const response = await api.createPost(bodyData);
        console.log(response);
        form.reset();
        displayToast("Post created successfully!");
    } catch (error) {
        console.error(error);
        displayMessage("danger", error, "#server-message");
    }
}
