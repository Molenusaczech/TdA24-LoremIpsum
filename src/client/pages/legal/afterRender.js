import { linkClick } from "../../routing";

function LegalAfter() {
    document.getElementById("backButton").addEventListener("click", () => {
        linkClick("/");
    });
}

export { LegalAfter };