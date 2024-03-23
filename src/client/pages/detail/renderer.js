import whiteLogo from "../../img/LOGO_white.svg?url";
import pageTitleIcon from "../../img/pageTitleIcon_white.png";

import '@material/web/textfield/outlined-text-field';
import '@material/web/icon/icon';

import '@material/web/button/filled-button';

function renderActivityDetail(activity) {
  console.log(activity);
    return /*html*/`
    <div class="pageTop">
      <div class=pageTopBack>
          <div class="pageTopRow">
              <img src="${whiteLogo}" alt="Logo" class="backButton" id="backButton">
              <h1>Projekt <span class="blueText">AMOS</span></h1>
              <div class="pageTopRowAdmin">
                  dadad
              </div>
          </div>
          <hr>
      </div>
  </div>

    <div class="aiPageContainer">
        <img src="${pageTitleIcon}" alt="IkonaTitle" class="mainTitleIcon">
        
        <h1 class="detailName">${activity.title}</h1>

        <div class="detailSide">
          <div class="detailLeft">

            <h2>Popis</h2>
            <div class="detailDesc">${activity.description}</div>
            <h2>Struktura</h2>
            <div class="detailSubDesc">${activity.classStructure}</div>

            <h2>Čas</h2>
            <div class="detailTime">
              <md-icon>schedule</md-icon>
              <div class="detailTimeSubContainer">
                <p>${activity.lengthMin} minut</p>
                <p>${activity.lengthMax} minut</p>
              </div>
            </div>

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

          </div>

          <div class="detailRight">
            <div class="detailHomePrep">
              <h1>Domácí příprava</h1>
              
              ${activity.homePreparation.map(renderHomePrep).join("")}

            </div>
            <div class="detailHomePrep">
              <h1>Instrukce</h1>
              
              ${activity.instructions.map(renderHomePrep).join("")}
              
            </div>
            <div class="detailHomePrep">
              <h1>Agenda</h1>
              
              ${activity.agenda.map(renderHomePrep).join("")}

            </div>
          </div>
        </div>

        <h1>Galerie</h1>
        <div class="detailGallery">
        ${activity.gallery.map(renderGallery).join("")}
        </div>



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

function renderLink(link) {
  return /*html*/`
  <p>${link.title} <a href="${link.url}">${link.url}</a></p>
  `;
}

function renderHomePrep(prep) {
  return /*html*/`
  <div class="detailHomePrepSub">
    <hr>
    <p class="detailHomePrepSubTitle">${prep.title}</p>
    <p class="detailHomePrepSubText">>${prep.warn || ""}</p>
    <p class="detailHomePrepSubText">>${prep.note || ""}</p>
  </div>
  `;
}

function renderImage(image) {
  return /*html*/`
  <img src="${image.highRes}">
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

export { renderActivityDetail };