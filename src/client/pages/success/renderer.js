import vlevoDole from "../../img/Tvar_vlevo_dole.png";
import vpravoDole from "../../img/Tvar_vpravo_dole.png";
import vpravoNahore from "../../img/Tvar_pravo_nahore.png";
import whiteLogo from "../../img/LOGO_white.svg?url";
import success from "../../img/success.png";
import '@material/web/textfield/outlined-text-field';
import '@material/web/icon/icon';
import '@material/web/button/filled-button';

function renderSuccess() {
    return /*html */`
    <img src="${whiteLogo}" alt="Logo" class="backButton" id="backButton">

    <div class="successContainer">
        
        <h1>Rezervace byla úspěšná</h1>

        <img src="${success}" alt="Success" class="successImage">

        <md-filled-button id="reserveNextButton">Rezervovat další schůzku</md-filled-button>
        <md-filled-button id="homepageButton">Zpět na hlavní stránku</md-filled-button>
        
    </div>

    <img class="vlevoDole" src="${vlevoDole}">
    <img class="vpravoDole" src="${vpravoDole}">
    <img class="vpravoNahore" src="${vpravoNahore}">


    `;
}

export { renderSuccess };