import { lectorTitle } from "./renderer"
import { linkClick } from "../../routing";

let lectors = []
let tags = []
let locations = []
let page = 1

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

    let minPrice = document.getElementById("minPrice").value;
    let maxPrice = document.getElementById("maxPrice").value;

    let filter = {
        page: 1,
        tags: tags,
        location: locations,
        priceMin: minPrice,
        priceMax: maxPrice
    };

    fetch("/api/filterLecturers", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(filter)
    }).then((response) => response.json()).then((data) => {
        console.log(data);
        lectors = data;
        document.getElementById("lectors").innerHTML = data.map(lector => lectorTitle(lector)).join("");
        registerListeners(lectors);
    })

    console.log(filter);
}


export { initLectors, filterLectors };

