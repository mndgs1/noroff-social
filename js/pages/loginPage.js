import checkValidity from "../utils/validation.js";
import setAuthenticationFormListener from "../listeners/auth/authentication.js";
import { loginListener } from "../listeners/auth/loginListener.js";

export async function loginPage() {
    checkValidity();
    loginListener();
    setAuthenticationFormListener("registerForm", "register");
    setAuthenticationFormListener("loginForm", "login");
}
