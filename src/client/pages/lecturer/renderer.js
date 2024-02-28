import vlevoDole from "../../img/Tvar_vlevo_dole.png";
import vpravoDole from "../../img/Tvar_vpravo_dole.png";
import vpravoNahore from "../../img/Tvar_pravo_nahore.png";
import whiteLogo from "../../img/LOGO_white.svg?url";
import { getLectorName } from "../../getLectorName";
import sanitizeHtml from 'sanitize-html';
import { ifNull } from "../../ifNull";

function renderLecturer(lecturer) {
    return /*html */`
    <div class="lecturerPage">

    <img src="${whiteLogo}" alt="Logo" class="backButton" id="backButton">
        <div class="lectorContainer">
            <div class="flexboxB">
    
                <div class="lectorLeftBox">
                    <img class="lectorPicture" id="lectorPic" src="${sanitizeHtml(ifNull(lecturer.picture_url, "https://placehold.co/400x400/74C7D3/FFFFFF/png?text="+lecturer.first_name+"%5Cn"+lecturer.last_name))}" alt="Lecturer picture">
                </div>

                <div class="lectorSwitchTags">
                    ${lecturer.tags.map(renderTag).join("")}
                </div>

                <div class="lectorSwitchBox">
                    ${getLectorName(lecturer)}
                </div>

                <div class="lectorSwitchBoxRight">
                    <a class="cancelA" id="reserveButton"><span class="lectorContactOptionC"> Rezervovat </span></a>
                    <a><span class="lectorContactOptionB"> ${sanitizeHtml(ifNull(lecturer.price_per_hour, "0"))} Kč / hodina </span></a>
                </div>

                <div class="lectorRightBoxB">
                    <hr>
                    <h2 class="lectorLocation"> ${sanitizeHtml(lecturer.location)} </h2>
                    <h3 class="lectorClaim"> ${sanitizeHtml(lecturer.claim)} </h3>
                    <div class="lectorBio"> ${sanitizeHtml(lecturer.bio)} </div>
    
                    <div class="lectorContact">
                        <div class="lectorContact">
                            ${lecturer.contact.telephone_numbers.map(renderPhoneNumber).join("")}
                            ${lecturer.contact.emails.map(renderEmail).join("")}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
    
        <img class="vlevoDole" src="${vlevoDole}">
        <img class="vpravoDole" src="${vpravoDole}">
        <img class="vpravoNahore" src="${vpravoNahore}">

    </div>
    `;
}

function renderTag(tag) {
    return /*html */`
    <span class="lectorTag" data-uuid="${tag.uuid}"> ${sanitizeHtml(tag.name)} </span>
    `;
}

function renderPhoneNumber(phoneNumber) {
    return /*html */`
    <a href="tel:${sanitizeHtml(phoneNumber.replace(/\s/g, ''))}">
    <span class="lectorContactOption"> ${sanitizeHtml(phoneNumber)} </span>
    </a>
    `;
}

function renderEmail(email) {
    return /*html */`
    <a href="mailto:${sanitizeHtml(email)}">
    <span class="lectorContactOption"> ${sanitizeHtml(email)} </span>
    </a>
    `;
}

export { renderLecturer };