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

import { renderPage } from "./routing.js";

import faviconUrl from "./img/favicon.png";

const currentUrl = window.location.pathname;
const uuidRegex = /^\/lecturer\/[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}/;

console.log(currentUrl);

changeFavicon(faviconUrl);

renderPage(currentUrl);


