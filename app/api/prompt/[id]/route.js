import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

// Helper function to unwrap params
const getParams = async (paramsPromise) => {
  return await paramsPromise;
};


export const GET = async (request, paramsPromise) => {
  try {
    const params = await getParams(paramsPromise); // Unwrap params

    
    await connectToDB();

   
    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) {
      return new Response("Prompt Not Found", { status: 404 });
    }

   
    return new Response(JSON.stringify(prompt), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching prompt:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};


export const PATCH = async (request, paramsPromise) => {
  try {
    const params = await getParams(paramsPromise); 

  
    const { prompt, tag } = await request.json();

   
    await connectToDB();

    
    const existingPrompt = await Prompt.findById(params.id);
    if (!existingPrompt) {
      return new Response("Prompt Not Found", { status: 404 });
    }


    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    
    await existingPrompt.save();

    return new Response("Prompt updated successfully", { status: 200 });
  } catch (error) {
    console.error("Error updating prompt:", error);
    return new Response("Error Updating Prompt", { status: 500 });
  }
};


export const DELETE = async (request, paramsPromise) => {
  try {
    const params = await getParams(paramsPromise); 


    await connectToDB();

    
    const deletedPrompt = await Prompt.findByIdAndRemove(params.id);
    if (!deletedPrompt) {
      return new Response("Prompt Not Found", { status: 404 });
    }

    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    console.error("Error deleting prompt:", error);
    return new Response("Error Deleting Prompt", { status: 500 });
  }
};
