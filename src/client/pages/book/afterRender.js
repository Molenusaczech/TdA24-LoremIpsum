import { linkClick } from "../../routing";


function bookAfter() {
    document.getElementById("backButton").addEventListener("click", () => {
        linkClick("/");
    });
}

export { bookAfter };