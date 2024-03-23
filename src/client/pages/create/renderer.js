import vlevoDole from "../../img/Tvar_vlevo_dole.png";
import vpravoDole from "../../img/Tvar_vpravo_dole.png";
import vpravoNahore from "../../img/Tvar_pravo_nahore.png";
import whiteLogo from "../../img/LOGO_white.svg?url";

import '@material/web/textfield/outlined-text-field';
import '@material/web/icon/icon';

import '@material/web/button/filled-button';

function renderCreate() {
    return /*html*/`
  <img src="${whiteLogo}" alt="Logo" class="backButton" id="backButton">

    <div class="aiPageContainer">
        <h1 class="pageTitle">Vytvořit aktivitu</h1>
        
       

    </div>

    <img class="vlevoDole" src="${vlevoDole}">
    <img class="vpravoDole" src="${vpravoDole}">
    <img class="vpravoNahore" src="${vpravoNahore}">
    `;
}

export { renderCreate };