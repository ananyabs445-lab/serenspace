import mongoose from 'mongoose'

const journalSchema = new mongoose.Schema({
  user:       { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  mood:       { type: String, required: true },
  moodLabel:  { type: String },
  moodScore:  { type: Number, min: 1, max: 5 },
  reflection: { type: String, default: '' },
}, { timestamps: true })

export default mongoose.model('Journal', journalSchema)