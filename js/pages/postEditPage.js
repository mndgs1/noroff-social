import { getPost } from "../api/posts/read.js";
import * as listeners from "../listeners/index.js";

export async function postEditPage() {
    console.log("edit page");

    const urlParams = new URLSearchParams(window.location.search);

    const id = urlParams.get("id");

    const post = await getPost(id);

    const title = document.querySelector("#title");
    title.value = post.title;

    const body = document.querySelector("#postBody");
    body.value = post.body;

    const tags = document.querySelector("#tags");
    tags.value = post.tags[0];

    const media = document.querySelector("#media");
    media.value = post.media;

    listeners.editPostListener();
    listeners.deletePostListener();

    // get the id from the qury string
    // if there is no id, redirect to some other page
    // get the post from the api using the id
    // populate the form inputs with the properties from the json response
    // add a submit event listener to the form
    // call the updatePost function from the api
}
