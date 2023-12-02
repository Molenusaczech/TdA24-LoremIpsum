function renderMain(lectors, tags, locations) {
    console.log(tags);
    return /*html */`
    <h1> Main Page </h1>

    <div id="filter">
        <div class="filterPrice">
            Cena lektora:
            <input type="number" id="minPrice">
            -
            <input type="number" id="maxPrice">
        </div>
        <div class="filterTags">
            ${tags.map(renderTagSelect).join("")}
        </div>
        <div class="filterLocation">
            ${locations.map(renderLocationSelect).join("")}
        </div>
    </div>

    ${lectors.map(lector => lectorTitle(lector)).join("")}
    `;
}

function lectorTitle(lector) {
    console.log(lector);
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
    console.log(tag);
    return /*html */`
    data-tag-${tag.name}="${tag.uuid}"
    `;
}

function renderTagSelect(name) {
    return /*html */`
    <span>
    <label for="${name}">${name}</label>
    <input type="checkbox" name="${name}" id="${name}">
    </span>
    `;
}

function renderLocationSelect(location) {
    return /*html */`
    <span>
    <label for="${location}">${location}</label>
    <input type="checkbox" name="${location}" id="${location}">
    </span>
    `;
}

export { renderMain };