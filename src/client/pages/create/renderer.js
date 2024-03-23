import whiteLogo from "../../img/LOGO_white.svg?url";
import pageTitleIcon from "../../img/pageTitleIcon_white.png";

import '@material/web/textfield/outlined-text-field';
import '@material/web/icon/icon';

import '@material/web/button/filled-button';

function renderCreate() {
    return /*html*/`
    <div class="pageTop">
        <div class=pageTopBack>
            <div class="pageTopRow">
                <img src="${whiteLogo}" alt="Logo" class="backButton" id="backButton">
                <h1>Project <span class="blueText">AMOS</span></h1>
                <div class="pageTopRowAdmin">
                    dadad
                </div>
            </div>
            <hr>
        </div>
    </div>

    <div class="aiPageContainer">
        <img src="${pageTitleIcon}" alt="IkonaTitle" class="mainTitleIcon">
        <h1 class="pageTitle">Vytvořit aktivitu</h1>
        
        <md-outlined-text-field label="Jméno aktivity" id="(jmeno)">
            <md-icon slot="leading-icon">person</md-icon>
        </md-outlined-text-field>
        <md-outlined-text-field label="Minimální délka" id="(delka min)">
            <md-icon slot="leading-icon">person</md-icon>
        </md-outlined-text-field>
        <md-outlined-text-field label="Maximální délka" id="(delka max)">
            <md-icon slot="leading-icon">person</md-icon>
        </md-outlined-text-field>
        <md-outlined-text-field label="Struktura aktivity" id="(struktura)">
            <md-icon slot="leading-icon">person</md-icon>
        </md-outlined-text-field>
        <md-outlined-text-field
            type="textarea"
            label="Popisek aktivity"
            class="bookTextbox"
            id="(Popisek)"
            rows="3">
        </md-outlined-text-field>

        <div class="createObjective">

            <h2 class="inputsTitle">Vytvořit úlohu</h2>
            <md-outlined-text-field label="Úloha" id="(objective string)">
                <md-icon slot="leading-icon">person</md-icon>
            </md-outlined-text-field>

        </div>

        <div class="createEdLevel">

        <h2 class="inputsTitle">Úrovně vzdělání</h2>
            <md-outlined-text-field label="Vzdělání" id="(edLevel string)">
                <md-icon slot="leading-icon">person</md-icon>
            </md-outlined-text-field>

        </div>

        <div class="createHomePreparation">
    
            <h2 class="inputsTitle">Domácí příprava</h2>
            <md-outlined-text-field label="Název" id="(HomePreparation title)">
                <md-icon slot="leading-icon">person</md-icon>
            </md-outlined-text-field>
            <md-outlined-text-field label="WARN -PŘELOŽIT DO ČEŠTINY-" id="(HomePreparation warn)">
                <md-icon slot="leading-icon">person</md-icon>
            </md-outlined-text-field>
            <md-outlined-text-field
                type="textarea"
                label="Zpráva na domácí příprava"
                class="bookTextbox"
                id="(HomePreparation note)"
                rows="3">
            </md-outlined-text-field>

        </div>

        <div class="createHomePreparation">
    
            <h2 class="inputsTitle">Instrukce</h2>
            <md-outlined-text-field label="Název" id="(Instruction title)">
                <md-icon slot="leading-icon">person</md-icon>
            </md-outlined-text-field>
            <md-outlined-text-field label="WARN -PŘELOŽIT DO ČEŠTINY-" id="(Instruction warn)">
                <md-icon slot="leading-icon">person</md-icon>
            </md-outlined-text-field>
            <md-outlined-text-field
                type="textarea"
                label="Zpráva na domácí příprava"
                class="bookTextbox"
                id="(Instruction note)"
                rows="3">
            </md-outlined-text-field>

        </div>

        <div class="createAgenda">
    
            <h2 class="inputsTitle">Agenda</h2>
            <md-outlined-text-field label="Délka trvání" id="(Agenda duration)">
                <md-icon slot="leading-icon">person</md-icon>
            </md-outlined-text-field>
            <md-outlined-text-field label="Název" id="(Agenda title)">
                <md-icon slot="leading-icon">person</md-icon>
            </md-outlined-text-field>
            <md-outlined-text-field
                type="textarea"
                label="Popis"
                class="bookTextbox"
                id="(Agenda description)"
                rows="3">
            </md-outlined-text-field>

        </div>

        <div class="createLinks">
    
            <h2 class="inputsTitle">Odkazy</h2>
            <md-outlined-text-field label="URL" id="(Links URL)">
                <md-icon slot="leading-icon">person</md-icon>
            </md-outlined-text-field>
            <md-outlined-text-field label="Název" id="(Links title)">
                <md-icon slot="leading-icon">person</md-icon>
            </md-outlined-text-field>

        </div>

        <div class="createGallery">
    
            <h2 class="inputsTitle">Galerie</h2>
            <md-outlined-text-field label="Název galerie" id="(Gallery title)">
                <md-icon slot="leading-icon">person</md-icon>
            </md-outlined-text-field>

            <div class="createGallerySub">
    
                <h3 class="inputsTitle">Obrázky</h3>
                <md-outlined-text-field label="URL" id="(Links URL)">
                    <md-icon slot="leading-icon">person</md-icon>
                </md-outlined-text-field>

            </div>
        </div>

        <md-filled-button class="createButton" id="(Vytvoř aktivitu)">Rezervovat</md-filled-button>

    </div>

    `;
}

export { renderCreate };