import { linkClick } from "../../routing";

function mainAfter(lectors) {
    console.log("mainAfter");

    lectors.forEach(element => {
        document.querySelector(`[data-uuid="${element.uuid}"]`).addEventListener("click", () => {
            console.log(element.uuid);
            //window.location.href = "/lecturer/" + element.UUID;
            linkClick("/lecturer/" + element.uuid);
        });
    });
}

export { mainAfter };