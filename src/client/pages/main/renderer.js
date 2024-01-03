import vlevoDole from "../../img/Tvar_vlevo_dole.png";
import vpravoDole from "../../img/Tvar_vpravo_dole.png";
import vpravoNahore from "../../img/Tvar_pravo_nahore.png";
import whiteLogo from "../../img/LOGO_white.svg?url";
import { getLectorName } from "../../getLectorName";

function renderMain(lectors, tags, locations, minPrice, maxPrice) {
    console.log(tags);
    return /*html */`
    <img src="${whiteLogo}" alt="Logo" class="backButton" id="backButton">

    <div class="mainPageContainer">
        <div id="filter">
            <div class="filterPrice">
                Cena lektora: <br>
                <input type="number" id="minPrice" value="${minPrice}">
                -
                <input type="number" id="maxPrice" value="${maxPrice}">
            </div>
            Aktivity:
            <div class="filterTags">
                ${tags.map(renderTagSelect).join("")}
            </div>
            Místo působení:
            <div class="filterLocation">
                ${locations.map(renderLocationSelect).join("")}
            </div>
        </div>

        <div id="lectors">
            ${lectors.map(lector => lectorTitle(lector)).join("")}
        </div>
    </div>

    <img class="vlevoDole" src="${vlevoDole}">
    <img class="vpravoDole" src="${vpravoDole}">
    <img class="vpravoNahore" src="${vpravoNahore}">


    `;
}

function lectorTitle(lecturer) {
    //console.log(lector);
    return /*html */`
    <div class="lectorListLector" ${lectorMetadata(lecturer)}>
            <div class="flexbox">
    
                <div class="lectorLeftBox">
                    <img class="lectorListPicture" id="lectorPic" src="${lecturer.picture_url}" alt="Lecturer picture">
                </div>
    
                <div class="lectorRightBox">
                    <div class="lectorListName"> ${getLectorName(lecturer)} </div>
                    <hr>
                    <h2 class="lectorLocation"> ${lecturer.location} </h2>
                    <h3 class="lectorClaim"> ${lecturer.claim} </h3>
                    <div class="lectorBio"> ${lecturer.bio} </div>
                </div>
            </div>
            <div class="lectorTags">
                ${lecturer.tags.map(renderTag).join("")}
            </div>
            <div class="moreInfo">
                Klikněte pro více informací
            </div>
        </div>
    `;
}

function renderTag(tag) {
    console.log(tag.name);
    return /*html */`
    <span class="lectorTag" data-uuid="${tag.uuid}"> ${tag.name} </span>
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