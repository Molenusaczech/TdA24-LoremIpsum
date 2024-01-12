import { tags, locations } from "./filter";

function getFilterData(lecturers) {
  
    let tagCounts = {};
    let tagNames = {};
    let locationCounts = {};

    tags.forEach(tag => {
        tagCounts[tag.uuid] = 0;
        tagNames[tag.uuid] = tag.name;
    });

    locations.forEach(location => {
        locationCounts[location.location] = 0;
    });

    lecturers.forEach(lector => {
        lector.tags.forEach(tag => {
            if (tagCounts[tag.uuid] == undefined) {
                tagCounts[tag.uuid] = 1;
                tagNames[tag.uuid] = tag.name;
            } else {
                tagCounts[tag.uuid]++;
            }
        });
        if (locationCounts[lector.location] == undefined) {
            locationCounts[lector.location] = 1;
        } else {
            locationCounts[lector.location]++;
        }
    });

    let curtags = [];
    let curlocations = [];

    for (const [key, value] of Object.entries(tagCounts)) {
        curtags.push({
            name: tagNames[key],
            uuid: key,
            count: value
        });
    }

    for (const [key, value] of Object.entries(locationCounts)) {
        curlocations.push({
            location: key,
            count: value
        });
    }

    curtags.sort((a, b) => {
        return b.count - a.count;
    });

    curlocations.sort((a, b) => {
        return b.count - a.count;
    });

    return {
        tags: curtags,
        locations: curlocations
    }

}

export { getFilterData };