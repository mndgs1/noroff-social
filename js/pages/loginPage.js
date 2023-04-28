import checkValidity from "../utils/validation.js";
import setAuthenticationFormListener from "../listeners/auth/authentication.js";

export async function loginPage() {
    checkValidity();
    setAuthenticationFormListener("loginForm", "login");
    setAuthenticationFormListener("registerForm", "register");
}
