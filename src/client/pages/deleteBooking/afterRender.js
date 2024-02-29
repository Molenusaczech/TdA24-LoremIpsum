import { linkClick } from "../../routing";

function deleteBookingAfter(data) {
    document.getElementById("backButton").addEventListener("click", () => {
        linkClick("/");
    });

    document.getElementById("myBookingButton").addEventListener("click", () => {
        linkClick("/myBookings");
    });
}

export { deleteBookingAfter };