import OpenAI from "openai";

export default async (request) => {
    // In the new Netlify runtime, event.body is not always a raw JSON string like it used to.
    // So you can't just do JSON.parse(event.body), instead use the Request-style handler:
    const body = await request.json();
    const { text, language } = body;

    const openai = new OpenAI({
        dangerouslyAllowBrowser: true,
        apiKey: process.env.OPENAI_API_KEY,
    });

    const prompt = `translate the following english text to ${language}: ${text}`;
    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: "answer only with the translated text"},
            { role: "user", content: prompt },
            ],
    });

    return new Response(
        JSON.stringify({
            message: JSON.stringify(response.choices[0].message)
        }),
        {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
};