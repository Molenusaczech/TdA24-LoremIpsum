import { linkClick } from "../../routing";

function lecturerAfter() {
    document.getElementById("backButton").addEventListener("click", () => {
        linkClick("/");
    });
}

export { lecturerAfter };