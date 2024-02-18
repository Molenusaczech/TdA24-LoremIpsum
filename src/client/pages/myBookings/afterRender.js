import { linkClick } from "../../routing";


function myBookingsAfter() {
    document.getElementById("backButton").addEventListener("click", () => {
        linkClick("/");
    });
}

export { myBookingsAfter };