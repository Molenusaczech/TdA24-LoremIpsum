import "./style.css";

import { setupCounter } from "./counter.js";
import javascriptLogo from "./javascript.svg";
import { JsxTest } from "./component";

import { changeFavicon } from "./setFavicon.js";

import { renderPage } from "./routing.js";

import faviconUrl from "./img/favicon.png";

const currentUrl = window.location.pathname;
const uuidRegex = /^\/lecturer\/[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}/;

console.log(currentUrl);

changeFavicon(faviconUrl);

renderPage(currentUrl);


