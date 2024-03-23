import { linkClick } from "../../routing";

function detailAfter() {
    // Do something after the activity is rendered
    document.getElementById("backButton").addEventListener("click", () => {
        linkClick("/");
    });
}

export { detailAfter };