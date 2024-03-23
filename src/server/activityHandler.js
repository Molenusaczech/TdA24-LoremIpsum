import {
    Activity
} from "./dbModels.js"

import { aiSumActivity } from "./aiHandler.js";

function parseActivity(activity, isAll = false) {

    let newActivity = {
        uuid: activity.uuid,
        title: activity.activityName,
        lengthMin: activity.lengthMin,
        lengthMax: activity.lengthMax,
        description: activity.description,
        classStructure: activity.classStructure,
        objectives: [],
        edLevel: [],
        tools: [],
        homePreparation: [],
        instructions: [],
        agenda: [],
        links: [],
        gallery: []
    };

    activity.objectives ??= "[]";
    JSON.parse(activity.objectives).forEach(obj => {
        console.log(obj);
        newActivity.objectives.push(obj);
    });

 
    activity.edLevel ??= "[]";
    JSON.parse(activity.edLevel).forEach(edLevel => {

        newActivity.edLevel.push(edLevel);
    });

    activity.tools ??= "[]";
    JSON.parse(activity.tools).forEach(tool => {
        newActivity.tools.push(tool);
    });

    activity.homePreparation ??= "[]";
    JSON.parse(activity.homePreparation).forEach(prep => {
        newActivity.homePreparation.push({
            title: prep.title,
            warn: prep.warn,
            note: prep.note
        });
    });

    activity.instructions ??= "[]";
    JSON.parse(activity.instructions).forEach(instr => {
        newActivity.instructions.push({
            title: instr.title,
            warn: instr.warn,
            note: instr.note
        });
    });

    activity.agenda ??= "[]";
    JSON.parse(activity.agenda).forEach(agenda => {
        newActivity.agenda.push({
            duration: agenda.duration,
            title: agenda.title,
            description: agenda.description
        });
    });

    activity.links ??= "[]";
    JSON.parse(activity.links).forEach(link => {
        newActivity.links.push({
            title: link.title,
            url: link.url
        });
    }
    );

    activity.galleries ??= "[]";
    JSON.parse(activity.galleries).forEach(gallery => {
        let galleryObj = {
            title: gallery.title,
            images: []
        };

        gallery.images ??= "[]";
        gallery.images.forEach(img => {
            galleryObj.images.push({
                title: img.title,
                lowRes: img.lowRes,
                highRes: img.highRes
            });
        });

        newActivity.gallery.push(galleryObj);
    });

    if (isAll) {
        newActivity.summary = activity.summary;
        newActivity.isVerified = activity.isVerified;
    }


    return newActivity;
}

async function getActivity(uuid) {
    let activity = await Activity.findOne({
        where: {
            uuid: uuid
        }
    });

    if (!activity) {
        return {
            code: 404,
            message: "Activity not found"
        };
    }

    //return activity;

    return parseActivity(activity);
}

async function getActivityAll(uuid) {
    let activity = await Activity.findOne({
        where: {
            uuid: uuid
        }
    });

    if (!activity) {
        return {
            code: 404,
            message: "Activity not found"
        };
    }

    return parseActivity(activity, true);
}

