import vlevoDole from "../../img/Tvar_vlevo_dole.png";
import vpravoDole from "../../img/Tvar_vpravo_dole.png";
import vpravoNahore from "../../img/Tvar_pravo_nahore.png";
import whiteLogo from "../../img/LOGO_white.svg?url";
import { getLectorName } from "../../getLectorName";
import '@material/web/slider/slider.js';

function formatSliderValue(value) {
    if (value == null) {
        return "0";
    }
    return value.toLocaleString("cs-CZ", {
        style: "currency",
        currency: "CZK",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });
}

function renderMain(lectors, tags, locations, minPrice, maxPrice) {
    console.log(tags);
    return /*html */`
    <img src="${whiteLogo}" alt="Logo" class="backButton" id="backButton">

    <div class="mainPageContainer">
        <div id="filter">

        <!--<div class="wrapper">
        <div class="values">
            <span id="range1">
                0
            </span>
            <span> &dash; </span>
            <span id="range2">
                100
            </span>
        </div>
        <div class="container">
            <div class="slider-track"></div>
            <input type="range" min="0" max="100" value="30" id="slider-1">
            <input type="range" min="0" max="100" value="70" id="slider-2">
        </div>
    </div>-->
            <div class="filterPrice">
                Cena lektora: <br>


                <div class="sliderContainer">

                <span id="minPrice">${formatSliderValue(minPrice)}</span>
                <md-slider 
                    range 
                    min="${minPrice}"
                    max="${maxPrice}"
                    value-start="${minPrice}" 
                    value-end="${maxPrice}" 
                    labeled
                    style="width: 90%;"
                    id="priceSlider"
                ></md-slider>
                <span id="maxPrice">${formatSliderValue(maxPrice)}</span>

                </div>


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