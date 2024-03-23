import {
    Activity,
    Objective,
    EdLevel,
    Tool,
    HomePreparation,
    Instruction,
    Agenda,
    Link,
    Gallery,
    Image
} from "./dbModels.js"

async function getActivity(uuid) {
    let activity = await Activity.findOne({
        where: {
            uuid: uuid
        },
        include: [
            Objective,
            EdLevel,
            Tool,
            HomePreparation,
            Instruction,
            Agenda,
            Link,
            {
                model: Gallery,
                include: Image
            }
        ]
    });

    let newActivity = {
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

    for (let obj of activity.Objectives) {
        newActivity.objectives.push(obj.objectiveName);
    }

    for (let edLevel of activity.EdLevels) {
        newActivity.edLevel.push(edLevel.levelName);
    }

    for (let tool of activity.Tools) {
        newActivity.tools.push(tool.toolName);
    }

    for (let prep of activity.HomePreparations) {
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
                title: img.title,
                url: img.url
            });
        }

        newActivity.gallery.push(galleryObj);
    }

    return newActivity;
}

async function createActivity(input, isServer = false) {

    //console.log(input);

    let activity = await Activity.create({
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
                url: img.url

            });

            galleryObj.addImage(imgObj);
        }

        activity.addGallery(galleryObj);
    }

    return getActivity(activity.uuid);
}

export { createActivity };