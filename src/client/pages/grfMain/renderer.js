import vlevoDole from "../../img/Tvar_vlevo_dole.png";
import vpravoDole from "../../img/Tvar_vpravo_dole.png";
import vpravoNahore from "../../img/Tvar_pravo_nahore.png";
import whiteLogo from "../../img/LOGO_white.svg?url";

import '@material/web/textfield/outlined-text-field';
import '@material/web/icon/icon';

import '@material/web/button/filled-button';

function renderGrfMain() {
    return /*html*/`
  <img src="${whiteLogo}" alt="Logo" class="backButton" id="backButton">

    <div class="aiPageContainer">
        <h1 class="pageTitle">AI</h1>
        
        <div class="aiPageBox">
        
        <md-outlined-text-field label="Zeptej se AI" id="aiPromt" class="bookTextbox">
            <md-icon slot="leading-icon">psychology</md-icon>
        </md-outlined-text-field>

        <md-filled-button class="aiAskButton" id="promptButton">Zeptat se AI</md-filled-button>

        <h1> Odpověď AI: </h1>

        <div class="aiResponse" id="aiResponse">
            Na něco se zeptejte AI
        </div>

        </div>

    </div>

    <img class="vlevoDole" src="${vlevoDole}">
    <img class="vpravoDole" src="${vpravoDole}">
    <img class="vpravoNahore" src="${vpravoNahore}">
    `;
}

export { renderGrfMain };