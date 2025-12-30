import OpenAI from "openai";

const openai = new OpenAI({
    dangerouslyAllowBrowser: true,
    apiKey: process.env.OPENAI_API_KEY,
    });

const askgpt = async function(text, language) {
    const prompt = `translate the following english text to ${language}: ${text}`
    
    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: "answer only with the translated text"},
            { role: "user", content: prompt },
            ],
    });

  return new Response(JSON.stringify(response.choices[0].message));
};

export {askgpt};