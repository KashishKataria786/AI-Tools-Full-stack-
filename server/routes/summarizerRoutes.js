import express from 'express'
import { summarizeFromURL } from '../controllers/summarizercontroller.js';


const router = express.Router();

router.post('/using-url',summarizeFromURL);

export default router;