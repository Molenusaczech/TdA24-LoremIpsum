import bookingPozadi from "../../img/Booking_pozadi.png";
import whiteLogo from "../../img/LOGO_white.svg?url";
import '@material/web/slider/slider.js';
import sanitizeHtml from 'sanitize-html';
import '@material/web/textfield/outlined-text-field';
import '@material/web/icon/icon';
import '@material/web/button/filled-button';
import '@material/web/button/filled-tonal-button';
import '@material/web/button/outlined-button';
import '@material/web/button/text-button';

import dayjs from "dayjs";
import flatpickr from "flatpickr";

let lastLector = null;
let lastBookedDates = [];
let selectedIndex = -1;

function renderBook(bookedDates, lector) {

    console.log(lector);
    console.log(bookedDates);

    lastLector = lector;
    lastBookedDates = [];

    bookedDates.forEach((date) => {
        lastBookedDates.push(dayjs(date).minute(0).second(0).millisecond(0));
    });

    console.log(lastBookedDates);

    let minDate = dayjs().add(1, 'day').format('YYYY-MM-DD');
    console.log(minDate);

    return /*html */`
    <img src="${whiteLogo}" alt="Logo" class="backButton" id="backButton">
    <img src="${bookingPozadi}" alt="Pozadi" class="bookPozadi">

    <div class="bookPage">
        <div class="bookLectorContainer">
            <div class="calendaryCol">
                <!-- TODO: Add calendar here -->

                <div type="date" id="bookDate" name="bookDate" min="${minDate}" value="${minDate}">
                </div>

            </div>

            <div class="bookLeftCol">

                <div class="bookLectorTopRow">

                    <div class="bookLectorTimes">

                        <h3>Vyberte čas schůzky</h3>

                        <div id="bookTimeContainer">

                        </div>

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

                        <md-filled-button class="loginButton">Přihlásit se</md-filled-button>
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


function renderTimes() {

    let curDate = document.getElementById('bookDate').value;

    curDate = dayjs(curDate);

    let startTime = dayjs().hour(8).minute(0).second(0).day(curDate.day()).month(curDate.month()).year(curDate.year()).millisecond(0);

    let result = "";

    for (let i = 0; i < 12; i++) {
        let time = startTime.add(i, 'hour');
        /*console.log(time);
        console.log(lastBookedDates[2])
        console.log(lastBookedDates[2] - time);
        console.log(lastBookedDates.includes(time));*/

        let isBooked = false;

        lastBookedDates.forEach((date) => {
            if (date.isSame(time)) {
                isBooked = true;
            }
        });

        console.log(isBooked);

        result += renderTime(time, isBooked, selectedIndex == i);
    }

    document.getElementById("bookTimeContainer").innerHTML = result;

    for (let i = 0; i < 12; i++) {
        let button = document.getElementById(`bookTimeContainer`).children[i];

        if (button.dataset.status == "booked") {
            continue;
        }

        button.addEventListener("click", () => {
            selectedIndex = i;
            renderTimes();
        });
    
    }

}

function renderTime(time, isBooked, isSelected) {

    console.log(time);
    console.log(isBooked);
    let endTime = time.add(1, "hour");

    if (isBooked) {
        return /*html*/`
        <md-text-button class="bookTime" data-status="booked" disabled=true>
            <p>${time.format('HH:mm')} - ${endTime.format('HH:mm')}</p>
        </md-text-button>
        `;
    } else if (isSelected) {
        return /*html*/`
        <md-filled-button class="bookTime">
            <p>${time.format('HH:mm')} - ${endTime.format('HH:mm')}</p>
        </md-filled-button>
        `;
    } else {
        return /*html*/`
        <md-outlined-button class="bookTime">
            <p>${time.format('HH:mm')} - ${endTime.format('HH:mm')}</p>
        </md-outlined-button>
        `;
    }

}




export { renderBook, renderTimes };