import OpenAI from "openai";

import { getAllActivitiesAll } from "./activityHandler.js";

const apiKey = "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"

const openai = new OpenAI({
    apiKey: apiKey,
});

async function aiResp(prompt) {

    // jen pro test frontendu ODSTRSANIT!!!!!
    //return "Test testus sus amogus";

    try {
        const completion = await openai.chat.completions.create({
            messages: [
                {
                    role: "system", content: "You are a helpful assistant."
                },
                {
                    role: "user", content: prompt
                }
            ],
            model: "gpt-3.5-turbo",
        });

        console.log(completion.choices[0]);
        return completion.choices[0].message.content;
    } catch (error) {
        console.error(error);
        return "Upsík, tohle mělo fungovat.";
    }
}

async function aiSumActivity(activity) {

    const completion = await openai.chat.completions.create({
        messages: [
            {
                role: "system", content: "Jsi část systému pro školní projekty, napíšeš shrnutí aktivity. Nepoužívej stylovací značky"
            },
            {
                role: "user", content: "Shrň tuto aktivitu: " + JSON.stringify(activity)
            }
        ],
        model: "gpt-4-turbo-preview",
    });

    console.log(completion.choices[0]);
    return completion.choices[0].message.content;
}

function parseActivitiesForAI(activities) {
    let count = 0;
    let parsed = activities.map((activity, index) => {
        return {
            id: index,
            summary: activity.summary,
            title: activity.activityName,
        };
    });

    return parsed;
}

async function aiSearch(prompt) {

    let activities = await getAllActivitiesAll();

    let parsed = parseActivitiesForAI(activities);

    const completion = await openai.chat.completions.create({
        messages: [
            {
                role: "system", content: "Jsi část systému pro školní projekty. Dostaneš 2 vstupy: zadání uživatele a json soubor všech projektů. Najdeš 3 nejvhodnější a napíšeš jejich id, nadpis a hodnota do JSONU, jak moc odpovídají zadání uživatele. JSON je seznam a každý prvek má vždy match, id a title."
            },
            {
                role: "user", content: "Zadání uživatele: " + prompt + " JSON soubor: " + JSON.stringify(parsed)
            }
        ],
        model: "gpt-4-turbo-preview",
        response_format: { type: "json_object" },
    });

    console.log(completion.choices[0]);

    return completion.choices[0].message.content;

}

export { aiResp, aiSumActivity, aiSearch };