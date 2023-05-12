import { isLoggedIn } from "./storage.js";

export function redirectBasedOnLogin(pathname) {
    if (isLoggedIn()) {
        if (pathname === "/profile/login/index.html" || pathname === "/index.html" || pathname === "/") {
            console.log("foo");
            location.href = "/feed/index.html";
        }
    } else {
        if (pathname === "/feed/" || pathname === "/feed/index.html") {
            location.href = "/profile/login/index.html";
            console.log("moo");
        }
    }
}
