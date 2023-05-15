import { isLoggedIn } from "./storage.js";

export function redirectBasedOnLogin(pathname) {
    if (isLoggedIn()) {
        if (pathname === "/index.html" || pathname === "/") {
            location.href = "/feed/index.html";
        }
    } else {
        if (pathname === "/feed/" || pathname === "/feed/index.html") {
            location.href = "index.html";
        }
    }
}
