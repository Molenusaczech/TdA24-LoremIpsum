import vlevoDole from "../../img/Tvar_vlevo_dole.png";
import vpravoDole from "../../img/Tvar_vpravo_dole.png";
import vpravoNahore from "../../img/Tvar_pravo_nahore.png";
import whiteLogo from "../../img/LOGO_white.svg?url";
import '@material/web/slider/slider.js';
import sanitizeHtml from 'sanitize-html';

function renderBook(lector, bookedDates) {
    return /*html */`
    <img src="${whiteLogo}" alt="Logo" class="backButton" id="backButton">

    <div class="mainPageContainer">
        <h1 class="pageTitle">Zabookovat lektora</h1>

        <div id="bookPage">
            <div class="bookLectorContainer">
                <div class="flexbox">
                
                </div>
            </div>
        </div>
    </div>

    <img class="vlevoDole" src="${vlevoDole}">
    <img class="vpravoDole" src="${vpravoDole}">
    <img class="vpravoNahore" src="${vpravoNahore}">


    `;
}





export { renderBook };