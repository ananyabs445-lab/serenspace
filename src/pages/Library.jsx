import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const AFFIRMATIONS = {
  Focus: [
    "My mind is clear, calm and focused.",
    "I concentrate easily and absorb information quickly.",
    "Every study session brings me closer to my goals.",
    "I am fully present in this moment.",
    "My attention is sharp and my memory is strong.",
    "I work with purpose and intention today.",
  ],
  Anxiety: [
    "I am safe. I am calm. I am in control.",
    "This feeling will pass. I have survived hard days before.",
    "I breathe in peace and breathe out tension.",
    "My anxiety does not define me or my future.",
    "I am bigger than my worries.",
    "One step at a time is enough for me.",
  ],
  Confidence: [
    "I am capable of achieving everything I set my mind to.",
    "I believe in my own strength and resilience.",
    "I am enough, exactly as I am right now.",
    "My voice matters and my ideas have value.",
    "I face challenges with courage and grace.",
    "I am proud of how far I have come.",
  ],
  'Exam Stress': [
    "I have prepared well and I trust myself.",
    "I remain calm and clear during my exams.",
    "Mistakes are proof that I am trying.",
    "I recall information easily and write with confidence.",
    "My best effort is always enough.",
    "I release all pressure and trust my preparation.",
  ],
  Sleep: [
    "I release today and welcome rest.",
    "My body knows how to heal and restore itself.",
    "I deserve deep, peaceful sleep tonight.",
    "Tomorrow's worries can wait. Tonight I rest.",
    "I let go of everything that is not mine to carry.",
    "Peace flows through me as I drift to sleep.",
  ],
}

const CATEGORIES = ['Focus', 'Anxiety', 'Confidence', 'Exam Stress', 'Sleep']

const COLORS = {
  Focus:        { bg: 'linear-gradient(135deg, #e8dff8, #d4e8f8)', accent: '#7b6fa0' },
  Anxiety:      { bg: 'linear-gradient(135deg, #fce0ec, #fde8d8)', accent: '#c06080' },
  Confidence:   { bg: 'linear-gradient(135deg, #d4f0e4, #e8f8d4)', accent: '#4a8a6a' },
  'Exam Stress':{ bg: 'linear-gradient(135deg, #fce0ec, #e8dff8)', accent: '#8a5090' },
  Sleep:        { bg: 'linear-gradient(135deg, #c8e8f8, #d4d8f8)', accent: '#4a5a9a' },
}

const ICONS = {
  Focus: '🎯', Anxiety: '🌊', Confidence: '✨', 'Exam Stress': '📚', Sleep: '🌙'
}

