import { linkClick } from "../../routing";

function successAfter(data) {
    document.getElementById("backButton").addEventListener("click", () => {
        linkClick("/");
    });

    document.getElementById("reserveNextButton").addEventListener("click", () => {
        linkClick("/book/" + data.lector_uuid);
    });

    document.getElementById("homepageButton").addEventListener("click", () => {
        linkClick("/");
    });
}

export { successAfter };