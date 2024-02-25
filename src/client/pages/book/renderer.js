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
import { getLectorName } from "../../getLectorName";

let lastLector = null;
let lastBookedDates = [];
let selectedIndex = [];
let lector_uuid = null;
let isOnline = false;

function renderBook(bookedDates, lector) {

    console.log(lector);
    console.log(bookedDates);

    lastLector = lector;
    lastBookedDates = [];
    lector_uuid = lector.uuid;

    bookedDates.forEach((date) => {
        //lastBookedDates.push(dayjs(date["start"]).minute(0).second(0).millisecond(0));
    
        for (let i = 0; i < date["length"]; i++) {
            lastBookedDates.push(dayjs(date["start"]).minute(0).second(0).millisecond(0).add(i, 'hour'));
        }
    });

    console.log(lastBookedDates);

    let minDate = dayjs().add(1, 'day').format('YYYY-MM-DD');
    console.log(minDate);

    return /*html */`
    <img src="${whiteLogo}" alt="Logo" class="backButton" id="backButton">
    <img src="${bookingPozadi}" alt="Pozadi" class="bookPozadi">

    <div class="bookPage">
        <div class="bookLectorContainer">
            <!-- TODO: Add calendar here -->

            <div type="date" id="bookDate" name="bookDate" min="${minDate}" value="${minDate}">
            </div>

            <div class="calendaryBottom">
            
                <h3>${sanitizeHtml(getLectorName(lector))}</h3>
                <h3>${sanitizeHtml(lector.price_per_hour)}</h3>
            </div>

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
                <md-outlined-text-field label="Telefonní číslo" id="bookPhone" class="bookTextbox" type="tel">
                    <md-icon slot="leading-icon">call</md-icon>
                </md-outlined-text-field>

                

                <md-outlined-text-field
                    type="textarea"
                    label="Zpráva pro lektora (nepovinné)"
                    class="bookTextbox"
                    id="bookNote"
                    rows="3">
                    </md-outlined-text-field>



                <div class="bookLectorOnlineToggle" id="bookLectorOnlineToggle">

                </div>

                <md-filled-button class="loginButton" id="loginButton">Přihlásit se</md-filled-button>
                </div>

            </div>

            <div class="bookLectorInfo">

                <div class="bookingTags">

                    ${renderBookingTags(lector)}

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

        //console.log(isBooked);

        result += renderTime(time, isBooked, selectedIndex.includes(i));
    }

    document.getElementById("bookTimeContainer").innerHTML = result;

    for (let i = 0; i < 12; i++) {
        let button = document.getElementById(`bookTimeContainer`).children[i];

        if (button.dataset.status == "booked") {
            continue;
        }

        button.addEventListener("click", () => {
            if (selectedIndex.includes(i)) {
                selectedIndex = selectedIndex.filter((index) => index != i);
            } else {
                selectedIndex.push(i);
            }

            if (selectedIndex.length > 1) {
                selectedIndex.forEach((index) => {
                    if (!selectedIndex.includes(index + 1) && !selectedIndex.includes(index - 1)) {
                        selectedIndex = [i]
                    }
                });
            }

            console.log(selectedIndex);

            renderTimes();
        });
    
    }

}

function renderTime(time, isBooked, isSelected) {

    //console.log(time);
    //console.log(isBooked);
    let endTime = time.add(1, "hour");

    if (isBooked && isSelected) {
        selectedIndex = [];
        isSelected = false;
    }

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

function renderBookingTags(lector) {
    let result = "";

    lector.tags.forEach((tag) => {
        result += /*html*/`
        <span data-tag="${tag.uuid}" class="tagSelect">

            <span class="lectorListFilterTagSymbol">
                <span class="lectorListFilterTagSymbol1"></span>
                <span class="lectorListFilterTagSymbol2"></span>
            </span>

            ${sanitizeHtml(tag.name)}


            <span class="lectorListFilterTagCount"></span>
    
    </span>
        `;
    });

    return result;
}

function renderOnline() {
    
    if (isOnline) {

        document.getElementById("bookLectorOnlineToggle").innerHTML = /*html*/`
        <md-outlined-button class="bookOnlineButton" id="bookPhysical">Osobně</md-outlined-button>
        <md-filled-button class="bookOnlineButton" id="bookOnline">Online</md-filled-button>
        `;

    } else {

        document.getElementById("bookLectorOnlineToggle").innerHTML = /*html*/`
        <md-filled-button class="bookOnlineButton" id="bookPhysical">Osobně</md-filled-button>
        <md-outlined-button class="bookOnlineButton" id="bookOnline">Online</md-outlined-button>
        `;

    }

    document.getElementById("bookPhysical").addEventListener("click", () => {
        isOnline = false;
        renderOnline();
    });

    document.getElementById("bookOnline").addEventListener("click", () => {
        isOnline = true;
        renderOnline();
    });

}

export { renderBook, renderTimes, selectedIndex, lector_uuid, renderBookingTags, renderOnline, isOnline };