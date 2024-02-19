import { linkClick } from "../../routing";
import { renderTimes } from "./renderer";
import flatpickr from "flatpickr";

function bookAfter() {
    document.getElementById("backButton").addEventListener("click", () => {
        linkClick("/");
    });

    flatpickr("#bookDate",{
        inline: true,
        minDate: new Date().fp_incr(1),
        maxDate: new Date().fp_incr(30),
        defaultDate: new Date().fp_incr(1),
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
        
    });

    renderTimes();
}

export { bookAfter };