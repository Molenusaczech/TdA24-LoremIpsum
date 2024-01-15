import { initLectors, loadFilterSettings, filterLectors } from "./filter";
import { renderAllLecturers } from "./renderLecturers";

function mainAfter(lectors, tags, locations) {
    console.log("mainAfter");

    renderAllLecturers(lectors);
    initLectors(lectors, tags, locations);
    loadFilterSettings();
    filterLectors();
}

export { mainAfter };