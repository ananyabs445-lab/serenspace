import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SESSIONS = [
  {
    id: 'morning',
    title: 'Morning Energy',
    emoji: '🌅',
    desc: 'Start your day with energy and intention',
    duration: '10 min',
    color: 'rgba(252,224,236,0.5)',
    poses: [
      { name: 'Mountain Pose', sanskrit: 'Tadasana', duration: 30, benefit: 'Improves posture and balance', instructions: 'Stand tall, feet together, arms at sides, breathe deeply' },
      { name: 'Sun Salutation', sanskrit: 'Surya Namaskar', duration: 45, benefit: 'Energizes entire body', instructions: 'Flow through forward fold, plank, cobra, and back up' },
      { name: 'Warrior I', sanskrit: 'Virabhadrasana I', duration: 30, benefit: 'Builds strength and focus', instructions: 'Step one foot back, bend front knee, raise arms overhead' },
      { name: 'Tree Pose', sanskrit: 'Vrikshasana', duration: 30, benefit: 'Improves balance and concentration', instructions: 'Stand on one leg, place other foot on inner thigh, hands in prayer' },
      { name: "Child's Pose", sanskrit: 'Balasana', duration: 45, benefit: 'Calms the mind and relieves stress', instructions: 'Kneel, sit back on heels, extend arms forward, rest forehead down' },
    ]
  },
  {
    id: 'stress',
    title: 'Stress Relief',
    emoji: '🌿',
    desc: 'Release tension and find calm',
    duration: '8 min',
    color: 'rgba(212,240,228,0.5)',
    poses: [
      { name: "Child's Pose", sanskrit: 'Balasana', duration: 60, benefit: 'Deeply relaxes the nervous system', instructions: 'Kneel, sit back on heels, extend arms forward, breathe slowly' },
      { name: 'Cat-Cow Stretch', sanskrit: 'Marjaryasana', duration: 45, benefit: 'Releases spine tension', instructions: 'On hands and knees, alternate arching and rounding your back' },
      { name: 'Seated Forward Fold', sanskrit: 'Paschimottanasana', duration: 45, benefit: 'Calms anxiety and stress', instructions: 'Sit with legs extended, reach forward toward your feet, breathe' },
      { name: 'Legs Up The Wall', sanskrit: 'Viparita Karani', duration: 60, benefit: 'Reduces stress and fatigue instantly', instructions: 'Lie on back, extend legs up against wall, relax completely' },
      { name: 'Corpse Pose', sanskrit: 'Savasana', duration: 90, benefit: 'Complete relaxation of body and mind', instructions: 'Lie flat on back, arms at sides, eyes closed, breathe naturally' },
    ]
  },
  {
    id: 'focus',
    title: 'Focus & Clarity',
    emoji: '🎯',
    desc: 'Sharpen your mind before studying',
    duration: '7 min',
    color: 'rgba(200,232,248,0.5)',
    poses: [
      { name: 'Easy Pose', sanskrit: 'Sukhasana', duration: 60, benefit: 'Centers the mind for focus', instructions: 'Sit cross-legged, spine tall, hands on knees, eyes closed' },
      { name: 'Eagle Pose', sanskrit: 'Garudasana', duration: 30, benefit: 'Improves concentration', instructions: 'Stand, cross one leg over other, wrap arms, focus on one point' },
      { name: 'Warrior III', sanskrit: 'Virabhadrasana III', duration: 30, benefit: 'Builds mental strength', instructions: 'Balance on one leg, extend body parallel to floor, arms forward' },
      { name: 'Seated Meditation', sanskrit: 'Dhyana', duration: 120, benefit: 'Clears mental clutter', instructions: 'Sit comfortably, close eyes, focus only on your breath' },
    ]
  },
  {
    id: 'sleep',
    title: 'Sleep Preparation',
    emoji: '🌙',
    desc: 'Wind down for deep restful sleep',
    duration: '12 min',
    color: 'rgba(232,223,248,0.5)',
    poses: [
      { name: 'Butterfly Pose', sanskrit: 'Baddha Konasana', duration: 60, benefit: 'Releases hip tension from sitting', instructions: 'Sit, bring soles of feet together, gently flutter knees up and down' },
      { name: 'Supine Twist', sanskrit: 'Supta Matsyendrasana', duration: 45, benefit: 'Releases spine and promotes sleep', instructions: 'Lie on back, bring knee to chest, cross it over body, arms spread' },
      { name: 'Happy Baby', sanskrit: 'Ananda Balasana', duration: 45, benefit: 'Calms the nervous system', instructions: 'Lie on back, grab outer feet, gently rock side to side' },
      { name: 'Legs Up The Wall', sanskrit: 'Viparita Karani', duration: 90, benefit: 'Reduces anxiety before sleep', instructions: 'Lie on back, legs up against wall, breathe slowly for full duration' },
      { name: 'Corpse Pose', sanskrit: 'Savasana', duration: 120, benefit: 'Prepares body for sleep', instructions: 'Lie completely still, scan body from toes to head, release all tension' },
    ]
  },
]

