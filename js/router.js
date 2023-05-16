import * as pages from "./pages/index.js";
import { redirectBasedOnLogin } from "./helpers/auth.js";

export default function router() {
    const path = window.location.pathname;
    console.log(path);

    redirectBasedOnLogin(path);

    switch (path) {
        case "/":
        case "/index.html":
            pages.loginPage();
            break;
        case "/feed/index.html":
        case "/feed/":
            pages.feedPage();
            break;
        case "/admin/posts/create.html":
            pages.postCreatePage();
            break;
        case "/admin/posts/edit.html":
            pages.postEditPage();
            break;
        case "/feed/post.html":
            pages.postPage();
            break;
        case "/feed/myPosts.html":
            pages.myPostsPage();
            break;
        default:
            pages.notFoundPage();
    }
}
