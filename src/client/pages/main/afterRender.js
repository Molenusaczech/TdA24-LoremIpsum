import { initLectors, loadFilterSettings, filterLectors } from "./filter";
import { renderAllLecturers } from "./renderLecturers";
import { linkClick } from "../../routing";

function mainAfter(lectors, tags, locations) {
    console.log("mainAfter");

    renderAllLecturers(lectors);
    initLectors(lectors, tags, locations);
    loadFilterSettings();
    filterLectors();


    document.getElementById("GDPR").addEventListener("click", () => {
        linkClick("/gdpr");
    });

    document.getElementById("ToS").addEventListener("click", () => {
        linkClick("/tos");
    });

}

export { mainAfter };