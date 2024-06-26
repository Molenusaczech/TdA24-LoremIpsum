import { linkClick } from "../../routing";
import '@material/web/slider/slider.js';
import { renderAllLecturers } from "./renderLecturers";
import { updateFiltering } from "./filterRender";
import { getFilterData } from "./getFilterData";

let lectors = []
let tags = []
let locations = []

let lastPriceMin = -1
let lastPriceMax = -1
let lastTags = []
let lastLocations = []

function initLectors(currentLectors, currentTags, currentLocations) {

    lectors = currentLectors
    /*tags = currentTags
    locations = currentLocations*/

    let filterData = getFilterData(lectors);

    tags = filterData.tags;
    locations = filterData.locations;

    updateFiltering(tags, locations);

    let priceSlider = document.getElementById("priceSlider");

    priceSlider.addEventListener("change", (change) => {
        console.log(change);
        document.getElementById("minPrice").value = priceSlider.value;
        filterLectors();
    });

    let tagReset = document.getElementById("tagReset");
    let locationReset = document.getElementById("locationReset");

    tagReset.addEventListener("click", () => {
        let tagElements = document.querySelectorAll(".tagSelect");
        tagElements.forEach(element => {
            element.classList.remove("active");
        });
        filterLectors();
    });

    locationReset.addEventListener("click", () => {
        let locationElements = document.querySelectorAll(".locationSelect");
        locationElements.forEach(element => {
            element.classList.remove("active");
        });
        filterLectors();
    }
    );

    //registerListeners(lectors);

    document.getElementById("showMoreTags").addEventListener("click", () => {
        let filterTags = document.getElementById("filterTags");
        filterTags.classList.toggle("showLess");
        document.getElementById("showMoreTags").classList.toggle("showLess");
        document.getElementById("tagGradient").classList.toggle("hidden");

        if (filterTags.classList.contains("showLess")) {
            document.getElementById("showMoreTags").innerHTML = `<span class="tagSelect">Zobrazit více dovedností </span>`;
        }
        else {
            document.getElementById("showMoreTags").innerHTML = `<span class="tagSelect">Zobrazit méně dovedností </span>`;
        }
    });

    if (tags.length < 21) {
        document.getElementById("showMoreTags").classList.add("hidden");
        document.getElementById("tagGradient").classList.add("hidden");
        document.getElementById("filterTags").classList.remove("showLess");
        
    }

    document.getElementById("showMoreLocations").addEventListener("click", () => {
        let filterTags = document.getElementById("filterLocation");
        filterTags.classList.toggle("showLess");
        document.getElementById("showMoreLocations").classList.toggle("showLess");
        document.getElementById("locationGradient").classList.toggle("hidden");

        if (filterTags.classList.contains("showLess")) {
            document.getElementById("showMoreLocations").innerHTML = `<span class="locationSelect">Zobrazit více lokací </span>`;
        }
        else {
            document.getElementById("showMoreLocations").innerHTML = `<span class="locationSelect">Zobrazit méně lokací </span>`;
        }
    });

    if (locations.length < 21) {
        document.getElementById("showMoreLocations").classList.add("hidden");
        document.getElementById("locationGradient").classList.add("hidden");
        document.getElementById("filterLocation").classList.remove("showLess");
        
    }
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

    let tagReset = document.getElementById("tagReset");
    let locationReset = document.getElementById("locationReset");

    if (tags.length == 0) {
        tagReset.style.display = "none";
    } else {
        tagReset.style.display = "inline-block";
    }

    if (locations.length == 0) {
        locationReset.style.display = "none";
    } else {
        locationReset.style.display = "inline-block";
    }

    let priceSlider = document.getElementById("priceSlider");

    console.log(priceSlider);

    // get values from material ui slider
    let minPrice = priceSlider.valueStart;
    let maxPrice = priceSlider.valueEnd;

    console.log(lectors);

    let filterLectors = [];
    let tagFilterLectors = [];

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

        if (valid) {
            tagFilterLectors.push(element);
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

        // reset tag and location filters

        let newFilterData = getFilterData(filterLectors, tagFilterLectors);

        updateFiltering(newFilterData.tags, newFilterData.locations);

        let tagElements = document.querySelectorAll(".tagSelect");
        tagElements.forEach(element => {
            if (tags.includes(element.dataset.tag)) {
                element.classList.add("active");
            } else {
                element.classList.remove("active");
            }
        });

        let locationElements = document.querySelectorAll(".locationSelect");
        locationElements.forEach(element => {
            if (locations.includes(element.dataset.location)) {
                element.classList.add("active");
            } else {
                element.classList.remove("active");
            }
        });

    });

    console.log(filterLectors);

    if (filterLectors.length == 0) {
        document.getElementById("lectors").innerHTML = "<div class='lectorListName' style='text-align: center;'>Žádní lektoři nenalezeni</div>";
        return;
    }
    //document.getElementById("lectors").innerHTML = filterLectors.map(lector => lectorTitle(lector)).join("");
    //registerListeners(filterLectors);

    renderAllLecturers(filterLectors);

    lastPriceMin = minPrice;
    lastPriceMax = maxPrice;
    lastTags = tags;
    lastLocations = locations;

}

function loadFilterSettings() {

    if (lastPriceMin == -1) {
        return;
    }

    let priceSlider = document.getElementById("priceSlider");

    priceSlider.valueStart = lastPriceMin;
    priceSlider.valueEnd = lastPriceMax;

    let tagElements = document.querySelectorAll(".tagSelect");
    tagElements.forEach(element => {
        if (lastTags.includes(element.dataset.tag)) {
            element.classList.add("active");
        } else {
            element.classList.remove("active");
        }
    });

    let locationElements = document.querySelectorAll(".locationSelect");
    locationElements.forEach(element => {
        if (lastLocations.includes(element.dataset.location)) {
            element.classList.add("active");
        } else {
            element.classList.remove("active");
        }
    });
}

export { initLectors, filterLectors, registerListeners, loadFilterSettings, tags, locations };

