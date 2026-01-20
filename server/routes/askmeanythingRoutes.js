import express from 'express'
import { generateTexts } from "../controllers/textgeneration.controllers.js";
const AskRouter = express.Router();
AskRouter.post('/ask',generateTexts);
export default AskRouter;