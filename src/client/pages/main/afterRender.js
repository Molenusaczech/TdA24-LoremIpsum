import { initLectors } from "./filter";
import { initSlider } from "./priceSlider";

function mainAfter(lectors, tags, locations) {
    console.log("mainAfter");

    initLectors(lectors, tags, locations);
    initSlider();
}

export { mainAfter };