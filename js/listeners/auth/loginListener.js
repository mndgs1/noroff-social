import displayMessage from "../../ui/common/displayMessage.js";
import * as auth from "../../api/authentication/auth.js";
import * as storage from "../../services/storage.js";

export function loginListener() {
    const form = document.querySelector("#loginForm");

    if (form) {
        form.addEventListener("submit", handleLogin);
    }
}
async function handleLogin(event) {
    event.preventDefault();
    const form = event.target;
    const data = new FormData(form);
    const email = data.get("email");
    const password = data.get("password");

    const button = form.querySelector("button");
    button.innerText = "Logging in...";

    const fieldset = form.querySelector("fieldset");
    fieldset.disabled = true;

    try {
        const bodyData = { email: email, password: password };
        const { name, accessToken } = await auth.authenticateUser(bodyData, "/login");
        storage.save("token", accessToken);
        storage.save("name", name);
        location.href = "/feed";
    } catch (error) {
        console.error(error);
        displayMessage("danger", error, "#message");
    } finally {
        button.innerText = "Login";
        fieldset.disabled = false;
    }
}
