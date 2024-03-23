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
       
        <div class="detailDesc">Popisek</div>
        <div class="detailSubDesc">Struktura</div>

        <div class="detailLeft">
          <div class="detailTime">
            <md-icon>schedule</md-icon>
            <div class="detailTimeSubContainer">
              <p>Délka min</p>
              <p>Délka max</p>
            </div>
          </div>

          <div class="detailEdLevel">
            <p>Tady budou všechny edLevel</p>
          </div>
        </div>

        <div class="detailRight">
        </div>

        <div class="detailObjective">Tady budou všechny edLevel</div>
        <div class="detailObjective">Tady budou všechny tools</div>
        <div class="detailObjective">Tady budou všechny home preparation</div>
        <div class="detailObjective">Tady budou všechny instructions</div>
        <div class="detailObjective">Tady budou všechny agenda</div>
        <div class="detailObjective">Tady budou všechny lists</div>
        <div class="detailObjective">Tady budou všechny galerie</div>


    </div>
    `;
}

export { renderActivityDetail };