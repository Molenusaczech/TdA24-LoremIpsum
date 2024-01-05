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
import { getAllTags } from "./getAllTags.js";
import { getAllLocations } from "./getAllLocations.js";

import faviconUrl from "./img/favicon.png";

const uuidRegex = /^\/lecturer\/[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}/;

function renderPage(currentUrl) {
    renderLoading();

    if (currentUrl == "/" || currentUrl == "") {
        console.log("home");
        changeFavicon(faviconUrl);
        document.title = "Teacher Digital Agency"

        /*fetch("/api/lecturers")
            .then((response) => response.json())
            .then((data) => {
                let tags = getAllTags(data);
                let locations = getAllLocations(data);
                document.getElementById("mainPage").innerHTML = renderMain(data, tags, locations);
                mainAfter(data);
            });*/

        
        let filterData = fetch("/api/filterData").then((response) => response.json());

        let lecturers = fetch("/api/lecturers").then((response) => response.json());

        Promise.all([filterData, lecturers]).then((values) => {
            
            let filterData = values[0]
            let lecturers = values[1]

            console.log(filterData);
            console.log(lecturers);

            let tags = filterData.tags.map((tag) => {
                return {
                    name: tag.name,
                    uuid: tag.uuid
                }
            });
            let locations = filterData.locations;
            let minPrice = filterData.minPrice;
            let maxPrice = filterData.maxPrice;
            //console.log(tags);

            document.getElementById("mainPage").innerHTML = renderMain(lecturers, tags, locations, minPrice, maxPrice);
            mainAfter(lecturers, tags, locations);
        });



    } else if (currentUrl == "/lecturer") {
        document.getElementById("mainPage").innerHTML = renderLecturer(defaultLecturer);
        lecturerAfter();
        changeFavicon(defaultLecturer.picture_url);
        document.title = getLectorName(defaultLecturer);
    } else if (currentUrl.match(uuidRegex)) {
        fetch("/api/lecturers/" + currentUrl.split("/")[2])
            .then((response) => response.json())
            .then((data) => {

                data.code ?? 200;

                if (data.code == 404) {
                    document.getElementById("mainPage").innerHTML = renderNotFoundPage();
                    notFoundAfter();
                    return;
                }

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
    window.history.pushState({ "html": "placeholder", "pageTitle": link }, "", link);
    renderPage(link);
}

window.onpopstate = function (e) {
    if (e.state) {
        console.log(e.state);
        renderPage(e.state.pageTitle);
    }
};

export { renderPage, linkClick };