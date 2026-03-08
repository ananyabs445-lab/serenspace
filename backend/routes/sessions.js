import express from 'express'
import { protect } from '../middleware/auth.js'
import Session from '../models/Session.js'
import User from '../models/User.js'

const router = express.Router()

router.get('/', protect, async (req, res) => {
  try {
    const sessions = await Session.find()
    if (sessions.length === 0) {
      return res.json([
        { _id: '1', title: 'Morning Clarity', category: 'Focus', duration: 10, emoji: '☀️', description: 'Start your day with a clear focused mind.', audioUrl: 'https://assets.mixkit.co/music/preview/mixkit-dreaming-big-31.mp3' },
        { _id: '2', title: 'Exam Eve Calm', category: 'Exam Stress', duration: 15, emoji: '📚', description: 'Settle pre-exam anxiety and build confidence.', audioUrl: 'https://assets.mixkit.co/music/preview/mixkit-serene-view-443.mp3' },
        { _id: '3', title: 'Deep Sleep Drift', category: 'Sleep', duration: 20, emoji: '🌙', description: 'A slow body scan to ease you into sleep.', audioUrl: 'https://assets.mixkit.co/music/preview/mixkit-relaxing-in-nature-522.mp3' },
        { _id: '4', title: 'Anxiety Release', category: 'Anxiety', duration: 12, emoji: '🌊', description: 'Progressive relaxation to loosen tension.', audioUrl: 'https://assets.mixkit.co/music/preview/mixkit-rain-and-thunder-2406.mp3' },
        { _id: '5', title: 'Study Focus', category: 'Focus', duration: 8, emoji: '🎯', description: 'Sharpen attention before a study sprint.', audioUrl: 'https://assets.mixkit.co/music/preview/mixkit-dreaming-big-31.mp3' },
        { _id: '6', title: 'Stress Unwind', category: 'Exam Stress', duration: 18, emoji: '🍃', description: 'Release the weight of the day.', audioUrl: 'https://assets.mixkit.co/music/preview/mixkit-serene-view-443.mp3' },
        { _id: '7', title: 'Restful Night', category: 'Sleep', duration: 25, emoji: '⭐', description: 'Visualisation for a full nights rest.', audioUrl: 'https://assets.mixkit.co/music/preview/mixkit-relaxing-in-nature-522.mp3' },
        { _id: '8', title: 'Social Anxiety Ease', category: 'Anxiety', duration: 10, emoji: '🕊️', description: 'Steadiness before presentations.', audioUrl: 'https://assets.mixkit.co/music/preview/mixkit-rain-and-thunder-2406.mp3' },
        { _id: '9', title: 'Present Moment', category: 'Focus', duration: 5, emoji: '🔵', description: 'A quick reset to the here and now.', audioUrl: 'https://assets.mixkit.co/music/preview/mixkit-dreaming-big-31.mp3' },
      ])
    }
    res.json(sessions)
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
})

router.post('/log', protect, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user._id, { $inc: { totalSessions: 1 } })
    res.json({ message: 'Session logged ✅' })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
})

export default router