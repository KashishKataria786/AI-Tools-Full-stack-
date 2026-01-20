import express from "express";
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

import Post from '../models/post.js'

dotenv.config();

const router = express.Router();

cloudinary.config({
    //!    ########   Configuring the Cloudinary to Upload MEDIA ########
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

router.get("/post", async (req, res) => {
    try {
      const posts = await Post.find();
       res.status(200).json({ success: true, data: posts });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Fetching posts failed, please try again' });
    }
  });

router.post("/post", async (req, res) => {
  try {
    const { name, prompt, model, answer } = req.body;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: "Prompt is required",
      });
    }

    let photoURL = "";

    // Upload image if exists
    if (req.files && req.files.photoFile) {
      const photo = req.files.photoFile;

      const uploadResult = await cloudinary.uploader.upload(
        photo.tempFilePath,
        {
          folder: process.env.FOLDER_NAME,
          resource_type: "auto",
        }
      );

      photoURL = uploadResult.secure_url;
    }

    const newPost = await Post.create({
      name,
      prompt,
      model,
      answer,
      photo: photoURL,
    });

    return res.status(201).json({
      success: true,
      data: newPost,
    });
  } catch (error) {
    console.error("Error in /post route:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});


export default router;