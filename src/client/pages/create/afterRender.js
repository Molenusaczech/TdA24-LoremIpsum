import {
    renderTask,
    renderEdLevel,
    renderPrep,
    renderInstructions,
    renderAgenda,
    renderLinks,
    renderGallery
} from "./renderer.js";

let objective = [];
let edLevels = [];
let prep = [];
let instructions = [];
let agenda = [];
let links = [];
let galleries = [];

function updateObjectives() {
    document.getElementById("objectiveInput").value = "";
    document.getElementById("objectiveList").innerHTML = objective.map((obj) => {
        return renderTask(obj);
    }).join("");
    console.log(objective);

    objective.forEach((obj) => {
        document.querySelector(`[data-task="${obj}"]`).addEventListener("click", () => {
            console.log("click");
            objective = objective.filter((item) => item !== obj);
            updateObjectives();
        });
    });
}

function updateEdLevels() {
    document.getElementById("edLevelInput").value = "";
    document.getElementById("edLevelList").innerHTML = edLevels.map((obj) => {
        return renderEdLevel(obj);
    }).join("");
    console.log(edLevels);

    edLevels.forEach((obj) => {
        document.querySelector(`[data-edLevel="${obj}"]`).addEventListener("click", () => {
            console.log("click");
            edLevels = edLevels.filter((item) => item !== obj);
            updateEdLevels();
        });
    });
}

function updatePrep() {
    document.getElementById("prepTitleInput").value = "";
    document.getElementById("prepWarnInput").value = "";
    document.getElementById("prepNoteInput").value = "";

    document.getElementById("prepList").innerHTML = prep.map((obj, index) => {
        return renderPrep(obj, index);
    }).join("");
    console.log(prep);

    prep.forEach((obj, index) => {
        document.querySelector(`[data-prep="${index}"]`).addEventListener("click", () => {
            console.log("click");
            // remove item at index
            prep = prep.filter((item, i) => i !== index);
            updatePrep();
        });
    });
}

function updateInstructions() {
    document.getElementById("instructionTitleInput").value = "";
    document.getElementById("instructionWarnInput").value = "";
    document.getElementById("instructionNoteInput").value = "";

    document.getElementById("instrList").innerHTML = instructions.map((obj, index) => {
        return renderInstructions(obj, index);
    }
    ).join("");
    console.log(instructions);

    instructions.forEach((obj, index) => {
        document.querySelector(`[data-instr="${index}"]`).addEventListener("click", () => {
            console.log("click");
            // remove item at index
            instructions = instructions.filter((item, i) => i !== index);
            updateInstructions();
        });
    }
    );
}

function updateAgenda() {
    document.getElementById("agendaDurationInput").value = "";
    document.getElementById("agendaTitleInput").value = "";
    document.getElementById("agendaDescriptionInput").value = "";

    document.getElementById("agendaList").innerHTML = agenda.map((obj, index) => {
        return renderAgenda(obj, index);
    }
    ).join("");
    console.log(agenda);
    

    agenda.forEach((obj, index) => {
        document.querySelector(`[data-agenda="${index}"]`).addEventListener("click", () => {
            console.log("click");
            // remove item at index
            agenda = agenda.filter((item, i) => i !== index);
            updateAgenda();
        });
    });
}

function updateLinks() {
    document.getElementById("linkTitleInput").value = "";
    document.getElementById("linkUrlInput").value = "";

    document.getElementById("linkList").innerHTML = links.map((obj, index) => {

        return renderLinks(obj, index);
    });

    links.forEach((obj, index) => {

        document.querySelector(`[data-link="${index}"]`).addEventListener("click", () => {
            console.log("click");

            links = links.filter((item, i) => i !== index);
            updateLinks();
        });
    });
}

function updateGalleries() {
    document.getElementById("galleryTitleInput").value = "";

    document.getElementById("galleryList").innerHTML = galleries.map((obj, index) => {
        return renderGallery(obj, index);
    }).join("");

    galleries.forEach((obj, index) => {
        document.querySelector(`[data-gallery="${index}"]`).addEventListener("click", () => {
            console.log("click");

            galleries = galleries.filter((item, i) => i !== index);
            updateGalleries();
        });

        document.querySelector(`[data-galleryButton="${index}"]`).addEventListener("click", () => {
            console.log("click");

            let galleryIndex = index;
            let imageInput = document.querySelector(`[data-galleryInput="${index}"]`).value;
            galleries[galleryIndex].images.push(imageInput);
            updateGalleries();
        });

        obj.images.forEach((img, imgindex) => {
            document.querySelector(`[data-delimage="${imgindex+";"+index}"]`).addEventListener("click", () => {
                console.log("click");
                galleries[index].images = galleries[index].images.filter((item, i) => i !== imgindex);
                updateGalleries();
            });
        });
    });

}

function createAfter() {
    // Do something after the activity is rendered
    document.getElementById("backButton").addEventListener("click", () => {
        linkClick("/");
    });

    document.getElementById("addObjective").addEventListener("click", () => {
        let objectiveInput = document.getElementById("objectiveInput").value;
        objective.push(objectiveInput);
        updateObjectives();
    });

    document.getElementById("addEdLevel").addEventListener("click", () => {
        let edLevelInput = document.getElementById("edLevelInput").value;
        edLevels.push(edLevelInput);
        updateEdLevels();
    });

    document.getElementById("addPrep").addEventListener("click", () => {
        let prepTitleInput = document.getElementById("prepTitleInput").value;
        let prepWarnInput = document.getElementById("prepWarnInput").value;
        let prepNoteInput = document.getElementById("prepNoteInput").value;

        prep.push({
            title: prepTitleInput,
            warn: prepWarnInput,
            note: prepNoteInput

        });
        updatePrep();
    });

    document.getElementById("addInstr").addEventListener("click", () => {
        let instrTitleInput = document.getElementById("instructionTitleInput").value;
        let instrWarnInput = document.getElementById("instructionWarnInput").value;
        let instrNoteInput = document.getElementById("instructionNoteInput").value;

        instructions.push({
            title: instrTitleInput,
            warn: instrWarnInput,
            note: instrNoteInput

        });
        updateInstructions();
    });

    document.getElementById("addAgenda").addEventListener("click", () => {
        let agendaDurationInput = document.getElementById("agendaDurationInput").value;
        let agendaTitleInput = document.getElementById("agendaTitleInput").value;
        let agendaDescriptionInput = document.getElementById("agendaDescriptionInput").value;

        agenda.push({
            duration: agendaDurationInput,
            title: agendaTitleInput,
            description: agendaDescriptionInput

        });
        updateAgenda();
    });

    document.getElementById("addLink").addEventListener("click", () => {
        let linkTitleInput = document.getElementById("linkTitleInput").value;
        let linkUrlInput = document.getElementById("linkUrlInput").value;

        links.push({
            title: linkTitleInput,
            url: linkUrlInput
        });
        updateLinks();
    });

    document.getElementById("addGallery").addEventListener("click", () => {
        let galleryTitleInput = document.getElementById("galleryTitleInput").value;

        galleries.push({
            name: galleryTitleInput,
            images: []
        });
        updateGalleries();
    });

}

export { createAfter };