import { linkClick } from "../../routing";
import { renderSearchData } from "./renderer.js";

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

    document.getElementById("loginButton").addEventListener("click", () => {
        linkClick("/login");
    });

    document.getElementById("searchButton").addEventListener("click", () => {

        let prompt = document.getElementById("aiPromt").value;

        // disable material button with id aiPromt
        document.getElementById("aiPromt").disabled = true;

        fetch("/api/search/",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ prompt: prompt })
            }).then(response => {
                    return response.json();
                })
                .then(data => {
                    renderSearchData(data);
                }
        );

    })
}

export { grfMainAfter };