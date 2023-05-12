export function searchPostsListener() {
    const form = document.querySelector("#searchForm");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        console.log("works");
    });
}
