import { Lecturer, Tag, Phone, Email } from "./dbModels.js";
import { Op } from 'sequelize';

async function getFilterData() {
    let tags = await Tag.findAll();
    let locations = await Lecturer.findAll({
        attributes: ['location'],
        group: ['location']
    });
    let maxPrice = await Lecturer.max('price_per_hour');
    let minPrice = await Lecturer.min('price_per_hour');

    let result = {
        tags: tags,
        locations: locations,
        minPrice: minPrice,
        maxPrice: maxPrice
    }

    return result;
}

export { getFilterData };