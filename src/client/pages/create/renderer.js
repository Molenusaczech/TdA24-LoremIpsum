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
                <h1>Projekt <span class="blueText">AMOS</span></h1>
                <div class="pageTopRowAdmin">
                </div>
            </div>
            <hr>
        </div>
    </div>

    <div class="formPageContainer">
        <img src="${pageTitleIcon}" alt="IkonaTitle" class="mainTitleIcon">
        <h1 class="pageTitle">Vytvořit aktivitu</h1>
        
        <md-outlined-text-field label="Jméno aktivity" id="titleInput">
            <md-icon slot="leading-icon">edit</md-icon>
        </md-outlined-text-field>
        <md-outlined-text-field label="Minimální délka" id="minLenghtInput">
            <md-icon slot="leading-icon">schedule</md-icon>
        </md-outlined-text-field>
        <md-outlined-text-field label="Maximální délka" id="maxLenghtInput">
            <md-icon slot="leading-icon">schedule</md-icon>
        </md-outlined-text-field>
        <md-outlined-text-field label="Struktura aktivity" id="structureInput">
            <md-icon slot="leading-icon">edit</md-icon>
        </md-outlined-text-field>
        <md-outlined-text-field
            type="textarea"
            label="Popisek aktivity"
            class="bookTextbox"
            id="descriptionInput"
            rows="3">
        </md-outlined-text-field>

        <div class="createObjective">

            <h2 class="inputsTitle">Cíle</h2>

            <div id="objectiveList">
            
            </div>

            <md-outlined-text-field label="Úloha" id="objectiveInput">
                <md-icon slot="leading-icon">edit</md-icon>
            </md-outlined-text-field>
            <md-filled-button class="createButton" id="addObjective">+</md-filled-button>

        </div>

        <div class="createEdLevel">

        <h2 class="inputsTitle">Úrovně vzdělání</h2>

             <div id="edLevelList">
        
             </div>

            <md-outlined-text-field label="Vzdělání" id="edLevelInput">
                <md-icon slot="leading-icon">school</md-icon>
            </md-outlined-text-field>
            <md-filled-button class="createButton" id="addEdLevel">+</md-filled-button>

        </div>

        <div class="createTools">

        <h2 class="inputsTitle">Nástroje</h2>

             <div id="toolList">
        
             </div>

            <md-outlined-text-field label="Nástroj" id="toolInput">
                <md-icon slot="leading-icon">build</md-icon>
            </md-outlined-text-field>
            <md-filled-button class="createButton" id="addTool">+</md-filled-button>

        </div>

        <div class="createHomePreparation">

            <h2 class="inputsTitle">Domácí příprava</h2>

            <div id="prepList">
        
             </div>
    
            <md-outlined-text-field label="Název" id="prepTitleInput">
                <md-icon slot="leading-icon">edit</md-icon>
            </md-outlined-text-field>
            <md-outlined-text-field label="WARN -PŘELOŽIT DO ČEŠTINY-" id="prepWarnInput">
                <md-icon slot="leading-icon">error</md-icon>
            </md-outlined-text-field>
            <md-outlined-text-field
                type="textarea"
                label="Zpráva na domácí příprava"
                class="bookTextbox"
                id="prepNoteInput"
                rows="3">
            </md-outlined-text-field>

            <md-filled-button class="createButton" id="addPrep">+</md-filled-button>


        </div>

        <div class="createHomePreparation">

    
            <h2 class="inputsTitle">Instrukce</h2>

            <div id="instrList"> </div>

            <md-outlined-text-field label="Název" id="instructionTitleInput">
                <md-icon slot="leading-icon">edit</md-icon>
            </md-outlined-text-field>
            <md-outlined-text-field label="WARN -PŘELOŽIT DO ČEŠTINY-" id="instructionWarnInput">
                <md-icon slot="leading-icon">error</md-icon>
            </md-outlined-text-field>
            <md-outlined-text-field
                type="textarea"
                label="Zpráva na domácí příprava"
                class="bookTextbox"
                id="instructionNoteInput"
                rows="3">
            </md-outlined-text-field>

            <md-filled-button class="createButton" id="addInstr">+</md-filled-button>

        </div>

        <div class="createAgenda">
    
            <h2 class="inputsTitle">Agenda</h2>

            <div id="agendaList"> </div>

            <md-outlined-text-field label="Délka trvání" id="agendaDurationInput">
                <md-icon slot="leading-icon">schedule</md-icon>
            </md-outlined-text-field>
            <md-outlined-text-field label="Název" id="agendaTitleInput">
                <md-icon slot="leading-icon">edit</md-icon>
            </md-outlined-text-field>
            <md-outlined-text-field
                type="textarea"
                label="Popis"
                class="bookTextbox"
                id="agendaDescriptionInput"
                rows="3">
            </md-outlined-text-field>

            <md-filled-button class="createButton" id="addAgenda">+</md-filled-button>


        </div>

        <div class="createLinks">
    
            <h2 class="inputsTitle">Odkazy</h2>

            <div id="linkList"> </div>

            <md-outlined-text-field label="URL" id="linkUrlInput">
                <md-icon slot="leading-icon">link</md-icon>
            </md-outlined-text-field>
            <md-outlined-text-field label="Název" id="linkTitleInput">
                <md-icon slot="leading-icon">edit</md-icon>
            </md-outlined-text-field>

            <md-filled-button class="createButton" id="addLink">+</md-filled-button>


        </div>

        <div class="createGallery">
    
            <h2 class="inputsTitle">Galerie</h2>

            <div id="galleryList"> </div>

            <md-outlined-text-field label="Název galerie" id="galleryTitleInput">
                <md-icon slot="leading-icon">edit</md-icon>
            </md-outlined-text-field>

            <md-filled-button class="createButton" id="addGallery">+</md-filled-button>
        </div>


        <md-filled-button class="createButtonFin" id="submitActivity">Vytvořit ke schválení</md-filled-button>

    </div>

    `;
}

function renderTask(name) {
    return /*html*/`
    <div class="task">
        <p>${name}<md-icon class="deleteTask" data-task="${name}">delete</md-icon></p>
    </div>
    `;
}

function renderEdLevel(name) {
    return /*html*/`
    <div class="task">
        <p>${name}<md-icon class="deleteTask" data-edLevel="${name}">delete</md-icon></p>
    </div>
    `;
}

function renderPrep(prep, index) {
    return /*html*/`
    <div class="task">
        <p>${prep.title}</p>
        <p>${prep.warn}</p>
        <p>${prep.note}</p>
        <md-icon class="deleteTaskLong" data-prep="${index}">delete</md-icon>
    </div>
    `;
}

function renderInstructions(instr, index) {
    return /*html*/`
    <div class="task">
        <p>${instr.title}</p>
        <p>${instr.warn}</p>
        <p>${instr.note}</p>
        <md-icon class="deleteTaskLong" data-instr="${index}">delete</md-icon>
    </div>
    `;
}

function renderAgenda(agenda, index) {
    return /*html*/`
    <div class="task">
        <p>${agenda.duration}</p>
        <p>${agenda.title}</p>
        <p>${agenda.description}</p>
        <md-icon class="deleteTaskLong" data-agenda="${index}">delete</md-icon>
    </div>
    `;
}

function renderLinks(link, index) {
    return /*html*/`
    <div class="task">
        <p>${link.title}</p>
        <p>${link.url}</p>
        <md-icon class="deleteTaskLong" data-link="${index}">delete</md-icon>
    </div>
    `;
}

function renderGallery(gallery, index) {
    return /*html*/`
    <div class="task">
        <p>${gallery.name}</p>
        <md-icon class="deleteGallery" data-gallery="${index}">delete</md-icon>

        <div class="createGallerySub">
    
                <h3 class="inputsTitle">Obrázky</h3>

                ${gallery.images.map((img, imgindex) => {
                    return renderImage(img, imgindex, index);
                }).join("")}

                <md-outlined-text-field label="URL" data-galleryInput="${index}">
                    <md-icon slot="leading-icon">person</md-icon>
                </md-outlined-text-field>

                <md-filled-button class="createButton" data-galleryButton="${index}">+</md-filled-button>

            </div>
    </div>
    `;
};

function renderImage(image, index, galleryIndex) {
    return /*html*/`
    <!--<img src="${image}" alt="Image">-->
    <div data-image="${index+";"+galleryIndex}"> ${image}
    <md-icon class="deleteLink" data-delimage="${index+";"+galleryIndex}">delete</md-icon>
    </div>
    `;
}

function renderTool(tool, index) {
    return /*html*/`
    <div class="task">
        <p>${tool}</p>
        <md-icon class="deleteTool" data-tool="${index}">delete</md-icon>
    </div>
    `;
}

export { 
    renderCreate, 
    renderTask, 
    renderEdLevel, 
    renderPrep,
    renderInstructions,
    renderAgenda,
    renderLinks,
    renderGallery,
    renderTool
};