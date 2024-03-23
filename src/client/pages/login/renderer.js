import whiteLogo from "../../img/LOGO_white.svg?url";
import pageTitleIcon from "../../img/pageTitleIcon_white.png";

import '@material/web/textfield/outlined-text-field';
import '@material/web/icon/icon';
import '@material/web/button/filled-button';

function renderLogin() {
    return /*html */`
    <div class="pageTop">
        <div class=pageTopBack>
            <div class="pageTopRow">
                <img src="${whiteLogo}" alt="Logo" class="backButton" id="backButton">
                <h1>Project <span class="blueText">AMOS</span></h1>
                <div class="pageTopRowAdmin">
                    dadad
                </div>
            </div>
            <hr>
        </div>
    </div>

    <div class="loginContainer">

        <img src="${pageTitleIcon}" alt="IkonaTitle" class="mainTitleIcon">

        <md-outlined-text-field label="Uživatelské jméno" id="loginUsername">
            <md-icon slot="leading-icon">person</md-icon>
        </md-outlined-text-field>

        <md-outlined-text-field label="Password" type="password" id="loginPassword">
            <md-icon slot="leading-icon">lock</md-icon>
        </md-outlined-text-field>

        <md-filled-button id="loginButton">Přihlásit se</md-filled-button>
        </div>
        
    </div>

    `;
}





export { renderLogin };