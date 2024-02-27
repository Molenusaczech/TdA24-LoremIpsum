function getPriceInfo(lecturers) {

    let prices = lecturers.map(lector => lector.price_per_hour);

    let minPrice = Math.min(...prices);
    let maxPrice = Math.max(...prices);

    return {
        "min": minPrice,
        "max": maxPrice
    }

}

export { getPriceInfo };