function grfMainAfter() {

    document.getElementById("promptButton").addEventListener("click", async () => {
        let prompt = document.getElementById("aiPromt").value;

        document.getElementById("aiResponse").innerHTML = "Čekám na odpověď AI...";

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

        document.getElementById("aiResponse").innerHTML = response.message;

    });



}

export { grfMainAfter };