const POSE_IMAGES = {
  'Mountain Pose': 'https://images.unsplash.com/photo-1588286840104-8957b019727f?w=400&q=80',
  'Sun Salutation': 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&q=80',
  'Warrior I': 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=400&q=80',
  'Tree Pose': 'https://images.unsplash.com/photo-1603988363607-e1e4a66962c6?w=400&q=80',
  "Child's Pose": 'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=400&q=80',
  'Cat-Cow Stretch': 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&q=80',
  'Seated Forward Fold': 'https://images.unsplash.com/photo-1510894347713-fc3dc6166086?w=400&q=80',
  'Legs Up The Wall': 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=400&q=80',
  'Corpse Pose': 'https://images.unsplash.com/photo-1506126279646-a697353d3166?w=400&q=80',
  'Easy Pose': 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=400&q=80',
  'Seated Meditation': 'https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?w=400&q=80',
  'Happy Baby': 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=400&q=80',
  'Butterfly Pose': 'https://images.unsplash.com/photo-1510894347713-fc3dc6166086?w=400&q=80',
  'Supine Twist': 'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=400&q=80',
  'Eagle Pose': 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=400&q=80',
  'Warrior III': 'https://images.unsplash.com/photo-1588286840104-8957b019727f?w=400&q=80',
}

function PoseAnimation({ poseName }) {
  const [loaded, setLoaded] = useState(false)
  const url = POSE_IMAGES[poseName] || POSE_IMAGES['Mountain Pose']

  return (
    <div style={{ position: 'relative', width: 180, height: 180, borderRadius: '50%', overflow: 'hidden' }}>
      {!loaded && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(167,139,202,0.1)' }}>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
            style={{ width: 32, height: 32, borderRadius: '50%', border: '3px solid #a78bca', borderTopColor: 'transparent' }}
          />
        </div>
      )}
      <motion.img
        src={url}
        alt={poseName}
        onLoad={() => setLoaded(true)}
        initial={{ scale: 1.1 }}
        animate={{ scale: loaded ? [1.05, 1, 1.05] : 1.1 }}
        transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
        style={{
          width: '100%', height: '100%',
          objectFit: 'cover',
          display: loaded ? 'block' : 'none',
        }}
      />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(135deg, rgba(167,139,202,0.25), rgba(196,160,216,0.15))',
      }} />
    </div>
  )
}

