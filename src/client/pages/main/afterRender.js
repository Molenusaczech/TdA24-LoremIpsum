function mainAfter(lectors) {
    console.log("mainAfter");

    lectors.forEach(element => {
        document.querySelector(`[data-uuid="${element.UUID}"]`).addEventListener("click", () => {
            console.log(element.UUID);
            window.location.href = "/lecturer/" + element.UUID;
        });
    });
}

export { mainAfter };