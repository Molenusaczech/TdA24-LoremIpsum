import "./style.css";


import { changeFavicon } from "./setFavicon.js";

import { renderPage, linkClick } from "./routing.js";

import faviconUrl from "./img/favicon.png";

const currentUrl = window.location.pathname;
const uuidRegex = /^\/lecturer\/[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}/;

console.log(currentUrl);

changeFavicon(faviconUrl);

//renderPage(currentUrl);

// link click, so it pushes into history
linkClick(currentUrl);


