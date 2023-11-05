function renderMain(lectors) {
    console.log(lectors);
    return /*html */`
    <h1> Main Page </h1>
    ${lectors.map(lector => lectorTitle(lector)).join("")}
    `;
}

function lectorTitle(lector) {
    console.log(lector);
    return /*html */`
    <div data-uuid="${lector.UUID}" class="lectorSmall">
    <h2> ${
        lector.title_before 
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

export { renderMain };