export default function Library() {
  const [category, setCategory] = useState('Focus')
  const [index, setIndex] = useState(0)
  const [favourites, setFavourites] = useState([])
  const [showFavourites, setShowFavourites] = useState(false)
  const [direction, setDirection] = useState(1)

  const affirmations = AFFIRMATIONS[category]
  const current = affirmations[index]
  const isFavourited = favourites.includes(current)

  const next = () => {
    setDirection(1)
    setIndex(i => (i + 1) % affirmations.length)
  }

  const prev = () => {
    setDirection(-1)
    setIndex(i => (i - 1 + affirmations.length) % affirmations.length)
  }

  const toggleFavourite = () => {
    setFavourites(prev =>
      prev.includes(current)
        ? prev.filter(f => f !== current)
        : [...prev, current]
    )
  }

  const changeCategory = (cat) => {
    setCategory(cat)
    setIndex(0)
    setShowFavourites(false)
  }

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '100px 24px 80px', position: 'relative', zIndex: 1 }}>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 32, textAlign: 'center' }}>
        <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '2.2rem', fontWeight: 400, fontStyle: 'italic', color: '#2d2538' }}>
          Daily Affirmations
        </h2>
        <p style={{ color: '#8c7fa0', fontSize: '0.88rem', marginTop: 4 }}>
          Gentle reminders of your strength and calm.
        </p>
      </motion.div>

      {/* Category chips */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 40 }}>
        {CATEGORIES.map(cat => (
          <button key={cat} className={`chip ${category === cat && !showFavourites ? 'active' : ''}`}
            onClick={() => changeCategory(cat)}>
            {ICONS[cat]} {cat}
          </button>
        ))}
        <button className={`chip ${showFavourites ? 'active' : ''}`}
          onClick={() => setShowFavourites(s => !s)}>
          ♥ Saved ({favourites.length})
        </button>
      </div>

      {/* Main affirmation card */}
      {!showFavourites ? (
        <div style={{ position: 'relative' }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={category + index}
              custom={direction}
              initial={{ opacity: 0, x: direction * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -60 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              style={{
                background: COLORS[category].bg,
                borderRadius: 24,
                padding: '60px 48px',
                textAlign: 'center',
                border: '1px solid rgba(255,255,255,0.8)',
                boxShadow: '0 8px 40px rgba(167,139,202,0.15)',
                minHeight: 240,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                position: 'relative',
              }}>

              {/* Favourite button */}
              <button onClick={toggleFavourite} style={{
                position: 'absolute', top: 20, right: 20,
                background: 'rgba(255,255,255,0.6)', border: 'none',
                borderRadius: '50%', width: 40, height: 40,
                cursor: 'pointer', fontSize: '1.1rem',
                backdropFilter: 'blur(8px)',
                transition: 'transform 0.2s',
              }}>
                {isFavourited ? '♥' : '♡'}
              </button>

              {/* Category icon */}
              <div style={{ fontSize: '2.5rem', marginBottom: 24 }}>{ICONS[category]}</div>

              {/* Affirmation text */}
              <p style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: 'clamp(1.4rem, 3vw, 2rem)',
                fontStyle: 'italic',
                fontWeight: 400,
                color: COLORS[category].accent,
                lineHeight: 1.5,
                maxWidth: 500,
              }}>
                "{current}"
              </p>

              {/* Counter */}
              <p style={{ fontSize: '0.72rem', color: '#8c7fa0', marginTop: 24, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                {index + 1} of {affirmations.length}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 14, marginTop: 28 }}>
            <button onClick={prev} className="btn-secondary" style={{ padding: '10px 24px' }}>
              ← Previous
            </button>
            <button onClick={next} className="btn-primary" style={{ padding: '10px 24px' }}>
              Next →
            </button>
          </div>

          {/* Dots */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 18 }}>
            {affirmations.map((_, i) => (
              <button key={i} onClick={() => setIndex(i)} style={{
                width: i === index ? 20 : 8, height: 8,
                borderRadius: 50, border: 'none', cursor: 'pointer',
                background: i === index ? '#a78bca' : 'rgba(167,139,202,0.25)',
                transition: 'all 0.3s',
                padding: 0,
              }} />
            ))}
          </div>
        </div>
      ) : (
        /* Favourites grid */
        <div>
          {favourites.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 24px' }}>
              <p style={{ fontSize: '2rem', marginBottom: 12 }}>♡</p>
              <p style={{ color: '#8c7fa0', fontSize: '0.9rem' }}>No saved affirmations yet.</p>
              <p style={{ color: '#c0b4d0', fontSize: '0.82rem', marginTop: 4 }}>Tap the heart on any card to save it!</p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
              {favourites.map((fav, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="glass-card" style={{ padding: '24px 22px', position: 'relative' }}>
                  <button onClick={() => setFavourites(prev => prev.filter(f => f !== fav))}
                    style={{ position: 'absolute', top: 12, right: 12, background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem', color: '#c06080' }}>
                    ♥
                  </button>
                  <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.1rem', fontStyle: 'italic', color: '#2d2538', lineHeight: 1.6 }}>
                    "{fav}"
                  </p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      )}
    </div>
  )
}