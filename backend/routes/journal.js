import express from 'express'
import { protect } from '../middleware/auth.js'
import Journal from '../models/Journal.js'

const router = express.Router()

router.get('/', protect, async (req, res) => {
  try {
    const entries = await Journal.find({ user: req.user._id }).sort({ createdAt: -1 })
    res.json(entries)
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
})

router.post('/', protect, async (req, res) => {
  try {
    const { mood, moodLabel, moodScore, reflection } = req.body
    if (!mood) return res.status(400).json({ message: 'Mood is required' })
    const entry = await Journal.create({
      user: req.user._id,
      mood,
      moodLabel,
      moodScore,
      reflection
    })
    res.status(201).json(entry)
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
})

export default router