/*import { renderLecturer } from "./pages/lecturer/renderer";
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


import { renderGDPR, renderToS } from "./pages/legal/renderer.js";
import { LegalAfter } from "./pages/legal/afterRender.js";

import { renderBook } from "./pages/book/renderer.js";
import { bookAfter } from "./pages/book/afterRender.js";


import { renderMyBookings } from "./pages/myBookings/renderer.js";
import { myBookingsAfter } from "./pages/myBookings/afterRender.js";

import { renderSuccess } from "./pages/success/renderer.js";
import { successAfter } from "./pages/success/afterRender.js";

import { getLectorPlainTextName } from "./parseName.js";
import { getPriceInfo } from "./getPriceInfo.js";

import { renderDeleteBooking } from "./pages/deleteBooking/renderer.js";
import { deleteBookingAfter } from "./pages/deleteBooking/afterRender.js";

const bookRegex = /^\/book\/[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}/;
*/

import { renderNotFoundPage } from "./pages/notFound/renderer.js";
import { notFoundAfter } from "./pages/notFound/afterRender.js";
import { renderLoading } from "./pages/loading/renderer.js";

import { changeFavicon } from "./setFavicon.js";

import faviconUrl from "./img/favicon.png";

import { renderGrfMain } from "./pages/grfMain/renderer.js";
import { grfMainAfter } from "./pages/grfMain/afterRender.js";
const activityRegex = /^\/aktivita\/[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}/;

import { renderActivityDetail } from "./pages/detail/renderer.js";
import { detailAfter } from "./pages/detail/afterRender.js";

import { renderCreate } from "./pages/create/renderer.js";
import { createAfter } from "./pages/create/afterRender.js";

import { renderLogin } from "./pages/login/renderer.js";
import { loginAfter } from "./pages/login/afterRender.js";

import { renderAdmin } from "./pages/admin/renderer.js";
import { adminAfter } from "./pages/admin/afterRender.js";

function renderPage(currentUrl) {
    renderLoading();

    if (currentUrl == "/" || currentUrl == "") {
        console.log("home");
        changeFavicon(faviconUrl);
        document.title = "AMOS - Aktivity"

        fetch("/api/activity/")
            .then(response => {
                return response.json();
            })
            .then(data => {
                //document.getElementById("mainPage").innerHTML = renderActivityDetail(data);
                //detailAfter();

                document.getElementById("mainPage").innerHTML = renderGrfMain(data);
                grfMainAfter();
            });

            /*
        document.getElementById("mainPage").innerHTML = renderGrfMain();
        grfMainAfter();*/


    } else if (activityRegex.test(currentUrl)) {
        console.log("activity");
        changeFavicon(faviconUrl);
        document.title = "Detail akivity";

        let split = currentUrl.split("/");
        let uuid = split[2];

        fetch("/api/activity/" + uuid)
            .then(response => {
                return response.json();
            })
            .then(data => {
                document.getElementById("mainPage").innerHTML = renderActivityDetail(data);
                detailAfter();
            });

        /*document.getElementById("mainPage").innerHTML = renderActivityDetail({
            "data": "amogus"
        });
        detailAfter();*/

    } else if (currentUrl == "/create") {
        console.log("create");
        changeFavicon(faviconUrl);
        document.title = "Vytvořit aktivitu";

        document.getElementById("mainPage").innerHTML = renderCreate();
        createAfter();

    } else if (currentUrl == "/login") {
        console.log("login");
        changeFavicon(faviconUrl);
        document.title = "Přihlášení";

        document.getElementById("mainPage").innerHTML = renderLogin();
        loginAfter();

    } else if (currentUrl == "/admin") {
        console.log("admin");
        changeFavicon(faviconUrl);
        document.title = "Administrace";

        document.getElementById("mainPage").innerHTML = renderAdmin();
        adminAfter();

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