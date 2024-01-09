import { initLectors } from "./filter";
import { initSlider } from "./priceSlider";
import { renderAllLecturers } from "./renderLecturers";

function mainAfter(lectors, tags, locations) {
    console.log("mainAfter");

    renderAllLecturers(lectors);
    initLectors(lectors, tags, locations);
    initSlider();
}

export { mainAfter };