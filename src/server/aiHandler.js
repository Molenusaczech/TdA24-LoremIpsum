import OpenAI from "openai";

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
                role: "system", content: "Jsi část systému pro školní projekty, napíšeš shrnutí aktivity."
            },
            {
                role: "user", content: "Shrň tuto aktivitu: " + JSON.stringify(activity)
            }
        ],
        model: "gpt-3.5-turbo",
    });

    console.log(completion.choices[0]);
    return completion.choices[0].message.content;
}

export { aiResp, aiSumActivity };