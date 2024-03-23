import { linkClick } from "../../routing";
import { renderAdmin } from "./renderer";

function adminAfter(data) {
    // Do something after the activity is rendered
    document.getElementById("backButton").addEventListener("click", () => {
        linkClick("/");
    });

    data.forEach(async activity => {
        document.querySelector(`[data-adminVerify="${activity.uuid}"]`).addEventListener("click", async () => {

            fetch("/api/verifyActivity", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "uuid": activity.uuid
                })
            }).then(response => {
                alert("Schváleno");
            });

        });

        document.querySelector(`[data-adminDelete="${activity.uuid}"]`).addEventListener("click", async () => {
            etch("/api/activity/"+activity.uuid, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(response => {
                alert("Smazáno");
                linkClick("/admin");
            });
        });

        document.getElementById("logoutButton").addEventListener("click", () => {
            localStorage.removeItem("token");
            linkClick("/");
        });
    });
}

export { adminAfter };