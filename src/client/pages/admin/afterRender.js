import { linkClick } from "../../routing";
import { renderAdmin } from "./renderer";

function adminAfter(data) {
    // Do something after the activity is rendered
    document.getElementById("backButton").addEventListener("click", () => {
        linkClick("/");
    });

    data.forEach(activity => {
        let element = document.getElementById("verify"+activity.uuid)
        
        if (element) {

        document.getElementById("verify"+activity.uuid).addEventListener("click", async () => {

            if (!confirm("Opravdu chcete schválit tuto aktivitu?")) return;

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
                linkClick("/admin");
            });

        });
    }

        document.querySelector(`[data-adminDelete="${activity.uuid}"]`).addEventListener("click", async () => {

            if (!confirm("Opravdu chcete smazat tuto aktivitu?")) return;

            fetch("/api/activity/"+activity.uuid, {
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