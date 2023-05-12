export default function toggleLoadMoreButton(hideButton = true) {
    const button = document.querySelector("#loadMorePosts");

    if (button && hideButton) {
        return button.classList.add("d-none");
    }

    if (button && !hideButton) {
        return button.classList.remove("d-none");
    }
}
