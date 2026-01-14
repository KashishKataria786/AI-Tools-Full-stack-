import {
  uploadImageToCloudinary,
  uploadHFImageToCloudinary,
} from "../services/cloudinary.services.js";
import { generateImageFromPrompt } from "../services/gemini.services.js";
import { generateImageFromHuggingFaceService } from "../services/huggingface.service.js";

export const image_generationFromOpenAI = async (req, res) => {
  const { prompt } = req.body;
  console.log("Prompt is:", prompt);

  // 1️⃣ Try OpenAI first
  try {
    const openAiImageUrl = await generateImageFromPrompt(prompt);

    const cloudinaryImage = await uploadImageToCloudinary(openAiImageUrl);

    return res.status(200).json({
      success: true,
      image: cloudinaryImage.url,
      provider: "OpenAI",
      fallback: false,
      message: "Image generated using OpenAI",
    });
  } catch (openAiError) {
    console.warn("OpenAI failed:", openAiError.message);
  }

  // 2️⃣ Fallback to Hugging Face
  try {
    const hfImageData = await generateImageFromHuggingFaceService(prompt);

    const uploaded = await uploadHFImageToCloudinary(
      hfImageData.base64,
      hfImageData.mimeType
    );

    return res.status(200).json({
      success: true,
      image: uploaded.url,
      provider: "Hugging Face",
      fallback: true,
      message: "OpenAI unavailable, image generated using Hugging Face",
    });
  } catch (hfError) {
    console.error("Hugging Face failed:", hfError.message);
  }

  // 3️⃣ If everything failed
  return res.status(503).json({
    success: false,
    message:
      "Image generation is currently unavailable. Please try again later.",
  });
};

export const image_generationFromGemini = async (req, res) => {
  const { prompt } = req.body;
  console.log("Prompt is:", prompt);

  // 1️⃣ Try Gemini first
  try {
    const imageData = await generateImageFromPrompt(prompt); // Gemini service

    const cloudinaryImage = await uploadImageToCloudinary(
      imageData.base64,
      imageData.mimeType
    );

    return res.status(200).json({
      success: true,
      image: cloudinaryImage.url,
      provider: "Gemini",
      fallback: false,
      message: "Image generated using Gemini",
    });
  } catch (geminiError) {
    console.warn("Gemini failed:", geminiError.message);
  }

  // 2️⃣ Fallback to Hugging Face
  try {
    const hfImageData = await generateImageFromHuggingFaceService(prompt);

    const uploaded = await uploadHFImageToCloudinary(
      hfImageData.base64,
      hfImageData.mimeType
    );

    return res.status(200).json({
      success: true,
      image: uploaded.url,
      provider: "Hugging Face",
      fallback: true,
      message: "Gemini unavailable, image generated using Hugging Face",
    });
  } catch (hfError) {
    console.error("Hugging Face failed:", hfError.message);
  }

  // 3️⃣ If all providers failed
  return res.status(503).json({
    success: false,
    message:
      "Image generation is currently unavailable. Please try again later.",
  });
};

export const image_generationFromHuggingFace = async (req, res) => {
  const { prompt } = req.body;

  try {
    const imageData = await generateImageFromHuggingFaceService(prompt);

    const uploaded = await uploadHFImageToCloudinary(
      imageData.base64,
      imageData.mimeType
    );

    return res.status(200).json({
      success: true,
      image: uploaded.url,
    });
  } catch (error) {
    console.error("HF error:", error.message);

    // Known HF cases
    if (error.message.includes("loading")) {
      return res.status(503).json({
        success: false,
        message: "Model is loading. Please try again in a few seconds.",
      });
    }

    if (error.message.includes("rate")) {
      return res.status(429).json({
        success: false,
        message: "Too many requests. Please slow down.",
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to generate image",
    });
  }
};
