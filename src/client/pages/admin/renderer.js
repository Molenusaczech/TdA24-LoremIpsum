import whiteLogo from "../../img/LOGO_white.svg?url";
import pageTitleIcon from "../../img/pageTitleIcon_white.png";

import '@material/web/textfield/outlined-text-field';
import '@material/web/icon/icon';

import '@material/web/button/filled-button';

function renderAdmin(activities) {
    return /*html*/`
    <div class="pageTop">
      <div class=pageTopBack>
          <div class="pageTopRow">
              <img src="${whiteLogo}" alt="Logo" class="backButton" id="backButton">
              <h1>Projekt <span class="blueText">AMOS</span></h1>
              <div class="pageTopRowAdmin">
                <md-filled-button class="loginButton" id="logoutButton">Odhlásit se</md-filled-button>
              </div>
          </div>
          <hr>
      </div>
  </div>

    <div class="aiPageContainer">

      <img src="${pageTitleIcon}" alt="IkonaTitle" class="mainTitleIcon">
      <h1 class="adminName">Admin</h1>
        
       ${activities.map(renderActivity).join("")}

    </div>
    `;
}

function verifyButton(activity) {
    if (activity.isVerified) {
        return ""
    }

    return /*html*/`
    <md-filled-button class="verifyButton" id="verify${activity.uuid}">Schválit</md-filled-button>
    `;
}

function renderActivity(activity) {
    console.log(activity);
    return /*html*/`
    <div class="activityCard" data-activityId="${activity.uuid}">
        <div class="activityCardTop">
            <h2>${activity.title}</h2>
            <div class="activityCardTopRight">
                <md-icon>schedule</md-icon>
                <p>${activity.lengthMin} - ${activity.lengthMax} minut</p>
            </div>
        </div>
        <h2>Shrnutí pomocí AI</h2>
        <p>blablabla</p>
        <h2>Popis</h2>
        <div class="activityCardDesc">
            <p>${activity.description}</p>
        </div>
        <h2>Struktura</h2>
            <div class="detailSubDesc">${activity.classStructure}</div>
        <h2>Úroveň vzdělání</h2>
        <div class="detailEdLevel">
            ${activity.edLevel.map(renderEdLevel).join("")}
        </div>

        <h2>Cíle</h2>
        <div class="detailEdLevel">
            ${activity.objectives.map(editGoals).join("")}
        </div>

        <h2>Nástroje</h2>
        <div class="detailEdLevel">
            ${activity.tools.map(renderTool).join("")}
        </div>

        <h2>Odkazy</h2>
        <div class="detailLinks">
          ${activity.links.map(renderLink).join("")}
        </div>

        <div class="adminSide">
          <div class="adminSideRight">
            <div class="detailHomePrep">
              <h2>Domácí příprava</h2>
              
              ${activity.homePreparation.map(renderHomePrep).join("")}

            </div>
          </div>
          <div class="adminSideCenter">
            <div class="detailHomePrep">
              <h2>Instrukce</h2>
              
              ${activity.instructions.map(renderHomePrep).join("")}
              
            </div>
          </div>
          <div class="adminSideLeft">
            <div class="detailHomePrep">
              <h2>Agenda</h2>
          
              ${activity.agenda.map(renderHomePrep).join("")}

            </div>
          </div>

          <h2>Galerie</h2>
          <div class="detailGallery">
              ${activity.gallery.map(renderGallery).join("")}
          </div>
        </div>

        ${verifyButton(activity)}

        <md-filled-button class="deleteButton" data-adminDelete="${activity.uuid}">Smazat</md-filled-button>
    </div>
    `;

}

function renderEdLevel(edLvl) {
  return /*html*/`
  <p>${edLvl}</p>
  `;
}

function editGoals(goal) {
return /*html*/`
<p>${goal}</p>
`;
}

function renderTool(tool) {
return /*html*/`
<p>${tool}</p>
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

function renderHomePrep(prep) {
  return /*html*/`
  <div class="detailHomePrepSub">
    <hr>
    <p class="detailHomePrepSubTitle">${prep.title}</p>
    ${checkWarn(prep.warn || "")}
    ${checkWarn(prep.note || "")}
  </div>
  `;
}

function checkWarn(str) {
  if(str.length == 0){
    return "";
  }
  else{
    return /*html*/`<p class="detailHomePrepSubText">>${str}</p>`;
  }
}

function renderLink(link) {
  return /*html*/`
  <p>${link.title} <a href="${link.url}">${link.url}</a></p>
  `;
}

export { renderAdmin };