export function loadMorePosts(callback) {
    const button = document.querySelector("#loadMorePosts");

    if (button) {
        button.addEventListener("click", callback);
    }
}
