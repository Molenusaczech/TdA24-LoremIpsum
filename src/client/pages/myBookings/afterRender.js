import { linkClick } from "../../routing";
import { renderTodayTimes } from "./renderer";
import dayjs from "dayjs";
import { highlightCalendar, initHighlights } from "./calendarHighlight";

function formatDates(dates) {
    let result = [];
    for (let date of dates) {
        for (let i = 0; i < date.length; i++) {
            result.push({
                uuid: date.uuid,
                start: dayjs(date.start).add(i, 'hour').toISOString(),
                startTime: dayjs(date.start).toISOString(),
                endTime: dayjs(date.start).add(date.length, 'hour').toISOString(),
                name: date.name,
                email: date.email,
                phone: date.phone,
                note: date.note,
                tags: date.Tags,
                isOnline: date.isOnline,
                length: date.length,
                isStart: i == 0,
                isLast: i == date.length - 1
            });
        }

    };

    return result;
}

function myBookingsAfter(bookedDates) {

    console.log(bookedDates);

    bookedDates = formatDates(bookedDates);

    document.getElementById("backButton").addEventListener("click", () => {
        linkClick("/");
    });

    flatpickr("#bookDate", {
        inline: true,
        defaultDate: new Date().fp_incr(0),
        minDate: new Date().fp_incr(0),
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
            highlightCalendar();
        }
    });

    renderTodayTimes(bookedDates);
    initHighlights(bookedDates);
}

export { myBookingsAfter };