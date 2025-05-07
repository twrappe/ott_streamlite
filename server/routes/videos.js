// server/routes/videos.js
import express from 'express';
import Video from '../models/Video.js';
import verifyToken from '../middleware/authMiddleware.js';
import upload from '../middleware/multer.js';
import cloudinary from "../config/cloudinary.js";
const router = express.Router();

router.post('/upload', upload.single('video'), async (req, res) => {
  try {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied: Admins only' });
    }
    
    const { title, description } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: 'Video file is required' });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: 'video',
    });

    const newVideo = new Video({
      title,
      description,
      videoUrl: result.secure_url,
    });

    await newVideo.save();
    res.status(201).json({ message: 'Video uploaded', video: newVideo });
  } catch (error) {
    console.error('Error uploading video:', error);
    res.status(500).json({ error: 'Upload failed' });
  }
});


// GET /api/videos - Fetch all videos
router.get("/", async (req, res) => {
  try {
    const videos = await Video.find(); // Fetch all videos from DB
    res.status(200).json(videos); // Return videos as JSON
  } catch (error) {
    console.error("Error fetching videos:", error);
    res.status(500).json({ error: "Failed to fetch videos" });
  }
});

export default router;
