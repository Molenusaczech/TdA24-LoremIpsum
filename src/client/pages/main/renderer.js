import vlevoDole from "../../img/Tvar_vlevo_dole.png";
import vpravoDole from "../../img/Tvar_vpravo_dole.png";
import vpravoNahore from "../../img/Tvar_pravo_nahore.png";
import whiteLogo from "../../img/LOGO_white.svg?url";
import '@material/web/slider/slider.js';
import sanitizeHtml from 'sanitize-html';

function formatSliderValue(value) {
    if (value == null) {
        return "0";
    }
    return value+"&nbsp;Kč/hod";
}

function renderMain(lectors, tags, locations, minPrice, maxPrice) {
    console.log(tags);
    return /*html */`
    <img src="${whiteLogo}" alt="Logo" class="backButton" id="backButton">

    <div class="mainPageContainer">
        <h1 class="pageTitle">Katalog lektorů</h1>
        <div id="filter">
            <div class="filterPrice">
                <div class="sliderContainer">

                <span id="minPrice">${formatSliderValue(minPrice)}</span>
                <md-slider 
                    range 
                    min="${minPrice}"
                    max="${maxPrice}"
                    value-start="${minPrice}" 
                    value-end="${maxPrice}" 
                    labeled
                    style="width: 90%;"
                    id="priceSlider"
                ></md-slider>
                <span id="maxPrice">${formatSliderValue(maxPrice)}</span>
                </div>

            </div>
            <div>
                Aktivity: <span id="tagReset" class="resetButton">Zrušit výběr</span>
            </div>
            <div class="filterTags" id="filterTags">
            </div>
            <div>
                Místo působení:
                <span id="locationReset" class="resetButton">Zrušit výběr</span>
            </div>
            <div class="filterLocation" id="filterLocation">
            </div>
        </div>

        <div id="lectors">
        </div>
    </div>

    <img class="vlevoDole" src="${vlevoDole}">
    <img class="vpravoDole" src="${vpravoDole}">
    <img class="vpravoNahore" src="${vpravoNahore}">


    `;
}




export { renderMain };