function setAiState(state) {
    document.getElementById("promptButton").enabled = state;
    document.getElementById("aiPromt").enabled = state;
}

function grfMainAfter() {

    document.getElementById("promptButton").addEventListener("click", async () => {
        let prompt = document.getElementById("aiPromt").value;

        document.getElementById("aiResponse").innerHTML = "Čekám na odpověď AI...";

        setAiState(true);

        let response = await fetch("/api/ai", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ prompt: prompt })
        }).then(response => {
            return response.json();
        });
        console.log(response);

        setAiState(false);

        document.getElementById("aiResponse").innerHTML = response.message;

    });



}

export { grfMainAfter };