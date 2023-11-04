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

import faviconUrl from "./img/favicon.png";

const currentUrl = window.location.pathname;
console.log(currentUrl);

changeFavicon(faviconUrl);

switch (currentUrl) {

  case "/":
    console.log("home");
    document.getElementById("mainPage").innerHTML = renderMain();
    mainAfter();
    break;
  case "/lecturer":
    document.getElementById("mainPage").innerHTML = renderLecturer(defaultLecturer);
    lecturerAfter();
    changeFavicon(defaultLecturer.picture_url);
    document.title = getLectorName(defaultLecturer);
    break;
}
