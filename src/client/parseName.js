import sanitizeHtml from "sanitize-html";

function getLectorPlainTextName(lector) {
    let name = "";

    if (lector.title_before) {
        name += `${sanitizeHtml(lector.title_before)} `;
    }

    name += `${sanitizeHtml(lector.first_name)} `;

    if (lector.middle_name) {
        name += `${sanitizeHtml(lector.middle_name)} `;
    }

    name += `${sanitizeHtml(lector.last_name)} `;

    if (lector.title_after) {
        name += `${sanitizeHtml(lector.title_after)} `;
    }

    return name;
}

export { getLectorPlainTextName };