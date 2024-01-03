import { Lecturer, Tag, Phone, Email } from "./dbModels.js";
import { Op, literal } from 'sequelize';

async function getFiltered(page, tags, location, priceMin, priceMax) {


    let filter = []

    if (tags.length > 0) {
        // sequelize filter where all tags are in lector
        filter.push({
            '$Tags.uuid$': {
                [Op.and]: tags
            }
        })
    }

    if (location.length > 0) {
        filter.push({
            'location': {
                [Op.or]: location
            }
        })
    }

    if (priceMin != -1 && priceMax != -1) {
        filter.push({
            'price_per_hour': {
                [Op.between]: [priceMin, priceMax]
            }
        })
    }

    /*let result = await Lecturer.findAll({
        include: [
            //Tag, Phone, Email
            {
                model: Tag
            },
            {
                model: Phone
            },
            {
                model: Email
            },
        ],
        where: {
            [Op.and]: [
                ...filter
            ]
        },
    },
    );*/

    let filterTags = tags.map((tag) => tag.uuid);

    let result = await Lecturer.findAll({
        include: [{
            model: Tag,
            attributes: [],
            where: {
                uuid: {
                    [Op.in]: filterTags
                }
            },
            through: {
                attributes: []
            }
        }]
    });

    let final = result.map((lector) => {
        lector = JSON.parse(JSON.stringify(lector));

        lector.contact = {}

        if (lector.hasOwnProperty("Tags")) lector.tags = lector.Tags.map((tag) => {
            return {
                uuid: tag.uuid,
                name: tag.name,
            };

        })
        else lector.tags = [];

        if (lector.hasOwnProperty("Phones")) lector.contact.telephone_numbers = lector.Phones.map((phone) => phone.number)
        else lector.contact.telephone_numbers = [];

        if (lector.hasOwnProperty("Emails")) lector.contact.emails = lector.Emails.map((email) => email.email)
        else lector.contact.emails = [];


        delete lector.Phones;
        delete lector.Emails;
        delete lector.Tags;

        return lector;
    });

    return final;
}

export { getFiltered };