import vlevoDole from "../../img/Tvar_vlevo_dole.png";
import vpravoDole from "../../img/Tvar_vpravo_dole.png";
import vpravoNahore from "../../img/Tvar_pravo_nahore.png";
import whiteLogo from "../../img/LOGO_white.svg?url";
import TdCat from "../../img/tour_de_cat.png";

function renderNotFoundPage() {
  return /*html*/ `
  <img src="${whiteLogo}" alt="Logo" class="backButton" id="backButton">

  <img class="vlevoDole" src="${vlevoDole}">
  <img class="vpravoDole" src="${vpravoDole}">
  <img class="vpravoNahore" src="${vpravoNahore}">

  <div class="lectorContainer" style="width: 100%;">
  <div class="notFoundText">
  Error 404: 
  Stránka nenalezena, zatím jsem tu jednom já.
  </div>
  <div class="flexbox">
  <img src="${TdCat}" class="notFoundImg">
  </div>
  </div>

  `;
}

export { renderNotFoundPage };