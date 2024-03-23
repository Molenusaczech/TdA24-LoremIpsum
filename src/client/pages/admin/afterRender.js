function adminAfter() {
    // Do something after the activity is rendered
    document.getElementById("backButton").addEventListener("click", () => {
        linkClick("/");
    });
}

export { adminAfter };