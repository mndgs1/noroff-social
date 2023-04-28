import { authenticateUser } from "../../api/authentication/auth.js";

/**
 * Takes form inputs and sends them to API for user authentication
 * @param {string} formId id of the form
 * @param {string} type type of action
 * ```js
 * //user login
 * const formId = "loginForm";
 * const type = "login"
 * setAuthenticationFormListener(formId, type);
 * //gathers form data and sends it to the API to login user
 * ```
 */

export default function setAuthenticationFormListener(formId, type) {
    const form = document.querySelector(`#${formId}`);

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const form = event.target;

        const formData = new FormData(form);

        const profile = Object.fromEntries(formData.entries());

        console.log(profile);

        authenticateUser(profile, `/${type}`);
    });
}
