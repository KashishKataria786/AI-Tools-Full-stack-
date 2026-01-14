import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateImageFromPrompt = async (prompt) => {
  if (!prompt) throw new Error("Prompt is required");

  // const response = await openai.images.generate({
  //   model: "gpt-image-1",
  //   prompt,
  //   size: "1024x1024",
  // });

  // return response.data[0].url;

  try {
    const response = await openai.images.generate({
    model: "gpt-image-1",
    prompt,
    size: "1024x1024",
  });

  return response.data[0].url;
  } catch (error) {
    error.provider = openai;
    throw error;
  }
};


export const translation = async(prompt)=>{
    if(!prompt) throw new Error("Prompt Required for Translation");
    
    const response=await  openai.completions.create({
        input:[
            {role:"user", content:prompt}
        ]
    })

    return (response?.output_text);
}