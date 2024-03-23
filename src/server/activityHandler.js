import {
    Activity
} from "./dbModels.js"

function parseActivity(activity) {

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

    /*let objectives = JSON.parse(activity.objectives) || [];
    for (let obj of objectives) {
        newActivity.objectives.push(obj.objectiveName);
    }*/

    activity.objectives ??= "[]";
    JSON.parse(activity.objectives).forEach(obj => {
        console.log(obj);
        newActivity.objectives.push(obj);
    });

    /*let edLevels = JSON.parse(activity.edLevel) || [];
    for (let edLevel of edLevels) {
        newActivity.edLevel.push(edLevel.levelName);
    }

    let tools = JSON.parse(activity.tools) || [];
    for (let tool of tools) {
        newActivity.tools.push(tool.toolName);
    }

    let homePreparations = JSON.parse(activity.homePreparation) || [];
    for (let prep of homePreparations) {
        newActivity.homePreparation.push({
            title: prep.title,
            warn: prep.warn,
            note: prep.note
        });
    }

    for (let instr of activity.Instructions) {
        newActivity.instructions.push({
            title: instr.title,
            warn: instr.warn,
            note: instr.note
        });
    }

    for (let agenda of activity.Agendas) {
        newActivity.agenda.push({
            duration: agenda.duration,
            title: agenda.title,
            description: agenda.description
        });
    }

    for (let link of activity.Links) {
        newActivity.links.push({
            title: link.title,
            url: link.url
        });
    }

    for (let gallery of activity.Galleries) {
        let galleryObj = {
            title: gallery.title,
            images: []
        };

        for (let img of gallery.Images) {
            galleryObj.images.push({
                lowRes: img.lowRes,
                highRes: img.highRes
            });
        }

        newActivity.gallery.push(galleryObj);
    }*/

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


    return newActivity;
}

async function getActivity(uuid) {
    let activity = await Activity.findOne({
        where: {
            uuid: uuid
        }
    });

    console.log(JSON.parse(activity.tools)[0]);

    //return activity;

    return parseActivity(activity);
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
        galleries: JSON.stringify(input.gallery)
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

export {
    createActivity,
    getActivity,
    getAllActivities,
    deleteActivity,
    verifyActivity
};