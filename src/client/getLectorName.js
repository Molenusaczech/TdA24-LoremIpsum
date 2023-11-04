function getLectorName(lector) {
    let name = "";

    if (lector.title_before) {
        name += lector.title_before + " ";
    }

    name += lector.first_name + " ";

    if (lector.middle_name) {
        name += lector.middle_name + " ";
    }

    name += lector.last_name + " ";

    if (lector.title_after) {
        name += lector.title_after;
    }

    return name;
}

export { getLectorName };