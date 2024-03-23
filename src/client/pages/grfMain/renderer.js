import whiteLogo from "../../img/LOGO_white.svg?url";
import pageTitleIcon from "../../img/pageTitleIcon_white.png";

import '@material/web/textfield/outlined-text-field';
import '@material/web/textfield/filled-text-field';
import '@material/web/icon/icon';

import '@material/web/button/filled-button';

function renderGrfMain() {
    return /*html*/`
    <div class="pageTop">
        <div class=pageTopBack>
            <div class="pageTopRow">
                <img src="${whiteLogo}" alt="Logo" class="backButton" id="backButton">
                <h1>Projekt <span class="blueText">AMOS</span></h1>
                <div class="pageTopRowAdmin">
                    Přihlásit se
                </div>
            </div>
            <hr>
        </div>
    </div>

        <div class="aiPageContainer">
            <img src="${pageTitleIcon}" alt="IkonaTitle" class="mainTitleIcon">

            <div class="searchField">
                <md-filled-text-field label="Hledat aktivity" id="aiPromt" class="bookTextbox">
                    <md-icon slot="leading-icon">search</md-icon>
                </md-filled-text-field>
            </div>

            <div class="aiResults">
                Tady budou výsledky
            </div>

            <h1>Oblíbené aktivity</h1>

            <div class="aiBest">
                Tady budou nejoblíbenější
            </div>

            <md-filled-button class="mainButton" id="createButton">Vytvořit aktivitu</md-filled-button>

        </div>

    </div>
    `;
}

export { renderGrfMain };