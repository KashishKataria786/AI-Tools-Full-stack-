import { generateTextFromHuggingFaceService } from "../services/huggingface.service.js";

export const generateTexts = async (req, res) => {
  const { prompt } = req.body;
  try {
    const textdata = await generateTextFromHuggingFaceService(prompt);

    if (!textdata) return res.status(400).send({ message: "Bad Request" });

    return res
      .status(200)
      .json({ success: true, message: "Got it ", data: textdata });
  } catch (error) {
    console.error("HF error:", error.message);

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
