import express from "express";
import { image_generationFromGemini, image_generationFromHuggingFace, image_generationFromOpenAI } from "../controllers/dalle.controllers.js";
import { generateTexts } from "../controllers/textgeneration.controllers.js";
const router = express.Router()


router.post('/dalle',image_generationFromOpenAI)
router.post('/gemini',image_generationFromGemini)
router.post('/hf', image_generationFromHuggingFace);
router.post('/textgen', generateTexts);

export default router;