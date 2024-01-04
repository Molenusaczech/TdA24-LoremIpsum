import { lectorTitle } from "./renderer"
import { linkClick } from "../../routing";
import '@material/web/slider/slider.js';

let lectors = []
let tags = []
let locations = []

function initLectors(currentLectors, currentTags, currentLocations) {
    lectors = currentLectors
    tags = currentTags
    locations = currentLocations

    locations.forEach(element => {
        element = element.location
        element = document.querySelector(`[data-location="${element}"]`);
        console.log(element);
        element.addEventListener("click", () => {
            console.log(element);
            if (element.classList.contains("active")) {
                element.classList.remove("active");
            } else {
                element.classList.add("active");
            }
            filterLectors();
        });
    });

    tags.forEach(element => {
        element = element.uuid
        element = document.querySelector(`[data-tag="${element}"]`);
        console.log(element);
        element.addEventListener("click", () => {
            console.log(element);
            if (element.classList.contains("active")) {
                element.classList.remove("active");
            } else {
                element.classList.add("active");
            }
            filterLectors();
        });
    });

    let priceSlider = document.getElementById("priceSlider");

    priceSlider.addEventListener("change", (change) => {
        console.log(change);
        document.getElementById("minPrice").value = priceSlider.value;
        filterLectors();
    });

    registerListeners(lectors);
}

function registerListeners(lectors) {
    lectors.forEach(element => {
        document.querySelector(`[data-uuid="${element.uuid}"]`).addEventListener("click", () => {
            console.log(element.uuid);
            //window.location.href = "/lecturer/" + element.UUID;
            linkClick("/lecturer/" + element.uuid);
        });
    });
}

function filterLectors() {
    let tagElements = document.querySelectorAll(".tagSelect.active");

    let tags = [];
    tagElements.forEach(element => {
        tags.push(element.dataset.tag);
    });

    let locationElements = document.querySelectorAll(".locationSelect.active");
    let locations = [];
    locationElements.forEach(element => {
        locations.push(element.dataset.location);
    });

    let priceSlider = document.getElementById("priceSlider");

    console.log(priceSlider);

    // get values from material ui slider
    let minPrice = priceSlider.valueStart;
    let maxPrice = priceSlider.valueEnd;

    console.log(lectors);

    let filterLectors = [];

    lectors.forEach(element => {
        let valid = true;

        if (tags.length > 0) {
            let lectorTags = element.tags.map(tag => tag.uuid);

            console.log(lectorTags);
            console.log(tags);

            tags.forEach(tag => {
                if (!lectorTags.includes(tag)) {
                    //console.log("tag not found");
                    //console.log(tag);
                    valid = false;
                }
            });
        }

        if (locations.length > 0) {
            //valid = locations.includes(element.location);
            if (!locations.includes(element.location)) {
                valid = false;
            }
        }

        console.log(minPrice);
        console.log(maxPrice);
        console.log(element.price_per_hour);

        if (minPrice > element.price_per_hour) {
            valid = false;
        }
            
        if (maxPrice < element.price_per_hour) {
            valid = false;
        }

        if (valid) {
            filterLectors.push(element);
        }
    });

    console.log(filterLectors);

    document.getElementById("lectors").innerHTML = filterLectors.map(lector => lectorTitle(lector)).join("");
    registerListeners(filterLectors);

}


export { initLectors, filterLectors };

