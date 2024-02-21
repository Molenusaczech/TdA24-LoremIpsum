import vlevoDole from "../../img/Tvar_vlevo_dole.png";
import vpravoDole from "../../img/Tvar_vpravo_dole.png";
import vpravoNahore from "../../img/Tvar_pravo_nahore.png";
import whiteLogo from "../../img/LOGO_white.svg?url";
import '@material/web/textfield/outlined-text-field';
import '@material/web/icon/icon';
import '@material/web/button/filled-button';
import bookingPozadi from "../../img/Booking_pozadi.png";

import dayjs from "dayjs";

function renderMyBookings() {

    let today = dayjs().format('YYYY-MM-DD');

    return /*html */`
    <img src="${whiteLogo}" alt="Logo" class="backButton" id="backButton">
    <img src="${bookingPozadi}" alt="Pozadi" class="bookPozadi">

    <div class="bookPage">
        <div class="bookLectorContainer">
            <div class="calendaryCol">
                <div type="date" id="bookDate" name="bookDate" value="${today}"></div>
            </div>

            <div class="timesCol" id="timesCol">



            </div>

        </div>
    </div>
    `;
}

function renderTime(index, isBooked) {
    let time = index + 8;
    if (isBooked) {
        return /*html */`
            <md-filled-button class="timeSlot">
                <span>${time}:00 - ${time + 1}:00</span>
            </md-filled-button>
    `;
    } else {
        return /*html */`
            <md-text-button class="timeSlot" disabled="true">
                <span>${time}:00 - ${time + 1}:00</span>
            </md-text-button>
    `;
    }
}

function renderTodayTimes(bookedDates) {

    let result = "";

    let curDate = document.getElementById('bookDate').value;

    for (let i = 0; i < 12; i++) {

        let curTime = dayjs().hour(i + 8).minute(0).second(0).millisecond(0).day(dayjs(curDate).day()).month(dayjs(curDate).month()).year(dayjs(curDate).year());

        curTime = curTime.toISOString();

        let isBooked = false;
        let data = {}

        for (let j = 0; j < bookedDates.length; j++) {
            if (curTime == bookedDates[j]["start"]) {
                isBooked = true;
                data = bookedDates[j];
                break;
            }
        }

        result += renderTime(i, isBooked);
    }

    document.getElementById("timesCol").innerHTML = result;

}

export { renderMyBookings, renderTodayTimes };
