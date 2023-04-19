import { BASE_URL } from "../../constants/api.js";
import messages from "../../constants/messages.js";

export async function getPosts() {
	const url = `${BASE_URL}posts`;
	const response = await fetch(url);

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
