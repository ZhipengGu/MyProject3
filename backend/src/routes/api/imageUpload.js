/**
 * When a user upload an image:
 * the frontend calls this API to upload the image and receives the URL of the uploaded image.
 * When the user create or update an event:
 * the frontend include the image URL in the event data and then call the event-API to complete the event creation or update.
 */

import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import sharp from "sharp";
import { v4 as uuid } from 'uuid';
import { verifyToken } from "../../middleware/verifyToken.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'temp/'; //define a directory to store images
    //create the directory if it does not exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    //get unique file name by using uuid
    const uniqueFilename = uuid() + path.extname(file.originalname);
    cb(null, uniqueFilename);
  }
});

const upload = multer({ storage: storage });

router.post('/upload', verifyToken, upload.single('image'), async (req, res) => {
  try { 
    //get the information of uploaded image
    const imagePath = req.file.path; //define and store the image path
    //adjust and save the image by using sharp
    await sharp(imagePath)
      .resize({ width: 500 })
      .toFile(path.join('public', "image", req.file.filename));

    res.status(201).json({ imageUrl: req.file.filename, message: 'Image uploaded and processed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to process image' });
  }
});

export default router;
