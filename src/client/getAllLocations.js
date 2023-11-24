function getAllLocations(lectors) {
    let locations = [];
    lectors.forEach(lector => {
        if (!locations.includes(lector.location)) locations.push(lector.location);
    });
    return locations;
}

export { getAllLocations };