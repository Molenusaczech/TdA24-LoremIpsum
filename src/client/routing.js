import { renderLecturer } from "./pages/lecturer/renderer";
import { lecturerAfter } from "./pages/lecturer/afterRender";
import { defaultLecturer } from "./defaultLecturer";

import { renderMain } from "./pages/main/renderer";
import { mainAfter } from "./pages/main/afterRender";
import { changeFavicon } from "./setFavicon.js";
import { getLectorName } from "./getLectorName.js";

import { renderNotFoundPage } from "./pages/notFound/renderer.js";
import { notFoundAfter } from "./pages/notFound/afterRender.js";
import { renderLoading } from "./pages/loading/renderer.js";

import faviconUrl from "./img/favicon.png";

const uuidRegex = /^\/lecturer\/[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}/;

function renderPage(currentUrl) {
    renderLoading();

    if (currentUrl == "/") {
        console.log("home");
        changeFavicon(faviconUrl);
        document.title = "Teacher Digital Agency"

        fetch("/lecturers")
            .then((response) => response.json())
            .then((data) => {
                document.getElementById("mainPage").innerHTML = renderMain(data);
                mainAfter(data);
            });
    } else if (currentUrl == "/lecturer") {
        document.getElementById("mainPage").innerHTML = renderLecturer(defaultLecturer);
        lecturerAfter();
        changeFavicon(defaultLecturer.picture_url);
        document.title = getLectorName(defaultLecturer);
    } else if (currentUrl.match(uuidRegex)) {
        fetch("/lecturers/" + currentUrl.split("/")[2])
            .then((response) => response.json())
            .then((data) => {
                document.getElementById("mainPage").innerHTML = renderLecturer(data);
                lecturerAfter();
                changeFavicon(data.picture_url);
                document.title = getLectorName(data);
            });
    } else {
        document.getElementById("mainPage").innerHTML = renderNotFoundPage();
        notFoundAfter();
    }
}

function linkClick(link) {
    window.history.pushState({"html":"placeholder","pageTitle":link},"", link);
    renderPage(link);
}

window.onpopstate = function(e){
    if(e.state){
        console.log(e.state);
        renderPage(e.state.pageTitle);
    }
};

export { renderPage, linkClick };