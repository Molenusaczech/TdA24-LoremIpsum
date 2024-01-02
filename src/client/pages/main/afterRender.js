import { initLectors } from "./filter";

function mainAfter(lectors, tags, locations) {
    console.log("mainAfter");

    initLectors(lectors, tags, locations);
}

export { mainAfter };