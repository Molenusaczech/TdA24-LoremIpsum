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
              </div>
          </div>
          <hr>
      </div>
  </div>

    <div class="aiPageContainer">
        <img src="${pageTitleIcon}" alt="IkonaTitle" class="mainTitleIcon">
        
        <h1 class="detailName">${activity.title}</h1>

        <div class="detailPageTop">
          <h2 class="yellowText">Shrnutí pomocí AI</h2>
          <p>${activity.summary}</p>
        </div>

        <div class="detailSide">
          <div class="detailLeft">

            <h2 class="yellowText">Popis</h2>
            <div class="detailDesc">${activity.description}</div>
            <h2 class="yellowText">Struktura</h2>
            <div class="detailSubDesc">${activity.classStructure}</div>

            <h2 class="yellowText">Čas</h2>
            <div class="detailTime">
              <md-icon>schedule</md-icon>
              <div class="detailTimeSubContainer">
                <p>${activity.lengthMin} minut</p>
                <p>${activity.lengthMax} minut</p>
              </div>
            </div>

            <h2 class="yellowText">Úroveň vzdělání</h2>
            <div class="detailEdLevel">
              ${activity.edLevel.map(renderEdLevel).join("")}
            </div>

            <h2 class="yellowText">Cíle</h2>
            <div class="detailEdLevel">
              ${activity.objectives.map(editGoals).join("")}
            </div>

            <h2 class="yellowText">Nástroje</h2>
            <div class="detailEdLevel">
              ${activity.tools.map(renderTool).join("")}
            </div>

            <h2 class="yellowText">Odkazy</h2>
            <div class="detailLinks">
              ${activity.links.map(renderLink).join("")}
            </div>

          </div>

          <div class="detailRight">
            <div class="detailHomePrep">
              <h2>Domácí příprava</h2>
              
              ${activity.homePreparation.map(renderHomePrep).join("")}

            </div>
          </div>
        </div>

        <div class="detailSideBot">
          <div class="detailLeftBot">
            <div class="detailHomePrep">
              <h2>Instrukce</h2>
              
              ${activity.instructions.map(renderHomePrep).join("")}
              
            </div>
          </div>
          <div class="detailRightBot">
            <div class="detailHomePrep">
              <h2>Agenda</h2>
            
              ${activity.agenda.map(renderHomePrep).join("")}

            </div>
          </div>
        </div>

        <h2 class="yellowText">Galerie</h2>
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