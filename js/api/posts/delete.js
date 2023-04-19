import { BASE_URL } from "../../constants/api.js";

export async function deletePost(id) {
	const url = `${BASE_URL}posts/${id}`;
	const options = { method: "DELETE" };
	await fetch(url, options);
}
