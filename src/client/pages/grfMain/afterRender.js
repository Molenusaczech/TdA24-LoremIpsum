import { linkClick } from "../../routing";


function grfMainAfter(activities) {



    document.getElementById("createButton").addEventListener("click", () => {
        linkClick("/create");
    });

    document.getElementById("backButton").addEventListener("click", () => {
        linkClick("/");
    });

    activities.forEach(activity => {
        document.querySelector(`[data-activityId="${activity.uuid}"]`).addEventListener("click", () => {
            linkClick("/aktivita/" + activity.uuid);
        });
    });

}

export { grfMainAfter };