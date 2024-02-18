import { linkClick } from "../../routing";


function loginAfter() {
    document.getElementById("backButton").addEventListener("click", () => {
        linkClick("/");
    });

    document.getElementById("loginButton").addEventListener("click", () => {
        console.log("loginButton");

        let username = document.getElementById("loginUsername").value;
        let password = document.getElementById("loginPassword").value;

        console.log(username, password);

        fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username: username, password: password })
        }).then((response) => response.json())
        .then((data) => {

            console.log(data);

            if (data.code == 200) {
                localStorage.setItem("token", data.token);
                linkClick("/myBookings");
            } else {
                alert("Špatné jméno nebo heslo!");
                document.getElementById("loginPassword").value = "";
            }

        });

    });

}

export { loginAfter };