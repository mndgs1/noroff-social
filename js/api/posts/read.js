import { BASE_URL, POST_LIMIT } from "../../constants/api.js";
import messages from "../../constants/messages.js";
import { getToken } from "../../helpers/storage.js";

export async function getPosts(offset, user) {
    let url = `${BASE_URL}/posts?_author=true&_comments=true&_reactions=true&limit=${POST_LIMIT}&offset=${offset}`;

    if (user) {
        url = `${BASE_URL}/profiles/${user}/posts?_author=true&_comments=true&_reactions=true&limit=${POST_LIMIT}&offset=${offset}`;
    }

    const token = getToken();

    const options = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await fetch(url, options);

    if (response.ok) {
        return await response.json();
    }

    throw new Error(messages.en.errors.serverError);
}

export async function getPost(id) {
    const url = `${BASE_URL}posts/${id}`;
    const response = await fetch(url);

    if (response.ok) {
        return await response.json();
    }

    throw new Error(messages.en.errors.serverError);
}