export default function Meditation() {
  const [activeSession, setActiveSession] = useState(null)
  const [currentPose, setCurrentPose] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const [running, setRunning] = useState(false)
  const [completed, setCompleted] = useState(false)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (running && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(intervalRef.current)
            handleNextPose()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(intervalRef.current)
  }, [running, currentPose])

  const startSession = (session) => {
    setActiveSession(session)
    setCurrentPose(0)
    setTimeLeft(session.poses[0].duration)
    setRunning(false)
    setCompleted(false)
  }

  const handleNextPose = () => {
    clearInterval(intervalRef.current)
    if (currentPose < activeSession.poses.length - 1) {
      const next = currentPose + 1
      setCurrentPose(next)
      setTimeLeft(activeSession.poses[next].duration)
      setRunning(true)
    } else {
      setRunning(false)
      setCompleted(true)
    }
  }

  const handlePrev = () => {
    if (currentPose > 0) {
      clearInterval(intervalRef.current)
      const prev = currentPose - 1
      setCurrentPose(prev)
      setTimeLeft(activeSession.poses[prev].duration)
      setRunning(false)
    }
  }

  const pose = activeSession?.poses[currentPose]
  const progress = pose ? ((pose.duration - timeLeft) / pose.duration) * 100 : 0

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '100px 24px 80px', position: 'relative', zIndex: 1 }}>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 32 }}>
        <p style={{ fontSize: '0.78rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#a78bca', marginBottom: 8 }}>Mind and Body</p>
        <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '2.5rem', fontWeight: 400, fontStyle: 'italic', color: '#2d2538', marginBottom: 8 }}>
          Meditation & Yoga
        </h2>
        <p style={{ color: '#8c7fa0', fontSize: '0.9rem' }}>Guided yoga sessions to calm your mind and energize your body.</p>
      </motion.div>

      <AnimatePresence mode="wait">
        {!activeSession ? (
          <motion.div key="sessions"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
            {SESSIONS.map((session, i) => (
              <motion.div key={session.id}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6, boxShadow: '0 12px 40px rgba(167,139,202,0.2)' }}
                onClick={() => startSession(session)}
                style={{
                  padding: '28px 24px', borderRadius: 20,
                  background: session.color,
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.6)',
                  cursor: 'pointer', transition: 'all 0.2s',
                }}>
                <p style={{ fontSize: '2.5rem', marginBottom: 14 }}>{session.emoji}</p>
                <h3 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.3rem', fontWeight: 600, color: '#2d2538', marginBottom: 6 }}>{session.title}</h3>
                <p style={{ fontSize: '0.82rem', color: '#8c7fa0', marginBottom: 12, lineHeight: 1.5 }}>{session.desc}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.75rem', color: '#a78bca', fontWeight: 600 }}>{session.poses.length} poses</span>
                  <span style={{ fontSize: '0.75rem', color: '#a78bca', fontWeight: 600 }}>{session.duration}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : completed ? (
          <motion.div key="completed"
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="glass-card" style={{ padding: '60px 40px', textAlign: 'center' }}>
            <motion.p animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: 3, duration: 0.5 }}
              style={{ fontSize: '4rem', marginBottom: 16 }}>🌟</motion.p>
            <h3 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '2rem', fontWeight: 400, fontStyle: 'italic', color: '#2d2538', marginBottom: 8 }}>
              Session Complete!
            </h3>
            <p style={{ color: '#8c7fa0', fontSize: '0.9rem', marginBottom: 32 }}>
              You completed {activeSession.title}. Take a moment to notice how you feel.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={() => startSession(activeSession)} className="btn-primary">Repeat Session</button>
              <button onClick={() => setActiveSession(null)} className="btn-secondary">Back to Sessions</button>
            </div>
          </motion.div>
        ) : (
          <motion.div key="pose" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <button onClick={() => setActiveSession(null)} style={{
                  background: 'rgba(167,139,202,0.1)', border: 'none', borderRadius: 50,
                  padding: '8px 16px', cursor: 'pointer', color: '#8c7fa0', fontSize: '0.82rem',
                  fontFamily: '"DM Sans", sans-serif',
                }}>Back</button>
                <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.3rem', color: '#2d2538' }}>
                  {activeSession.emoji} {activeSession.title}
                </p>
              </div>
              <p style={{ fontSize: '0.82rem', color: '#8c7fa0' }}>
                Pose {currentPose + 1} of {activeSession.poses.length}
              </p>
            </div>

            <div style={{ display: 'flex', gap: 8, marginBottom: 28, justifyContent: 'center' }}>
              {activeSession.poses.map((_, i) => (
                <div key={i} style={{
                  width: i === currentPose ? 24 : 8, height: 8, borderRadius: 4,
                  background: i < currentPose ? '#a78bca' : i === currentPose ? 'linear-gradient(90deg, #a78bca, #c4a0d8)' : 'rgba(167,139,202,0.2)',
                  transition: 'all 0.3s',
                }} />
              ))}
            </div>

            <motion.div key={currentPose}
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
              className="glass-card-static" style={{ padding: '40px 32px', marginBottom: 20, textAlign: 'center' }}>

              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
                <PoseAnimation poseName={pose.name} />
              </div>

              <p style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#a78bca', marginBottom: 6 }}>
                {pose.sanskrit}
              </p>
              <h3 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '2rem', fontWeight: 400, fontStyle: 'italic', color: '#2d2538', marginBottom: 12 }}>
                {pose.name}
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#8c7fa0', lineHeight: 1.7, maxWidth: 480, margin: '0 auto 16px' }}>
                {pose.instructions}
              </p>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(167,139,202,0.1)', borderRadius: 50, padding: '6px 14px', marginBottom: 28 }}>
                <span style={{ fontSize: '0.78rem', color: '#a78bca' }}>✨ {pose.benefit}</span>
              </div>

              <div>
                <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '3rem', fontWeight: 600, color: '#2d2538', lineHeight: 1 }}>
                  {timeLeft}s
                </p>
                <div style={{ background: 'rgba(167,139,202,0.12)', borderRadius: 50, height: 6, margin: '12px auto', maxWidth: 300, overflow: 'hidden' }}>
                  <motion.div
                    style={{ height: '100%', borderRadius: 50, background: 'linear-gradient(90deg, #a78bca, #c4a0d8)' }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            </motion.div>

            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={handlePrev} disabled={currentPose === 0} style={{
                background: 'rgba(167,139,202,0.1)', border: 'none', borderRadius: 50,
                padding: '12px 24px', cursor: currentPose === 0 ? 'not-allowed' : 'pointer',
                color: '#8c7fa0', fontSize: '0.88rem', fontFamily: '"DM Sans", sans-serif',
                opacity: currentPose === 0 ? 0.4 : 1,
              }}>Prev</button>
              <button onClick={() => setRunning(r => !r)} className="btn-primary" style={{ padding: '12px 32px' }}>
                {running ? 'Pause' : timeLeft === pose.duration ? 'Start' : 'Resume'}
              </button>
              <button onClick={handleNextPose} style={{
                background: 'rgba(167,139,202,0.1)', border: 'none', borderRadius: 50,
                padding: '12px 24px', cursor: 'pointer',
                color: '#8c7fa0', fontSize: '0.88rem', fontFamily: '"DM Sans", sans-serif',
              }}>
                {currentPose === activeSession.poses.length - 1 ? 'Finish' : 'Next'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}