const express = require('express');
const auth = require('../middleware/auth');
const Video = require('../models/Video');

const router = express.Router();

// Get all videos for a user
router.get('/', auth, async (req, res) => {
  try {
    const videos = await Video.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new video (this will integrate with AI service later)
router.post('/', auth, async (req, res) => {
  try {
    const { prompt } = req.body;

    // For now, we'll simulate video generation
    // In production, this will call your AI service
    const video = new Video({
      user: req.user._id,
      prompt,
      videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
      status: 'completed'
    });

    const savedVideo = await video.save();
    res.status(201).json(savedVideo);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a specific video
router.get('/:id', auth, async (req, res) => {
  try {
    const video = await Video.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    res.json(video);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a video
router.delete('/:id', auth, async (req, res) => {
  try {
    const video = await Video.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    res.json({ message: 'Video deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;