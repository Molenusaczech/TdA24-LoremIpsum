import whiteLogo from "../../img/LOGO_white.svg?url";
import pageTitleIcon from "../../img/pageTitleIcon_white.png";

import '@material/web/textfield/outlined-text-field';
import '@material/web/icon/icon';

import '@material/web/button/filled-button';

function renderActivityDetail() {
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
        
        <h1 class="detailName">Jméno</h1>

        <div class="detailSide">
          <div class="detailLeft">

            <h2>Popis</h2>
            <div class="detailDesc">Popisek</div>
            <h2>Struktura</h2>
            <div class="detailSubDesc">Struktura</div>

            <h2>Čas</h2>
            <div class="detailTime">
              <md-icon>schedule</md-icon>
              <div class="detailTimeSubContainer">
                <p>Délka min</p>
                <p>Délka max</p>
              </div>
            </div>

            <h2>Úroveň vzdělání</h2>
            <div class="detailEdLevel">
              <p>Tady budou všechny edLevel</p>
              <p>Tady budou všechny edLevel</p>
            </div>

            <h2>Cíle</h2>
            <div class="detailEdLevel">
              <p>Tady budou všechny cíle</p>
              <p>Tady budou všechny cíle</p>
            </div>

            <h2>Nástroje</h2>
            <div class="detailEdLevel">
              <p>Tady budou všechny nástroje</p>
              <p>Tady budou všechny nástroje</p>
            </div>

            <h2>Odkazy</h2>
            <div class="detailLinks">
              <p>Tady bude odkaz</p>
            </div>

          </div>

          <div class="detailRight">
            <div class="detailHomePrep">
              <h1>Domácí příprava</h1>
              <div class="detailHomePrepSub">
                <p>Title</p>
                <p class="detailHomePrepSubText">Warn</p>
                <p class="detailHomePrepSubText">Note</p>
              </div>
            </div>
            <div class="detailHomePrep">
              <h1>Instrukce</h1>
              <div class="detailHomePrepSub">
                <p>Title</p>
                <p class="detailHomePrepSubText">Warn</p>
                <p class="detailHomePrepSubText">Note</p>
              </div>
            </div>
            <div class="detailHomePrep">
              <h1>Agenda</h1>
              <div class="detailHomePrepSub">
                <p>Title</p>
                <p class="detailHomePrepSubText">Duration</p>
                <p class="detailHomePrepSubText">Description</p>
              </div>
            </div>
          </div>
        </div>

        <h1>Galerie</h1>
        <div class="detailGallery">Tady budou všechny galerie</div>


    </div>
    `;
}

export { renderActivityDetail };