import * as pages from "./pages/index.js";

const path = window.location.pathname;
console.log(path);

switch (path) {
    case "/":
    case "/index.html":
    case "/profile/login/index.html":
        pages.loginPage();
        break;
    case "/admin/posts/create.html":
        pages.postCreatePage();
        break;
    case "/admin/posts/edit.html":
        pages.postEditPage();
        break;
    default:
        pages.notFoundPage();
}
