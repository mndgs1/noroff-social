import * as storage from "../../services/storage.js";

export function logoutListener() {
    const logoutButton = document.querySelector("#logoutButton");

    logoutButton.addEventListener("click", () => {
        storage.remove("token");
        storage.remove("name");
        // location.href = "/profile/login/index.html";
    });
}
