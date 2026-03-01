import mongoose from 'mongoose'

const sessionSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  category:    { type: String, enum: ['Focus', 'Sleep', 'Anxiety', 'Exam Stress'], required: true },
  duration:    { type: Number, required: true },
  description: { type: String },
  emoji:       { type: String, default: '🎵' },
}, { timestamps: true })

export default mongoose.model('Session', sessionSchema)