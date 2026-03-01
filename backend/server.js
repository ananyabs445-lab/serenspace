import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.js'
import sessionRoutes from './routes/sessions.js'
import journalRoutes from './routes/journal.js'

dotenv.config()

const app = express()

app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/sessions', sessionRoutes)
app.use('/api/journal', journalRoutes)

app.get('/', (req, res) => res.json({ message: 'SerenSpace API running 🌿' }))

mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 5000,
  family: 4
})
  .then(() => {
    console.log('MongoDB connected ✅')
    app.listen(process.env.PORT || 5000, () =>
      console.log(`Server running on port ${process.env.PORT || 5000}`)
    )
  })
  .catch(err => console.log('MongoDB error:', err))