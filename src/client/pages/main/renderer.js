function renderMain(lectors, tags, locations, minPrice, maxPrice) {
    console.log(tags);
    return /*html */`
    <h1> Main Page </h1>

    <div id="filter">
        <div class="filterPrice">
            Cena lektora:
            <input type="number" id="minPrice" value="${minPrice}">
            -
            <input type="number" id="maxPrice" value="${maxPrice}">
        </div>
        <div class="filterTags">
            ${tags.map(renderTagSelect).join("")}
        </div>
        <div class="filterLocation">
            ${locations.map(renderLocationSelect).join("")}
        </div>
    </div>

    <div id="lectors">
    ${lectors.map(lector => lectorTitle(lector)).join("")}
    </div>
    `;
}

function lectorTitle(lector) {
    //console.log(lector);
    return /*html */`
    <div ${lectorMetadata(lector)} class="lectorSmall">
    <h2> ${lector.title_before
        + " "
        + lector.first_name
        + " "
        + lector.middle_name
        + " "
        + lector.last_name
        + " "
        + lector.title_after
        } </h2>
    <p> ${lector.bio} </p>
    <p> ${lector.location} </p>
    <p> ${lector.claim} </p>
    <p> ${lector.price_per_hour} </p>
    <img src="${lector.picture_url}" alt="Lecturer picture">

    <div>Tags:
    <ul>
    ${lector.tags.map(renderTag).join("")}
    </ul>
    </div>
    </div>
    `;
}

function renderTag(tag) {
    console.log(tag.name);
    return /*html */`
    <li data-uuid="${tag.uuid}"> ${tag.name} </li>
    `;
}

function lectorMetadata(lector) {
    return /*html */`
    data-uuid="${lector.uuid}"  data-price_per_hour="${lector.price_per_hour}" ${lector.tags.map(tagMetadata).join("")}
    `;
}

function tagMetadata(tag) {
    //console.log(tag);
    return /*html */`
    data-tag-${tag.name}="${tag.uuid}"
    `;
}

function renderTagSelect(tag) {
    return /*html */`
    <span data-tag="${tag.uuid}" class="tagSelect">
    ${tag.name}
    </span>
    `;
}

function renderLocationSelect(location) {
    console.log(location);
    location = location.location;
    return /*html */`
    <span data-location="${location}" class="locationSelect">
    ${location}
    </span>
    `;
}

export { renderMain, lectorTitle };