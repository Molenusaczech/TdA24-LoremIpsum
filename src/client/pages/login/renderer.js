import vlevoDole from "../../img/Tvar_vlevo_dole.png";
import vpravoDole from "../../img/Tvar_vpravo_dole.png";
import vpravoNahore from "../../img/Tvar_pravo_nahore.png";
import whiteLogo from "../../img/LOGO_white.svg?url";
import '@material/web/textfield/outlined-text-field';
import '@material/web/icon/icon';
import '@material/web/button/filled-button';

function renderLogin() {
    return /*html */`
    <img src="${whiteLogo}" alt="Logo" class="backButton" id="backButton">

    <div class="loginContainer">
        
        <md-outlined-text-field label="Uživatelské jméno" id="loginUsername">
            <md-icon slot="leading-icon">person</md-icon>
        </md-outlined-text-field>

        <md-outlined-text-field label="Password" type="password" id="loginPassword">
            <md-icon slot="leading-icon">lock</md-icon>
        </md-outlined-text-field>

        <md-filled-button id="loginButton">Přihlásit se</md-filled-button>
        </div>
        
    </div>

    <img class="vlevoDole" src="${vlevoDole}">
    <img class="vpravoDole" src="${vpravoDole}">
    <img class="vpravoNahore" src="${vpravoNahore}">


    `;
}





export { renderLogin };