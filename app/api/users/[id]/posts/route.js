import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (request, context) => {
  try {
    // Await the params to extract the ID
    const { params } = context;
    const { id } = await params;

    
    await connectToDB();

   
    const prompts = await Prompt.find({ creator: id }).populate("creator");

    
    return new Response(JSON.stringify(prompts), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching prompts:", error);
    return new Response("Failed to fetch prompts created by user", {
      status: 500,
    });
  }
};
