import { InferenceClient } from "@huggingface/inference";


const HugginFaceClient = new InferenceClient(process.env.HUGGINGFACE_API_KEY);
const model = process.env.HUGGING_FACE_IMAGE_MODEL

export const generateImageFromHuggingFaceService = async(prompt)=>{
    if(!prompt) throw new Error ('prompt is Required');

 try {
       const image = await HugginFaceClient.textToImage({
        provider:"hf-inference",
        model:`${model}`,
        inputs:prompt,
        parameters:{
            num_inference_steps:30
        }
    });

    const arrayBuffer = await image.arrayBuffer();
  const base64 = Buffer.from(arrayBuffer).toString("base64");

  return {
    base64,
    mimeType: image.type || "image/png",
  };
    
 } catch (error) {
    error.provider='hugging Face'
    throw error;
 }
}


export const generateTextFromHuggingFaceService = async(prompt)=>{

    if(!prompt) throw new Error ('prompt is Required');

    const chatCompletion = await HugginFaceClient.chatCompletion({
    model: "meta-llama/Llama-3.1-8B-Instruct:novita",
    messages: [
        {
            role: "user",
            content:prompt,
        },
    ],
});

console.log(chatCompletion.choices[0].message);
return (chatCompletion.choices[0].message);
}