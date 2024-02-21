import { linkClick } from "../../routing";
import { renderTodayTimes } from "./renderer";
import dayjs from "dayjs";

function getDaysArray(dates) {

}

function myBookingsAfter(bookedDates) {
    document.getElementById("backButton").addEventListener("click", () => {
        linkClick("/");
    });

    flatpickr("#bookDate",{
        inline: true,
        defaultDate: new Date().fp_incr(0),
        minDate: new Date().fp_incr(-7),
        locale: {
            firstDayOfWeek: 1,
            weekdays: {
                shorthand: ['NE', 'PO', 'ÚT', 'ST', 'ČV', 'PÁ', 'SO'],
                longhand: ['Neděle', 'Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek', 'Sobota'],
            },
            months: {
                shorthand: ['Led', 'Úno', 'Bře', 'Dub', 'Kvě', 'Čvn', 'Čvc', 'Srp', 'Zář', 'Říj', 'Lis', 'Pro'],
                longhand: ['Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen', 'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec'],
            },
        },
        onChange: (selectedDates, dateStr, instance) => {
            renderTodayTimes(bookedDates);
        }
    });

    renderTodayTimes(bookedDates);
}

export { myBookingsAfter };