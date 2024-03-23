import whiteLogo from "../../img/LOGO_white.svg?url";
import pageTitleIcon from "../../img/pageTitleIcon_white.png";

import '@material/web/textfield/outlined-text-field';
import '@material/web/icon/icon';

import '@material/web/button/filled-button';

function renderAdmin() {
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
      <h1 class="adminName">Admin</h1>
        
       

    </div>
    `;
}

export { renderAdmin };