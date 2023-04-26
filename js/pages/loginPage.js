import checkValidity from "../utils/validation.js";
import setRegisterFormListener from "../listeners/forms/register.js";

export async function loginPage() {
    checkValidity();
    setRegisterFormListener();
}
