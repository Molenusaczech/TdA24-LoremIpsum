import "./style.css";

import { setupCounter } from "./counter.js";
import javascriptLogo from "./javascript.svg";
import { JsxTest } from "./component";

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

const currentUrl = window.location.pathname;
console.log(currentUrl);

changeFavicon(faviconUrl);

renderLoading();

switch (currentUrl) {

  case "/":
    console.log("home");

    fetch("/lecturers")
      .then((response) => response.json())
      .then((data) => {
        document.getElementById("mainPage").innerHTML = renderMain(data);
        mainAfter(data);
      });
    break;
  case "/lecturer":
    document.getElementById("mainPage").innerHTML = renderLecturer(defaultLecturer);
    lecturerAfter();
    changeFavicon(defaultLecturer.picture_url);
    document.title = getLectorName(defaultLecturer);
    break;
  default:
    document.getElementById("mainPage").innerHTML = renderNotFoundPage();
    notFoundAfter();
    break;
}
