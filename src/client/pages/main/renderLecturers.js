import { lectorCard } from "./lectorCard";
import { registerListeners } from "./filter";

let page = 1;
const perPage = 10;

let lecturerCache = [];

function renderAllLecturers(lecturers) {

    lecturerCache = lecturers;
    page = 1;

    let curLecturers = lecturers.slice(0, perPage);

    if (curLecturers.length == 0) {
        document.getElementById("lectors").innerHTML = "<div class='lectorListName' style='text-align: center;'>Žádní lektoři nenalezeni</div>";
        return;
    }
    document.getElementById("lectors").innerHTML = curLecturers.map(lector => lectorCard(lector)).join("");
    registerListeners(curLecturers);
    updateButtonVisibility();
}

function appendLecturers(lecturers) {
    document.getElementById("lectors").innerHTML += lecturers.map(lector => lectorCard(lector)).join("");
    registerListeners(lecturers);
}

function renderNextLecturers() {
    page++;

    const start = (page - 1) * perPage;
    const end = page * perPage;

    appendLecturers(lecturerCache.slice(start, end));
    updateButtonVisibility();
}

function updateButtonVisibility() {
    if (lecturerCache.length > page * perPage) {
        document.getElementById("loadMore").style.visibility = "visible";
    } else {
        document.getElementById("loadMore").style.visibility = "hidden";
    }
}

export { renderAllLecturers, renderNextLecturers };