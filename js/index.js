import * as pages from "./pages/index.js";

const path = window.location.pathname;
console.log(path);

switch (path) {
	case "/":
	case "/index.html":
		// pages.homePage();
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
