import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async (req) => {
    const { userId, tag, prompt } = await req.json();

    if (!userId || !tag || !prompt) {
        return new Response("Missing required fields", { status: 400 });
    }

    try {
        await connectToDB();
        console.log("prompt",Prompt);
        const newPrompt = new Prompt({
            creator: userId,
            prompt,
            tag
        });

        await newPrompt.save();
        return new Response(JSON.stringify(newPrompt), { status: 201 });
    } catch (error) {
        console.error("Error in creating Prompt", error);
        return new Response("Failed to create prompt", { status: 500 });
    }
};
