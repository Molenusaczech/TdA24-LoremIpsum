import sanitizeHtml from "sanitize-html";

function getLectorName(lector) {
    let name = "";

    if (lector.title_before) {
        name += `<div class="lectorListNameTitle"> ${sanitizeHtml(lector.title_before)} </div>`;
    }

    name += `<div class="lectorListName"> ${sanitizeHtml(lector.first_name)} </div>`;

    if (lector.middle_name) {
        name += `<div class="lectorListName"> ${sanitizeHtml(lector.middle_name)} </div>`;
    }

    name += `<div class="lectorListName"> ${sanitizeHtml(lector.last_name)} </div>`;

    if (lector.title_after) {
        name += `<div class="lectorListNameTitle"> ${sanitizeHtml(lector.title_after)} </div>`;
    }

    return name;
}

export { getLectorName };