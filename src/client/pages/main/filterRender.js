import sanitizeHtml from 'sanitize-html';
import { filterLectors } from './filter';

function renderTagSelect(tag) {
    return /*html */`
    <span data-tag="${tag.uuid}" class="tagSelect">

    <span class="lectorListFilterTagSymbol">
        <span class="lectorListFilterTagSymbol1"></span>
        <span class="lectorListFilterTagSymbol2"></span>
    </span>

    ${sanitizeHtml(tag.name)}

    
    <span class="lectorListFilterTagCount">(${tag.count})</span>
    
    </span>
    `;
}

function renderLocationSelect(location) {
    console.log(location);
    let count = location["count"];
    location = sanitizeHtml(location.location);
    return /*html */`
    <span data-location="${location}" class="locationSelect">
    <span class="lectorListFilterLocationSymbol">
        <span class="lectorListFilterLocationSymbol1"></span>
        <span class="lectorListFilterLocationSymbol2"></span>
    </span>
    ${location}

    <span class="lectorListFilterLocationCount">(${count})</span>

    </span>
    `;
}

function updateFiltering(tags, locations) {

    console.log(document.getElementById("mainPage"));
    document.getElementById("filterTags").innerHTML = tags.map(renderTagSelect).join("");
 
    document.getElementById("filterLocation").innerHTML = locations.map(renderLocationSelect).join("");

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

}

export { updateFiltering };