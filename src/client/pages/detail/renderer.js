import whiteLogo from "../../img/LOGO_white.svg?url";

import '@material/web/textfield/outlined-text-field';
import '@material/web/icon/icon';

import '@material/web/button/filled-button';

function renderActivityDetail() {
    return /*html*/`
  <img src="${whiteLogo}" alt="Logo" class="backButton" id="backButton">

    <div class="aiPageContainer">
        <h1 class="pageTitle">Detail akivity</h1>
        
        <h1 class="detailName">Jméno</h1>
       
        <div class="detailObjective">Tady budou všechny objectives</div>

        <p class="detailSubDesc">Délka min</p>
        <p class="detailSubDesc">Délka max</p>
        <p class="detailSubDesc">Struktura</p>
        <div class="detailDesc">Popisek</div>

        <div class="detailObjective">Tady budou všechny edLevel</div>
        <div class="detailObjective">Tady budou všechny tools</div>
        <div class="detailObjective">Tady budou všechny home preparation</div>
        <div class="detailObjective">Tady budou všechny instructions</div>
        <div class="detailObjective">Tady budou všechny agenda</div>
        <div class="detailObjective">Tady budou všechny lists</div>
        <div class="detailObjective">Tady budou všechny galerie</div>


    </div>
    `;
}

export { renderActivityDetail };