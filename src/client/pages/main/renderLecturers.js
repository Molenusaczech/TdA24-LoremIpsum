import { lectorTitle } from "./renderer.js";
import { registerListeners } from "./filter";

function renderAllLecturers(lecturers) {
    if (lecturers.length == 0) {
        document.getElementById("lectors").innerHTML = "<div class='lectorListName' style='text-align: center;'>Žádní lektoři nenalezeni</div>";
        return;
    }
    document.getElementById("lectors").innerHTML = lecturers.map(lector => lectorTitle(lector)).join("");
    registerListeners(lecturers);
}

export { renderAllLecturers };