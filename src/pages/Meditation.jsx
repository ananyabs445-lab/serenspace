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
      { name: 'Child\'s Pose', sanskrit: 'Balasana', duration: 45, benefit: 'Calms the mind and relieves stress', instructions: 'Kneel, sit back on heels, extend arms forward, rest forehead down' },
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
      { name: 'Child\'s Pose', sanskrit: 'Balasana', duration: 60, benefit: 'Deeply relaxes the nervous system', instructions: 'Kneel, sit back on heels, extend arms forward, breathe slowly' },
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

function PoseAnimation({ poseName }) {
  const animations = {
    'Mountain Pose': (
      <motion.g>
        <motion.circle cx="50" cy="20" r="8" fill="#a78bca" animate={{ y: [0, -2, 0] }} transition={{ repeat: Infinity, duration: 3 }} />
        <motion.line x1="50" y1="28" x2="50" y2="60" stroke="#a78bca" strokeWidth="3" strokeLinecap="round" />
        <motion.line x1="50" y1="40" x2="30" y2="55" stroke="#a78bca" strokeWidth="3" strokeLinecap="round" />
        <motion.line x1="50" y1="40" x2="70" y2="55" stroke="#a78bca" strokeWidth="3" strokeLinecap="round" />
        <motion.line x1="50" y1="60" x2="38" y2="80" stroke="#a78bca" strokeWidth="3" strokeLinecap="round" />
        <motion.line x1="50" y1="60" x2="62" y2="80" stroke="#a78bca" strokeWidth="3" strokeLinecap="round" />
      </motion.g>
    ),
    'Child\'s Pose': (
      <motion.g animate={{ scaleY: [1, 0.97, 1] }} transition={{ repeat: Infinity, duration: 4 }}>
        <circle cx="25" cy="45" r="8" fill="#a78bca" />
        <path d="M25 53 Q35 70 60 72" stroke="#a78bca" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M35 60 Q45 75 30 80" stroke="#a78bca" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M40 62 Q50 77 35 82" stroke="#a78bca" strokeWidth="3" fill="none" strokeLinecap="round" />
        <motion.path d="M25 53 Q15 55 10 50" stroke="#c4a0d8" strokeWidth="3" fill="none" strokeLinecap="round"
          animate={{ d: ['M25 53 Q15 55 10 50', 'M25 53 Q15 58 8 55', 'M25 53 Q15 55 10 50'] }}
          transition={{ repeat: Infinity, duration: 4 }} />
      </motion.g>
    ),
    'Tree Pose': (
      <motion.g>
        <motion.circle cx="50" cy="15" r="8" fill="#a78bca" animate={{ rotate: [-3, 3, -3] }} transition={{ repeat: Infinity, duration: 2 }} style={{ transformOrigin: '50px 80px' }} />
        <line x1="50" y1="23" x2="50" y2="55" stroke="#a78bca" strokeWidth="3" strokeLinecap="round" />
        <motion.path d="M50 35 Q30 25 22 18" stroke="#a78bca" strokeWidth="3" fill="none" strokeLinecap="round"
          animate={{ d: ['M50 35 Q30 25 22 18', 'M50 35 Q28 22 20 15', 'M50 35 Q30 25 22 18'] }}
          transition={{ repeat: Infinity, duration: 2 }} />
        <motion.path d="M50 35 Q70 25 78 18" stroke="#a78bca" strokeWidth="3" fill="none" strokeLinecap="round"
          animate={{ d: ['M50 35 Q70 25 78 18', 'M50 35 Q72 22 80 15', 'M50 35 Q70 25 78 18'] }}
          transition={{ repeat: Infinity, duration: 2 }} />
        <line x1="50" y1="55" x2="42" y2="80" stroke="#a78bca" strokeWidth="3" strokeLinecap="round" />
        <motion.path d="M50 55 Q60 65 65 55" stroke="#a78bca" strokeWidth="3" fill="none" strokeLinecap="round"
          animate={{ d: ['M50 55 Q60 65 65 55', 'M50 55 Q62 67 67 57', 'M50 55 Q60 65 65 55'] }}
          transition={{ repeat: Infinity, duration: 2 }} />
      </motion.g>
    ),
    'Seated Meditation': (
      <motion.g>
        <motion.circle cx="50" cy="20" r="8" fill="#a78bca"
          animate={{ scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 4 }} />
        <path d="M50 28 Q50 45 50 50" stroke="#a78bca" strokeWidth="3" strokeLinecap="round" />
        <path d="M50 38 Q35 42 28 50" stroke="#a78bca" strokeWidth="3" strokeLinecap="round" />
        <path d="M50 38 Q65 42 72 50" stroke="#a78bca" strokeWidth="3" strokeLinecap="round" />
        <motion.path d="M30 55 Q50 65 70 55" stroke="#a78bca" strokeWidth="3" fill="none" strokeLinecap="round"
          animate={{ d: ['M30 55 Q50 65 70 55', 'M28 56 Q50 67 72 56', 'M30 55 Q50 65 70 55'] }}
          transition={{ repeat: Infinity, duration: 4 }} />
        <motion.circle cx="50" cy="10" r="3" fill="rgba(167,139,202,0.4)"
          animate={{ opacity: [0, 0.8, 0], y: [0, -15, -30], scale: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 3, delay: 0 }} />
        <motion.circle cx="44" cy="10" r="2" fill="rgba(167,139,202,0.3)"
          animate={{ opacity: [0, 0.6, 0], y: [0, -12, -24], scale: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 3, delay: 1 }} />
        <motion.circle cx="56" cy="10" r="2" fill="rgba(167,139,202,0.3)"
          animate={{ opacity: [0, 0.6, 0], y: [0, -12, -24], scale: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 3, delay: 2 }} />
      </motion.g>
    ),
    'Corpse Pose': (
      <motion.g animate={{ opacity: [1, 0.8, 1] }} transition={{ repeat: Infinity, duration: 5 }}>
        <circle cx="15" cy="50" r="8" fill="#a78bca" />
        <line x1="23" y1="50" x2="75" y2="50" stroke="#a78bca" strokeWidth="3" strokeLinecap="round" />
        <line x1="40" y1="50" x2="35" y2="65" stroke="#a78bca" strokeWidth="3" strokeLinecap="round" />
        <line x1="55" y1="50" x2="50" y2="65" stroke="#a78bca" strokeWidth="3" strokeLinecap="round" />
        <motion.line x1="40" y1="50" x2="38" y2="38" stroke="#c4a0d8" strokeWidth="2" strokeLinecap="round"
          animate={{ x2: [38, 36, 38] }} transition={{ repeat: Infinity, duration: 5 }} />
        <motion.line x1="55" y1="50" x2="57" y2="38" stroke="#c4a0d8" strokeWidth="2" strokeLinecap="round"
          animate={{ x2: [57, 59, 57] }} transition={{ repeat: Infinity, duration: 5 }} />
      </motion.g>
    ),
  }

  const defaultAnim = (
    <motion.g animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 3 }}>
      <circle cx="50" cy="20" r="8" fill="#a78bca" />
      <line x1="50" y1="28" x2="50" y2="60" stroke="#a78bca" strokeWidth="3" strokeLinecap="round" />
      <line x1="50" y1="40" x2="32" y2="52" stroke="#a78bca" strokeWidth="3" strokeLinecap="round" />
      <line x1="50" y1="40" x2="68" y2="52" stroke="#a78bca" strokeWidth="3" strokeLinecap="round" />
      <line x1="50" y1="60" x2="40" y2="82" stroke="#a78bca" strokeWidth="3" strokeLinecap="round" />
      <line x1="50" y1="60" x2="60" y2="82" stroke="#a78bca" strokeWidth="3" strokeLinecap="round" />
    </motion.g>
  )

  return (
    <svg viewBox="0 0 100 90" width="120" height="120">
      {animations[poseName] || defaultAnim}
    </svg>
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
          <motion.div key="pose"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

            {/* Session header */}
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

            {/* Pose progress dots */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 28, justifyContent: 'center' }}>
              {activeSession.poses.map((_, i) => (
                <div key={i} style={{
                  width: i === currentPose ? 24 : 8, height: 8, borderRadius: 4,
                  background: i < currentPose ? '#a78bca' : i === currentPose ? 'linear-gradient(90deg, #a78bca, #c4a0d8)' : 'rgba(167,139,202,0.2)',
                  transition: 'all 0.3s',
                }} />
              ))}
            </div>

            {/* Main pose card */}
            <motion.div key={currentPose}
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
              className="glass-card-static" style={{ padding: '40px 32px', marginBottom: 20, textAlign: 'center' }}>

              {/* Animation */}
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
                <div style={{
                  width: 160, height: 160, borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(167,139,202,0.1), rgba(196,160,216,0.15))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '2px solid rgba(167,139,202,0.2)',
                }}>
                  <PoseAnimation poseName={pose.name} />
                </div>
              </div>

              <p style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#a78bca', marginBottom: 6 }}>
                {pose.sanskrit}
              </p>
              <h3 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '2rem', fontWeight: 400, fontStyle: 'italic', color: '#2d2538', marginBottom: 12 }}>
                {pose.name}
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#8c7fa0', lineHeight: 1.7, marginBottom: 16, maxWidth: 480, margin: '0 auto 16px' }}>
                {pose.instructions}
              </p>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(167,139,202,0.1)', borderRadius: 50, padding: '6px 14px' }}>
                <span style={{ fontSize: '0.78rem', color: '#a78bca' }}>✨ {pose.benefit}</span>
              </div>

              {/* Timer */}
              <div style={{ marginTop: 28 }}>
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

            {/* Controls */}
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