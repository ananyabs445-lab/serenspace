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
      { name: 'Mountain Pose', sanskrit: 'Tadasana', duration: 30, benefit: 'Improves posture and balance', instructions: 'Stand tall, feet together, arms at sides, breathe deeply', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Tadasana_Yoga-Asana_Nina-Mel.jpg/440px-Tadasana_Yoga-Asana_Nina-Mel.jpg' },
      { name: 'Sun Salutation', sanskrit: 'Surya Namaskar', duration: 45, benefit: 'Energizes entire body', instructions: 'Flow through forward fold, plank, cobra, and back up', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Surya_namaskar.jpg/440px-Surya_namaskar.jpg' },
      { name: 'Warrior I', sanskrit: 'Virabhadrasana I', duration: 30, benefit: 'Builds strength and focus', instructions: 'Step one foot back, bend front knee, raise arms overhead', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Warrior_I_Pose_-_Virabhadrasana_I.jpg/440px-Warrior_I_Pose_-_Virabhadrasana_I.jpg' },
      { name: 'Tree Pose', sanskrit: 'Vrikshasana', duration: 30, benefit: 'Improves balance and concentration', instructions: 'Stand on one leg, place other foot on inner thigh, hands in prayer', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Vriksasana_Yoga-Asana_Nina-Mel.jpg/440px-Vriksasana_Yoga-Asana_Nina-Mel.jpg' },
      { name: "Child's Pose", sanskrit: 'Balasana', duration: 45, benefit: 'Calms the mind and relieves stress', instructions: 'Kneel, sit back on heels, extend arms forward, rest forehead down', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Balasana_Yoga-Asana_Nina-Mel.jpg/440px-Balasana_Yoga-Asana_Nina-Mel.jpg' },
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
      { name: "Child's Pose", sanskrit: 'Balasana', duration: 60, benefit: 'Deeply relaxes the nervous system', instructions: 'Kneel, sit back on heels, extend arms forward, breathe slowly', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Balasana_Yoga-Asana_Nina-Mel.jpg/440px-Balasana_Yoga-Asana_Nina-Mel.jpg' },
      { name: 'Cat-Cow Stretch', sanskrit: 'Marjaryasana', duration: 45, benefit: 'Releases spine tension', instructions: 'On hands and knees, alternate arching and rounding your back', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Marjariasana.jpg/440px-Marjariasana.jpg' },
      { name: 'Seated Forward Fold', sanskrit: 'Paschimottanasana', duration: 45, benefit: 'Calms anxiety and stress', instructions: 'Sit with legs extended, reach forward toward your feet, breathe', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Paschimottanasana_Yoga-Asana_Nina-Mel.jpg/440px-Paschimottanasana_Yoga-Asana_Nina-Mel.jpg' },
      { name: 'Legs Up The Wall', sanskrit: 'Viparita Karani', duration: 60, benefit: 'Reduces stress and fatigue instantly', instructions: 'Lie on back, extend legs up against wall, relax completely', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Viparita_Karani.jpg/440px-Viparita_Karani.jpg' },
      { name: 'Corpse Pose', sanskrit: 'Savasana', duration: 90, benefit: 'Complete relaxation of body and mind', instructions: 'Lie flat on back, arms at sides, eyes closed, breathe naturally', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Shavasana_Yoga-Asana_Nina-Mel.jpg/440px-Shavasana_Yoga-Asana_Nina-Mel.jpg' },
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
      { name: 'Easy Pose', sanskrit: 'Sukhasana', duration: 60, benefit: 'Centers the mind for focus', instructions: 'Sit cross-legged, spine tall, hands on knees, eyes closed', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/thirty/Sukhasana_Yoga-Asana_Nina-Mel.jpg/440px-Sukhasana_Yoga-Asana_Nina-Mel.jpg' },
      { name: 'Eagle Pose', sanskrit: 'Garudasana', duration: 30, benefit: 'Improves concentration', instructions: 'Stand, cross one leg over other, wrap arms, focus on one point', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Garudasana_Yoga-Asana_Nina-Mel.jpg/440px-Garudasana_Yoga-Asana_Nina-Mel.jpg' },
      { name: 'Warrior III', sanskrit: 'Virabhadrasana III', duration: 30, benefit: 'Builds mental strength', instructions: 'Balance on one leg, extend body parallel to floor, arms forward', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Virabhadrasana_III_Yoga-Asana_Nina-Mel.jpg/440px-Virabhadrasana_III_Yoga-Asana_Nina-Mel.jpg' },
      { name: 'Seated Meditation', sanskrit: 'Dhyana', duration: 120, benefit: 'Clears mental clutter', instructions: 'Sit comfortably, close eyes, focus only on your breath', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/thirty/Sukhasana_Yoga-Asana_Nina-Mel.jpg/440px-Sukhasana_Yoga-Asana_Nina-Mel.jpg' },
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
      { name: 'Butterfly Pose', sanskrit: 'Baddha Konasana', duration: 60, benefit: 'Releases hip tension from sitting', instructions: 'Sit, bring soles of feet together, gently flutter knees up and down', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Baddha_Konasana_Yoga-Asana_Nina-Mel.jpg/440px-Baddha_Konasana_Yoga-Asana_Nina-Mel.jpg' },
      { name: 'Supine Twist', sanskrit: 'Supta Matsyendrasana', duration: 45, benefit: 'Releases spine and promotes sleep', instructions: 'Lie on back, bring knee to chest, cross it over body, arms spread', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Supta_Matsyendrasana_Yoga-Asana_Nina-Mel.jpg/440px-Supta_Matsyendrasana_Yoga-Asana_Nina-Mel.jpg' },
      { name: 'Happy Baby', sanskrit: 'Ananda Balasana', duration: 45, benefit: 'Calms the nervous system', instructions: 'Lie on back, grab outer feet, gently rock side to side', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Ananda_Balasana_Yoga-Asana_Nina-Mel.jpg/440px-Ananda_Balasana_Yoga-Asana_Nina-Mel.jpg' },
      { name: 'Legs Up The Wall', sanskrit: 'Viparita Karani', duration: 90, benefit: 'Reduces anxiety before sleep', instructions: 'Lie on back, legs up against wall, breathe slowly for full duration', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Viparita_Karani.jpg/440px-Viparita_Karani.jpg' },
      { name: 'Corpse Pose', sanskrit: 'Savasana', duration: 120, benefit: 'Prepares body for sleep', instructions: 'Lie completely still, scan body from toes to head, release all tension', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Shavasana_Yoga-Asana_Nina-Mel.jpg/440px-Shavasana_Yoga-Asana_Nina-Mel.jpg' },
    ]
  },
]

function PoseImage({ src, name }) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  return (
    <div style={{
      position: 'relative', width: 200, height: 200,
      borderRadius: '50%', overflow: 'hidden',
      border: '3px solid rgba(167,139,202,0.3)',
      boxShadow: '0 8px 32px rgba(167,139,202,0.2)',
    }}>
      {!loaded && !error && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(167,139,202,0.08)' }}>
          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
            style={{ width: 32, height: 32, borderRadius: '50%', border: '3px solid #a78bca', borderTopColor: 'transparent' }} />
        </div>
      )}
      {error && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(167,139,202,0.08)' }}>
          <p style={{ fontSize: '3rem' }}>🧘</p>
          <p style={{ fontSize: '0.7rem', color: '#a78bca', textAlign: 'center', padding: '0 12px' }}>{name}</p>
        </div>
      )}
      {!error && (
        <motion.img
          src={src}
          alt={name}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          animate={loaded ? { scale: [1.05, 1, 1.05] } : { scale: 1.1 }}
          transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.3s',
          }}
        />
      )}
      {/* Purple overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(135deg, rgba(167,139,202,0.2), rgba(196,160,216,0.1))',
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

              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 28 }}>
                <PoseImage src={pose.image} name={pose.name} />
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