import dayjs from "dayjs";

let highlights = {};
const months = ["Leden", "Únor", "Březen", "Duben", "Květen", "Červen", "Červenec", "Srpen", "Září", "Říjen", "Listopad", "Prosinec"];

function highlightCalendar() {

    for (const [key, value] of Object.entries(highlights)) {
        console.log(`${key}: ${value}`);

        let el = document.querySelector('[aria-label="' + key + '"]');

        if (el != null) {
            el.style.backgroundColor = "rgba(254, 203, 46, " + value * 1 / 12 + ")";
        }
    }

}

function initHighlights(bookings) {

    console.log(bookings);

    highlights = {};

    for (let i = 0; i < bookings.length; i++) {
        let start = dayjs(bookings[i].startTime);

        let string = months[start.month()] + " " + start.date() + ", " + start.year();

        //console.log(string);

        if (highlights[string] == undefined) {
            highlights[string] = 1;
        } else {
            highlights[string]++;
        }

        //console.log(highlights);
    }

    highlightCalendar();

    document.getElementsByClassName("flatpickr-calendar")[0].addEventListener("click", () => {
        highlightCalendar();
    });


    document.getElementsByClassName("flatpickr-next-month")[0].addEventListener("click", () => {
        highlightCalendar();
    });
}

export { highlightCalendar, initHighlights };