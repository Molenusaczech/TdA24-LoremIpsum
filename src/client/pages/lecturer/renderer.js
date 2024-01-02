import vlevoDole from "../../img/Tvar_vlevo_dole.png";
import vpravoDole from "../../img/Tvar_vpravo_dole.png";
import vpravoNahore from "../../img/Tvar_pravo_nahore.png";
import whiteLogo from "../../img/LOGO_white.svg?url";
import { getLectorName } from "../../getLectorName";

function renderLecturer(lecturer) {
    return /*html */`
    <div class="lecturerPage">

    <img src="${whiteLogo}" alt="Logo" class="backButton" id="backButton">
        <div class="lectorContainer">
            <div class="flexbox">
    
                <div class="lectorLeftBox">
    
                    <img class="lectorPicture" id="lectorPic" src="${lecturer.picture_url}" alt="Lecturer picture">
                    <div class="lectorTags">
                        ${lecturer.tags.map(renderTag).join("")}
                    </div>
                </div>
    
                <div class="lectorRightBox">
                    <div class="lectorName"> ${getLectorName(lecturer)} </div>
                    <hr>
                    <h2 class="lectorLocation"> ${lecturer.location} </h2>
                    <h3 class="lectorClaim"> ${lecturer.claim} </h3>
                    <div class="lectorBio"> ${lecturer.bio} </div>
    
                    <div class="lectorContact">
                        <div class="contactBox">
                            <span class="lectorContactOption"> ${lecturer.price_per_hour} Kč / hodina </span>
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
    <span class="lectorTag" data-uuid="${tag.uuid}"> ${tag.name} </span>
    `;
}

function renderPhoneNumber(phoneNumber) {
    return /*html */`
    <a href="tel:${phoneNumber.replace(/\s/g, '')}">
    <span class="lectorContactOption"> ${phoneNumber} </span>
    </a>
    `;
}

function renderEmail(email) {
    return /*html */`
    <a href="mailto:${email}">
    <span class="lectorContactOption"> ${email} </span>
    </a>
    `;
}

export { renderLecturer };