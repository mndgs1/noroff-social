import { BASE_URL } from "../../constants/api.js";
import messages from "../../constants/messages.js";
import { getToken } from "../../helpers/storage.js";

export async function deletePost(id) {
    const url = `${BASE_URL}/posts/${id}`;
    const token = getToken();

    const options = {
        method: "DELETE",

        headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json; charset=UTF-8",
        },
    };

    const response = await fetch(url, options);

    console.log(response);

    if (!response.ok) {
        throw new Error(messages.en.errors.serverError);
    }
}
