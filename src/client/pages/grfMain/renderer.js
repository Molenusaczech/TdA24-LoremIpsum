import whiteLogo from "../../img/LOGO_white.svg?url";
import pageTitleIcon from "../../img/pageTitleIcon_white.png";

import '@material/web/textfield/outlined-text-field';
import '@material/web/textfield/filled-text-field';
import '@material/web/icon/icon';

import '@material/web/button/filled-button';

let cache = [];

function renderGrfMain(activities) {
    cache = activities;
    return /*html*/`
    <div class="pageTop">
        <div class=pageTopBack>
            <div class="pageTopRow">
                <img src="${whiteLogo}" alt="Logo" class="backButton" id="backButton">
                <h1>Projekt <span class="blueText">AMOS</span></h1>
                <div class="pageTopRowAdmin">
                    <md-filled-button class="loginButton" id="loginButton">Přihlásit se</md-filled-button>
                </div>
            </div>
            <hr>
        </div>
    </div>

        <div class="aiPageContainer">
            <img src="${pageTitleIcon}" alt="IkonaTitle" class="mainTitleIcon">

            <div class="aiButtonContainer">
                <md-filled-button class="mainButton" id="createButton">Vytvořit aktivitu</md-filled-button>
            </div>

            <div class="searchField">
                <md-filled-text-field label="Hledat aktivity" id="aiPromt" class="bookTextbox">
                    <md-icon slot="leading-icon">search</md-icon>
                </md-filled-text-field>
                <md-filled-button class="searchButton" id="searchButton">Vyhledat</md-filled-button>
            </div>

            <div class="aiResults">
                ${activities.map(renderActivity).join("")}
            </div>
        </div>

    </div>
    `;
}

function renderActivity(activity) {
    console.log(activity);
    return /*html*/`
    <div class="activityCard" data-activityId="${activity.uuid}">
        <div class="activityCardTop">
            <h2>${activity.activityName}</h2>
            <div class="activityCardTopRight">
                <md-icon>schedule</md-icon>
                <p>${activity.lengthMin} - ${activity.lengthMax} minut</p>
            </div>
        </div>
        <h2>Shrnutí od AI</h2>
        <div class="activityCardDesc">
            <p>${activity.summary}</p>
        </div>

        <h2>Úroveň vzdělání</h2>
        <div class="detailEdLevel">
            ${activity.edLevel.map(renderEdLevel).join("")}
        </div>

        <h2>Galerie</h2>
        <div class="detailGallery">
            ${activity.gallery.map(renderGallery).join("")}
        </div>
    </div>
    `;

}

function renderGallery(gallery) {
    return /*html*/`
    <div class="detailGallerySub">
      <h2>${gallery.title}</h2>
      <div class="detailGalleryImages">
        ${gallery.images.map(renderImage).join("")}
      </div>
    </div>
    `;
}

function renderImage(image) {
return /*html*/`
<img src="${image.highRes}">
`;
}

function renderSearchData(data) {
    let activities = [];

    data.matches.forEach(match => {
        activities.push(cache[match.id]);
    });

    console.log(activities);

    document.getElementById("mainPage").innerHTML = renderGrfMain(activities);
}

function renderEdLevel(edLvl) {
    return /*html*/`
    <p>${edLvl}</p>
    `;
  }

export { renderGrfMain, renderSearchData };