import { linkClick } from "../../routing";
function notFoundAfter() {
    console.log("notFoundAfter");

    document.getElementById("backButton").addEventListener("click", () => {
        linkClick("/");
    });
}

export { notFoundAfter };