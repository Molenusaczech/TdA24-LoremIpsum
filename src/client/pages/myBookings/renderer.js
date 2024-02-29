import vlevoDole from "../../img/Tvar_vlevo_dole.png";
import vpravoDole from "../../img/Tvar_vpravo_dole.png";
import vpravoNahore from "../../img/Tvar_pravo_nahore.png";
import whiteLogo from "../../img/LOGO_white.svg?url";
import '@material/web/textfield/outlined-text-field';
import '@material/web/icon/icon';
import '@material/web/button/filled-button';
import bookingPozadi from "../../img/Booking_pozadi.png";
import sanitizeHtml from 'sanitize-html';
import dayjs from "dayjs";
import { getLectorName } from "../../getLectorName";
import { getLectorPlainTextName } from "../../parseName";
import { linkClick } from "../../routing";
import { renderDeleteBooking } from "../deleteBooking/renderer";
import { deleteBookingAfter } from "../deleteBooking/afterRender";

function emptyCache() {
    let result = [];

    for (let i = 0; i < 12; i++) {
        result.push(null);
    }
    
    return result;
}

function getClosestBookedDate(date, bookedDates) {
    let result = null;
    let minDiff = 10000000000000

    for (let i = 0; i < bookedDates.length; i++) {
        let bookTime = dayjs(bookedDates[i]["start"]);
        let diff = Math.abs(dayjs(date).diff(bookTime));

        
        if (diff < minDiff) {
            minDiff = diff;
            result = i;
        }
    }
    
    return bookedDates[result];
}

let todayCache = emptyCache();

function renderMyBookings(bookings, lector) {
    console.log(lector);

    let today = dayjs().format('YYYY-MM-DD');

    let closest = getClosestBookedDate(today, bookings);
    console.log(closest);

    return /*html */`
    <img src="${whiteLogo}" alt="Logo" class="backButton" id="backButton">
    <img src="${bookingPozadi}" alt="Pozadi" class="bookPozadi">

    <div class="bookPage">
        <div class="bookLectorContainer">
            <div class="calendaryCol">
                <div class="calendaryCenter">
                    <div type="date" id="bookDate" name="bookDate" value="${today}"></div>
                </div>

                <div class="calendaryBottom">
                    <h3>Dobrý den, ${sanitizeHtml(getLectorPlainTextName(lector))}!</h3>

                    <h3> Nejbližší rezervace: <span class="timeText">${dayjs(closest["start"]).format('DD.MM.YYYY HH:mm')}</span></h3>

                    <a href="/api/calendar/${localStorage.getItem("token").replaceAll("/", "&")}" target="_blank">
                    <md-filled-button class="downloadButton" id="downloadButton">
                        Exportovat kalendář
                    </md-filled-button>
                    </a>

                </div>
            </div>

            <div class="timesCol" id="timesCol">


            </div>

            <div class="meetingDetails" id="meetingDetails">

            </div>

        </div>
    </div>
    `;
}

function renderTime(index, isBooked, isStart = true, isFirst = false, isLast = false) {
    let time = index + 8;

    if (isBooked) {

        let styleClass = "";

        if (!isFirst) {
            styleClass += "buttonTopZero ";
        }

        if (!isLast) {
            styleClass += "buttonBottomZero ";
        }


        if (!isStart) {
            return /*html */`
                <md-filled-button class="timeSlot yellowButton ${styleClass}" data-timeIndex="${index}">
                    <span>${time}:00 - ${time + 1}:00</span>
                </md-filled-button>
        `;
        }

        return /*html */`
            <md-filled-button class="timeSlot blueButton ${styleClass}" data-timeIndex="${index}">
                <span>${time}:00 - ${time + 1}:00</span>
            </md-filled-button>
    `;
    } else {
        return /*html */`
            <md-text-button class="timeSlot" disabled="true" data-timeIndex="${index}">
                <span>${time}:00 - ${time + 1}:00</span>
            </md-text-button>
    `;
    }
}

function renderTodayTimes(bookedDates) {

    let result = "";

    let curDate = document.getElementById('bookDate').value;
    todayCache = emptyCache();

    let isBlue = false;

    for (let i = 0; i < 12; i++) {

        let curTime = dayjs().hour(i + 8).minute(0).second(0).millisecond(0).date(dayjs(curDate).date()).month(dayjs(curDate).month()).year(dayjs(curDate).year());

        curTime = curTime.toISOString();

        let isBooked = false;
        let isStart = false;
        let isFirst = false;
        let isLast = false;
        let data = {}

        for (let j = 0; j < bookedDates.length; j++) {
            if (curTime == bookedDates[j]["start"]) {
                isBooked = true;
                data = bookedDates[j];


                todayCache[i] = data;
                isStart = data["isStart"];
                
                if (isStart) {

                    if (isBlue) {
                        isBlue = false;
                    }
                    else {
                        isBlue = true;
                    }
                }

                isFirst = data["isStart"];
                isLast = data["isLast"];

                break;
            }
        }

        result += renderTime(i, isBooked, isBlue, isFirst, isLast);
    }

    document.getElementById("timesCol").innerHTML = `
    
    <div class="timesContainer">
    ${result}
    </div>

    `;

    console.log(todayCache);

    for (let i = 0; i < 12; i++) {
        if (todayCache[i] != null) {
            document.getElementById("timesCol").querySelectorAll(".timeSlot")[i].addEventListener("click", () => {
                renderBookingDetails(todayCache[i]);
            });
        }
    }

}

function renderBookingDetails(booking) {
    console.log(booking);

    let startTime = dayjs(booking["startTime"]);

    let endTime = dayjs(booking["endTime"]);

    let onlineText = booking["isOnline"] ? "Online" : "Osobně";

    document.getElementById("meetingDetails").innerHTML = /*html */`
    <div class="meetingDetailsBox">
        <h3 class="meetingDetailsTime">
            ${startTime.format('DD.MM.YYYY HH:mm')} - ${endTime.format('HH:mm')}
        </h3>
        <div class="meetingDetailsName">
            <h3>${booking["name"]}</h3>
            <hr>
        </div>
        <div class="meetingDetailsContacts">
            <a href="mailto:${booking["email"]}">${booking["email"]}</a>
            <a href="tel:${booking["phone"]}">${booking["phone"]}</a>
        </div>
        <div  class="meetingDetailsNote">
            <h3>${booking["note"]}</h3>
        </div>
        <span class="meetingDetailsOnline">
        ${onlineText}
        </span>

        <md-filled-button class="deleteButton" id="deleteButton" data-uuid="${booking["uuid"]}">Smazat</md-filled-button>

        <div class="meetingDetailsTags">

        ${booking["tags"].map(tag => {
            return renderTag(tag);
        }).join('')}

        </div>
        
    </div>
    `

    document.getElementById("deleteButton").addEventListener("click", () => {

        if (!confirm("Opravdu chcete smazat rezervaci?")) {
            return;
        }

        fetch("/api/deleteBooking", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                { 
                    "uuid": booking["uuid"],
                    "token": localStorage.getItem("token")
                }
                )
        }).then((response) => response.json())
            .then((data) => {
                console.log(data);
                document.getElementById("mainPage").innerHTML = renderDeleteBooking(booking);
                deleteBookingAfter(booking);
            });
    });
            

}

function renderTag(tag) {
    //console.log(tag);
    return /*html */`
    <span class="lectorTag" data-uuid="${tag.uuid}"> 
        ${sanitizeHtml(tag.name)} 
    </span>
    `;
}

export { renderMyBookings, renderTodayTimes };
