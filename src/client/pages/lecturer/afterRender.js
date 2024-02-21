import { linkClick } from "../../routing";

function lecturerAfter(data) {
    document.getElementById("backButton").addEventListener("click", () => {
        linkClick("/");
    });

    console.log(data.uuid);

    document.getElementById("reserveButton").addEventListener("click", () => {
        linkClick("/book/" + data.uuid);
    });
}

export { lecturerAfter };