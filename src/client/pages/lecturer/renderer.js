function renderLecturer(lecturer) {
    return /*html */`
    <button id="backButton">Back</button>
    <h1> Lecturer </h1>
    <ul>
        <li> ${lecturer.UUID} </li>
        <li> ${lecturer.title_before} </li>
        <li> ${lecturer.first_name} </li>
        <li> ${lecturer.middle_name} </li>
        <li> ${lecturer.last_name} </li>
        <li> ${lecturer.title_after} </li>
        <li> ${lecturer.location} </li>
        <li> ${lecturer.claim} </li>
        <li> ${lecturer.bio} </li>
        <li> ${lecturer.price_per_hour} </li>
    </ul>

    Tags:
    <ul>
    ${lecturer.tags.map(renderTag).join("")}
    </ul>

    Phone numbers:
    <ul>
    ${lecturer.contact.telephone_numbers.map(renderPhoneNumber).join("")}
    </ul>

    Emails:
    <ul>
    ${lecturer.contact.emails.map(renderEmail).join("")}
    </ul>

    <img src="${lecturer.picture_url}" alt="Lecturer picture">
    `;
}

function renderTag(tag) {
    return /*html */`
    <li data-uuid="${tag.uuid}"> ${tag.name} </li>
    `;
}

function renderPhoneNumber(phoneNumber) {
    return /*html */`
    <li> ${phoneNumber} </li>
    `;
}

function renderEmail(email) {
    return /*html */`
    <li> ${email} </li>
    `;
}

export { renderLecturer };