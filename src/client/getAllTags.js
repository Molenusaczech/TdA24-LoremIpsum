function getAllTags(lectors) {
    let tags = [];
    lectors.forEach(lector => {
        lector.tags.forEach(tag => {
            if (!tags.includes(tag.name)) {
                tags.push(tag.name);
            }
        });
    });
    return tags;
}

export { getAllTags };