import vlevoDole from "../../img/Tvar_vlevo_dole.png";
import vpravoDole from "../../img/Tvar_vpravo_dole.png";
import vpravoNahore from "../../img/Tvar_pravo_nahore.png";
import whiteLogo from "../../img/LOGO_white.svg?url";
import success from "../../img/success.png";
import '@material/web/textfield/outlined-text-field';
import '@material/web/icon/icon';
import '@material/web/button/filled-button';

function renderDeleteBooking(booking) {
    return /*html */`
    <img src="${whiteLogo}" alt="Logo" class="backButton" id="backButton">

    <div class="successContainer">
        
        <h1>Smazání rezervace bylo úspěšná</h1>
        <h2>Kontaktujte prosím zákazníka a informujte ho o smazání rezervace</h2>

        <h3>${booking["name"]}</h3>
        <div class="meetingDetailsContacts">
            <a href="mailto:${booking["email"]}">${booking["email"]}</a>
            <a href="tel:${booking["phone"]}">${booking["phone"]}</a>
        </div>

        <md-filled-button id="myBookingButton">Zpět na seznam rezervací</md-filled-button>
        
    </div>

    <img class="vlevoDole" src="${vlevoDole}">
    <img class="vpravoDole" src="${vpravoDole}">
    <img class="vpravoNahore" src="${vpravoNahore}">


    `;
}

export { renderDeleteBooking };