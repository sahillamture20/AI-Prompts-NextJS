import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const POST = async(req, res) => {
    const { userId, prompt, tag } = await req.json();

    try {
        await connectToDB();
        const newPrompt = new Prompt({
            creator: userId,
            prompt,
            tag
        });

        await newPrompt.save();
        return new Response(JSON.stringify(newPrompt), {status: 201}, {message: "Success"})
    } catch (err) {
        return new Response("Failed", {status:500})
    }

} 