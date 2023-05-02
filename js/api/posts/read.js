import { BASE_URL } from "../../constants/api.js";
import messages from "../../constants/messages.js";

export async function getPosts(token) {
    const url = `${BASE_URL}/posts?_author=true&_comments=true&_reactions=true`;

    console.log(token);
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
