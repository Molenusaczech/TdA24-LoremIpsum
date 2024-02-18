import bookingPozadi from "../../img/Booking_pozadi.png";
import whiteLogo from "../../img/LOGO_white.svg?url";
import '@material/web/slider/slider.js';
import sanitizeHtml from 'sanitize-html';
import '@material/web/textfield/outlined-text-field';
import '@material/web/icon/icon';
import '@material/web/button/filled-button';


function renderBook(bookedDates, lector) {

    console.log(bookedDates);

    return /*html */`
    <img src="${whiteLogo}" alt="Logo" class="backButton" id="backButton">
    <img src="${bookingPozadi}" alt="Pozadi" class="bookPozadi">

    <div class="bookPage">
        <div class="bookLectorContainer">
            <div class="calendaryCol">
                <!-- TODO: Add calendar here -->

                <input type="date" id="bookDate" name="bookDate" min="${new Date().toISOString().split('T')[0]}">

            </div>

            <div class="bookLeftCol">

                <div class="bookLectorTopRow">

                    <div class="bookLectorTimes">

                    </div>

                    <div class="bookLectorDetails">
                        <div class="bookLectorDetailsContainer">
                        <md-outlined-text-field label="Celé jméno" id="bookName" class="bookTextbox">
                            <md-icon slot="leading-icon">person</md-icon>
                        </md-outlined-text-field>
                        <md-outlined-text-field label="Email" id="bookEmail" class="bookTextbox" type="email">
                            <md-icon slot="leading-icon">mail</md-icon>
                        </md-outlined-text-field>
                        <md-outlined-text-field label="Telefonní číslo" id="bookEmail" class="bookTextbox">
                            <md-icon slot="leading-icon">call</md-icon>
                        </md-outlined-text-field>

                        <md-outlined-text-field
                            type="textarea"
                            label="Zpráva pro lektora (nepovinné)"
                            class="bookTextbox"
                            rows="3">
                            </md-outlined-text-field>

                        <md-filled-button>Přihlásit se</md-filled-button>
                        </div>

                    </div>

                </div>

                <div class="bookLectorInfo">

                    

                </div>

            </div>

        </div>
    </div>

    `;
}





export { renderBook };