async function createActivity(input, isServer = false) {

    //console.log(input);

    let activity = await Activity.create({
        uuid: input.uuid,
        activityName: input.title,
        lengthMin: input.lengthMin,
        lengthMax: input.lengthMax,
        description: input.description,
        classStructure: input.classStructure,
        description: input.description,
        isVerified: isServer,
        objectives: JSON.stringify(input.objectives),
        edlevels: JSON.stringify(input.edLevel),
        tools: JSON.stringify(input.tools),
        homePreparation: JSON.stringify(input.homePreparation),
        instructions: JSON.stringify(input.instructions),
        agenda: JSON.stringify(input.agenda),
        links: JSON.stringify(input.links),
        galleries: JSON.stringify(input.gallery),
        summary: "WIP"
    });

    /*let activity = await Activity.create({
        uuid: input.uuid,
        activityName: input.activityName,
        lengthMin: input.lengthMin,
        lengthMax: input.lengthMax,
        description: input.description,
        classStructure: input.classStructure,
        description: input.description,
        isVerified: isServer,
    });

    //return await activity.save();

    for (let obj of input.objectives) {
        let objective = await Objective.create({

            objectiveName: obj

        });

        activity.addObjective(objective);
    }

    for (let edLevel of input.edLevel) {
        let edLevelObj = await EdLevel.create({

            levelName: edLevel

        });

        activity.addEdLevel(edLevelObj);
    }

    for (let tool of input.tools) {
        let toolObj = await Tool.create({
            toolName: tool

        });

        activity.addTool(toolObj);
    }

    for (let prep of input.homePreparation) {
        let prepObj = await HomePreparation.create({

            title: prep.title,
            warn: prep.warn,
            note: prep.note

        });

        activity.addHomePreparation(prepObj);
    }

    for (let instr of input.instructions) {
        let instrObj = await Instruction.create({

            title: instr.title,
            warn: instr.warn,
            note: instr.note

        });

        activity.addInstruction(instrObj);
    }

    for (let agenda of input.agenda) {
        let agendaObj = await Agenda.create({


            duration: agenda.duration,
            title: agenda.title,
            description: agenda.description

        });

        activity.addAgenda(agendaObj);
    }

    for (let link of input.links) {
        let linkObj = await Link.create({
            defaults: {
                title: link.title,
                url: link.url
            }
        });

        activity.addLink(linkObj);
    }

    for (let gallery of input.gallery) {
        let galleryObj = await Gallery.create({

            title: gallery.title

        });

        for (let img of gallery.images) {
            let imgObj = await Image.create({

                title: img.title,
                lowRes: img.lowRes,
                highRes: img.highRes

            });

            galleryObj.addImage(imgObj);
        }

        activity.addGallery(galleryObj);
    }*/

    aiSumActivity(input).then((summary) => {
        activity.summary = summary;
        activity.save();
    });

    return getActivity(activity.uuid);
}

async function getAllActivities(isAdmin = false) {

    let activities = [];

    if (!isAdmin) {
        activities = await Activity.findAll({
            where: {
                isVerified: true
            }
        });
    } else {
        activities = await Activity.findAll({});
    }

    let newActivities = [];

    for (let activity of activities) {
        newActivities.push(parseActivity(activity));
    }

    return newActivities;
}

async function getAllActivitiesAll(isAdmin = false) {

    let activities = [];

    if (!isAdmin) {
        activities = await Activity.findAll();
    } else {
        activities = await Activity.findAll({});
    }

    let newActivities = [];

    for (let activity of activities) {
        newActivities.push(parseActivity(activity, true));
    }

    return newActivities;
}

async function deleteActivity(uuid) {
    let activity = await Activity.findOne({
        where: {
            uuid: uuid
        }
    });

    if (activity) {
        activity.destroy();
        return {
            code: 200,
            message: "Activity deleted"
        };
    }

    return {
        code: 404,
        message: "Activity not found"
    };
}

async function verifyActivity(uuid) {
    let activity = await Activity.findOne({
        where: {
            uuid: uuid
        }
    });

    if (activity) {
        activity.isVerified = true;
        activity.save();
        return {
            code: 200,
            message: "Activity verified"
        };
    }

    return {
        code: 404,
        message: "Activity not found"
    };
}

const token = "OWRI89AiN5";

async function tryLogin(username, password) {
    let corUsername = "admin";
    let corPassword = "tda";

    if (username == corUsername && password == corPassword) {
        return {
            code: 200,
            token: token
        };
    }

    return {
        code: 404,
        message: "Invalid username or password"
    };
}

async function generateToken() {
    return token;
}

async function verifyToken(token) {
    if (token == token) {
        return true;
    }
    return false;
}

export {
    createActivity,
    getActivity,
    getAllActivities,
    deleteActivity,
    verifyActivity,
    tryLogin,
    generateToken,
    getActivityAll,
    getAllActivitiesAll
};