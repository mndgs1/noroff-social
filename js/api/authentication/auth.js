import { BASE_URL, AUTHENTICATE } from "../../constants/api.js";
// import messages from "../../constants/messages.js";

/**
 *Sends an API request to register/login user
 * @param {object} data {name, email, password} for registration; {name,password} for login
 *
 * @param {string} type "/login" or "/register"
 * ```js
 * //Register User
 * const user = {
 * name: "Johny",
 * email: "Johny@theman.com",
 * password: "Bravo123",}
 * const type = "/register";
 *
 * authenticateUser(user,type);
 *```
 */

export async function authenticateUser(data, type) {
    const url = `${BASE_URL}${AUTHENTICATE}${type}`;
    let result;

    const options = {
        body: JSON.stringify(data),
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    };

    const response = await fetch(url, options);

    result = await response.json();
    console.log(result);

    if (!response.ok) {
        console.log(result.errors[0].message);
        throw new Error(result.errors[0].message);
    }
    return result;
}
