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
} from "./dbModels"

async function createActivity(input) {
    let activity = new Activity({
        title: input.title,
        description: input.description,
        objectives: input.objectives,
        edLevel: input.edLevel,
        tools: input.tools,
        homePreparation: input.homePreparation,
        instructions: input.instructions,
        agenda: input.agenda,
        links: input.links,
        gallery: input.gallery,
        images: input.images
    });

    return await activity.save();
}