import { linkClick } from "../../routing";
import { renderTimes } from "./renderer";

function bookAfter() {
    document.getElementById("backButton").addEventListener("click", () => {
        linkClick("/");
    });

    renderTimes();
}

export { bookAfter };