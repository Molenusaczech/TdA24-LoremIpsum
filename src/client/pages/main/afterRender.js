import { linkClick } from "../../routing";
import { initLectors } from "./filter";

function mainAfter(lectors, tags, locations) {
    console.log("mainAfter");

    lectors.forEach(element => {
        document.querySelector(`[data-uuid="${element.uuid}"]`).addEventListener("click", () => {
            console.log(element.uuid);
            //window.location.href = "/lecturer/" + element.UUID;
            linkClick("/lecturer/" + element.uuid);
        });
    });

    initLectors(lectors, tags, locations);
}

export { mainAfter };