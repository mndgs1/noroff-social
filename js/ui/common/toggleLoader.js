export default function toggleLoader(container) {
    const parent = document.querySelector(container);
    const loader = parent.querySelector("#loader");

    if (!loader) {
        const newLoader = createLoader();
        parent.append(newLoader);
    } else {
        loader.remove();
    }
}

function createLoader() {
    const div = document.createElement("div");
    div.setAttribute("id", "loader");
    div.classList.add("loader");
    div.innerText = "Loading...";
    return div;
}
