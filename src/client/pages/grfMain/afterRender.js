import { linkClick } from "../../routing";


function grfMainAfter() {



    document.getElementById("createButton").addEventListener("click", () => {
        linkClick("/create");
    });

    document.getElementById("backButton").addEventListener("click", () => {
        linkClick("/");
    });

}

export { grfMainAfter };