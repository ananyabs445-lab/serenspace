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
  const poses = {
    'Mountain Pose': (
      <svg viewBox="0 0 100 120" width="130" height="130">
        <defs>
          <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a78bca" />
            <stop offset="100%" stopColor="#c4a0d8" />
          </linearGradient>
        </defs>
        <motion.g animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}>
          {/* Head */}
          <ellipse cx="50" cy="12" rx="9" ry="10" fill="url(#g1)" />
          {/* Neck */}
          <rect x="46" y="21" width="8" height="6" rx="2" fill="url(#g1)" />
          {/* Body */}
          <path d="M34 27 Q50 24 66 27 L62 65 Q50 68 38 65 Z" fill="url(#g1)" />
          {/* Left arm */}
          <path d="M34 30 Q24 40 22 58" stroke="url(#g1)" strokeWidth="7" fill="none" strokeLinecap="round" />
          <ellipse cx="21" cy="61" rx="4" ry="5" fill="url(#g1)" />
          {/* Right arm */}
          <path d="M66 30 Q76 40 78 58" stroke="url(#g1)" strokeWidth="7" fill="none" strokeLinecap="round" />
          <ellipse cx="79" cy="61" rx="4" ry="5" fill="url(#g1)" />
          {/* Left leg */}
          <path d="M42 65 Q40 85 39 105" stroke="url(#g1)" strokeWidth="8" fill="none" strokeLinecap="round" />
          <ellipse cx="39" cy="108" rx="6" ry="4" fill="url(#g1)" />
          {/* Right leg */}
          <path d="M58 65 Q60 85 61 105" stroke="url(#g1)" strokeWidth="8" fill="none" strokeLinecap="round" />
          <ellipse cx="61" cy="108" rx="6" ry="4" fill="url(#g1)" />
        </motion.g>
      </svg>
    ),
    'Sun Salutation': (
      <svg viewBox="0 0 120 110" width="130" height="130">
        <defs>
          <linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a78bca" />
            <stop offset="100%" stopColor="#c4a0d8" />
          </linearGradient>
        </defs>
        <motion.g
          animate={{ scaleY: [1, 1.02, 1] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}>
          {/* Head */}
          <ellipse cx="60" cy="10" rx="9" ry="9" fill="url(#g2)" />
          {/* Arms raised */}
          <path d="M42 28 Q30 18 22 10" stroke="url(#g2)" strokeWidth="7" fill="none" strokeLinecap="round" />
          <ellipse cx="19" cy="8" rx="5" ry="4" fill="url(#g2)" />
          <path d="M78 28 Q90 18 98 10" stroke="url(#g2)" strokeWidth="7" fill="none" strokeLinecap="round" />
          <ellipse cx="101" cy="8" rx="5" ry="4" fill="url(#g2)" />
          {/* Body upright */}
          <path d="M42 25 Q60 22 78 25 L74 58 Q60 62 46 58 Z" fill="url(#g2)" />
          {/* Left leg */}
          <path d="M50 58 Q46 78 44 98" stroke="url(#g2)" strokeWidth="8" fill="none" strokeLinecap="round" />
          <ellipse cx="43" cy="101" rx="7" ry="4" fill="url(#g2)" />
          {/* Right leg */}
          <path d="M70 58 Q74 78 76 98" stroke="url(#g2)" strokeWidth="8" fill="none" strokeLinecap="round" />
          <ellipse cx="77" cy="101" rx="7" ry="4" fill="url(#g2)" />
        </motion.g>
      </svg>
    ),
    'Warrior I': (
      <svg viewBox="0 0 130 120" width="130" height="130">
        <defs>
          <linearGradient id="g3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a78bca" />
            <stop offset="100%" stopColor="#c4a0d8" />
          </linearGradient>
        </defs>
        <motion.g animate={{ y: [0, -2, 0] }} transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}>
          {/* Head */}
          <ellipse cx="65" cy="10" rx="9" ry="9" fill="url(#g3)" />
          {/* Arms raised wide */}
          <path d="M48 28 Q35 20 22 14" stroke="url(#g3)" strokeWidth="7" fill="none" strokeLinecap="round" />
          <ellipse cx="19" cy="12" rx="5" ry="4" fill="url(#g3)" />
          <path d="M82 28 Q95 20 108 14" stroke="url(#g3)" strokeWidth="7" fill="none" strokeLinecap="round" />
          <ellipse cx="111" cy="12" rx="5" ry="4" fill="url(#g3)" />
          {/* Body slightly tilted */}
          <path d="M48 25 Q65 22 82 25 L78 60 Q65 63 52 60 Z" fill="url(#g3)" />
          {/* Front leg bent */}
          <path d="M58 60 Q55 72 42 82 Q38 90 36 100" stroke="url(#g3)" strokeWidth="8" fill="none" strokeLinecap="round" />
          <ellipse cx="34" cy="103" rx="8" ry="4" fill="url(#g3)" />
          {/* Back leg straight */}
          <path d="M72 60 Q80 75 88 98" stroke="url(#g3)" strokeWidth="8" fill="none" strokeLinecap="round" />
          <ellipse cx="90" cy="101" rx="8" ry="4" fill="url(#g3)" />
        </motion.g>
      </svg>
    ),
    'Tree Pose': (
      <svg viewBox="0 0 100 130" width="130" height="130">
        <defs>
          <linearGradient id="g4" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a78bca" />
            <stop offset="100%" stopColor="#c4a0d8" />
          </linearGradient>
        </defs>
        <motion.g
          animate={{ rotate: [-1.5, 1.5, -1.5] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          style={{ transformOrigin: '50px 125px' }}>
          {/* Head */}
          <ellipse cx="50" cy="10" rx="9" ry="9" fill="url(#g4)" />
          {/* Arms raised in prayer */}
          <path d="M38 30 Q28 22 20 16" stroke="url(#g4)" strokeWidth="6" fill="none" strokeLinecap="round" />
          <ellipse cx="17" cy="14" rx="4" ry="4" fill="url(#g4)" />
          <path d="M62 30 Q72 22 80 16" stroke="url(#g4)" strokeWidth="6" fill="none" strokeLinecap="round" />
          <ellipse cx="83" cy="14" rx="4" ry="4" fill="url(#g4)" />
          {/* Body */}
          <path d="M36 25 Q50 22 64 25 L61 62 Q50 65 39 62 Z" fill="url(#g4)" />
          {/* Standing leg */}
          <path d="M50 62 Q50 85 50 118" stroke="url(#g4)" strokeWidth="9" fill="none" strokeLinecap="round" />
          <ellipse cx="50" cy="121" rx="8" ry="4" fill="url(#g4)" />
          {/* Raised leg - foot on inner thigh */}
          <path d="M44 75 Q32 78 24 88" stroke="url(#g4)" strokeWidth="7" fill="none" strokeLinecap="round" />
          <ellipse cx="21" cy="90" rx="5" ry="4" fill="url(#g4)" />
        </motion.g>
      </svg>
    ),
    "Child's Pose": (
      <svg viewBox="0 0 140 90" width="140" height="110">
        <defs>
          <linearGradient id="g5" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a78bca" />
            <stop offset="100%" stopColor="#c4a0d8" />
          </linearGradient>
        </defs>
        <motion.g
          animate={{ scaleY: [1, 0.97, 1] }}
          transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}>
          {/* Head resting */}
          <ellipse cx="18" cy="52" rx="10" ry="9" fill="url(#g5)" />
          {/* Arms extended forward */}
          <path d="M26 48 Q50 42 80 40 Q100 38 118 36" stroke="url(#g5)" strokeWidth="7" fill="none" strokeLinecap="round" />
          <ellipse cx="121" cy="35" rx="5" ry="4" fill="url(#g5)" />
          <path d="M26 56 Q50 50 80 48 Q100 46 118 44" stroke="url(#g5)" strokeWidth="7" fill="none" strokeLinecap="round" />
          <ellipse cx="121" cy="43" rx="5" ry="4" fill="url(#g5)" />
          {/* Body curved down */}
          <path d="M26 48 Q35 58 42 65 Q50 70 60 72 Q72 74 80 70" stroke="url(#g5)" strokeWidth="10" fill="none" strokeLinecap="round" />
          {/* Hips up */}
          <ellipse cx="82" cy="66" rx="12" ry="10" fill="url(#g5)" />
          {/* Legs folded */}
          <path d="M90 70 Q100 75 105 80" stroke="url(#g5)" strokeWidth="8" fill="none" strokeLinecap="round" />
          <ellipse cx="107" cy="82" rx="7" ry="5" fill="url(#g5)" />
          <path d="M76 70 Q86 75 91 80" stroke="url(#g5)" strokeWidth="8" fill="none" strokeLinecap="round" />
        </motion.g>
      </svg>
    ),
    'Cat-Cow Stretch': (
      <svg viewBox="0 0 140 100" width="140" height="110">
        <defs>
          <linearGradient id="g6" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a78bca" />
            <stop offset="100%" stopColor="#c4a0d8" />
          </linearGradient>
        </defs>
        <motion.g>
          {/* Head */}
          <motion.ellipse cx="18" cy="45" rx="10" ry="9" fill="url(#g6)"
            animate={{ cy: [45, 40, 45] }} transition={{ repeat: Infinity, duration: 3 }} />
          {/* Spine arch */}
          <motion.path
            d="M26 45 Q50 30 80 35 Q100 38 114 42"
            stroke="url(#g6)" strokeWidth="10" fill="none" strokeLinecap="round"
            animate={{ d: ['M26 45 Q50 30 80 35 Q100 38 114 42', 'M26 45 Q50 55 80 50 Q100 47 114 42', 'M26 45 Q50 30 80 35 Q100 38 114 42'] }}
            transition={{ repeat: Infinity, duration: 3 }} />
          {/* Hips */}
          <motion.ellipse cx="116" cy="44" rx="10" ry="9" fill="url(#g6)"
            animate={{ cy: [44, 46, 44] }} transition={{ repeat: Infinity, duration: 3 }} />
          {/* Front arms */}
          <line x1="35" y1="48" x2="30" y2="72" stroke="url(#g6)" strokeWidth="7" strokeLinecap="round" />
          <ellipse cx="29" cy="75" rx="5" ry="4" fill="url(#g6)" />
          <line x1="50" y1="46" x2="46" y2="72" stroke="url(#g6)" strokeWidth="7" strokeLinecap="round" />
          <ellipse cx="45" cy="75" rx="5" ry="4" fill="url(#g6)" />
          {/* Back legs */}
          <line x1="100" y1="46" x2="104" y2="72" stroke="url(#g6)" strokeWidth="7" strokeLinecap="round" />
          <ellipse cx="105" cy="75" rx="5" ry="4" fill="url(#g6)" />
          <line x1="112" y1="47" x2="118" y2="72" stroke="url(#g6)" strokeWidth="7" strokeLinecap="round" />
          <ellipse cx="119" cy="75" rx="5" ry="4" fill="url(#g6)" />
        </motion.g>
      </svg>
    ),
    'Seated Forward Fold': (
      <svg viewBox="0 0 140 100" width="140" height="110">
        <defs>
          <linearGradient id="g7" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a78bca" />
            <stop offset="100%" stopColor="#c4a0d8" />
          </linearGradient>
        </defs>
        <motion.g animate={{ scaleY: [1, 0.98, 1] }} transition={{ repeat: Infinity, duration: 4 }}>
          {/* Head folding forward */}
          <ellipse cx="95" cy="35" rx="9" ry="9" fill="url(#g7)" />
          {/* Torso bent forward */}
          <path d="M30 55 Q55 45 80 40 Q88 38 95 35" stroke="url(#g7)" strokeWidth="10" fill="none" strokeLinecap="round" />
          {/* Arms reaching to feet */}
          <path d="M55 48 Q45 55 28 62" stroke="url(#g7)" strokeWidth="6" fill="none" strokeLinecap="round" />
          <ellipse cx="24" cy="63" rx="5" ry="4" fill="url(#g7)" />
          <path d="M70 44 Q60 52 40 60" stroke="url(#g7)" strokeWidth="6" fill="none" strokeLinecap="round" />
          <ellipse cx="36" cy="61" rx="5" ry="4" fill="url(#g7)" />
          {/* Legs extended */}
          <path d="M95 44 Q80 55 20 65" stroke="url(#g7)" strokeWidth="9" fill="none" strokeLinecap="round" />
          <path d="M95 52 Q80 62 20 72" stroke="url(#g7)" strokeWidth="9" fill="none" strokeLinecap="round" />
          {/* Feet */}
          <ellipse cx="16" cy="65" rx="5" ry="7" fill="url(#g7)" />
          <ellipse cx="16" cy="72" rx="5" ry="7" fill="url(#g7)" />
          {/* Sitting base */}
          <ellipse cx="95" cy="60" rx="12" ry="8" fill="url(#g7)" />
        </motion.g>
      </svg>
    ),
    'Legs Up The Wall': (
      <svg viewBox="0 0 140 120" width="140" height="120">
        <defs>
          <linearGradient id="g8" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a78bca" />
            <stop offset="100%" stopColor="#c4a0d8" />
          </linearGradient>
        </defs>
        <motion.g animate={{ opacity: [1, 0.85, 1] }} transition={{ repeat: Infinity, duration: 5 }}>
          {/* Wall */}
          <rect x="118" y="0" width="6" height="120" rx="3" fill="rgba(167,139,202,0.2)" />
          {/* Head */}
          <ellipse cx="18" cy="75" rx="9" ry="9" fill="url(#g8)" />
          {/* Body lying down */}
          <path d="M26 72 Q55 68 85 66 Q100 65 112 64" stroke="url(#g8)" strokeWidth="11" fill="none" strokeLinecap="round" />
          {/* Hips */}
          <ellipse cx="114" cy="68" rx="10" ry="9" fill="url(#g8)" />
          {/* Arms relaxed at sides */}
          <path d="M45 76 Q40 86 36 92" stroke="url(#g8)" strokeWidth="6" fill="none" strokeLinecap="round" />
          <ellipse cx="34" cy="94" rx="5" ry="4" fill="url(#g8)" />
          <path d="M65 74 Q60 84 56 90" stroke="url(#g8)" strokeWidth="6" fill="none" strokeLinecap="round" />
          <ellipse cx="54" cy="92" rx="5" ry="4" fill="url(#g8)" />
          {/* Legs up */}
          <path d="M114 60 Q116 40 117 15" stroke="url(#g8)" strokeWidth="9" fill="none" strokeLinecap="round" />
          <path d="M114 68 Q116 48 117 23" stroke="url(#g8)" strokeWidth="9" fill="none" strokeLinecap="round" />
          {/* Feet */}
          <ellipse cx="117" cy="11" rx="4" ry="6" fill="url(#g8)" />
          <ellipse cx="117" cy="19" rx="4" ry="6" fill="url(#g8)" />
        </motion.g>
      </svg>
    ),
    'Corpse Pose': (
      <svg viewBox="0 0 160 80" width="150" height="100">
        <defs>
          <linearGradient id="g9" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a78bca" />
            <stop offset="100%" stopColor="#c4a0d8" />
          </linearGradient>
        </defs>
        <motion.g animate={{ opacity: [1, 0.7, 1] }} transition={{ repeat: Infinity, duration: 6 }}>
          {/* Head */}
          <ellipse cx="14" cy="38" rx="10" ry="9" fill="url(#g9)" />
          {/* Body */}
          <path d="M23 34 Q70 30 110 32 Q130 33 144 34" stroke="url(#g9)" strokeWidth="12" fill="none" strokeLinecap="round" />
          {/* Left arm away from body */}
          <path d="M50 38 Q48 50 46 62" stroke="url(#g9)" strokeWidth="7" fill="none" strokeLinecap="round" />
          <ellipse cx="45" cy="65" rx="5" ry="4" fill="url(#g9)" />
          {/* Right arm away */}
          <path d="M80 37 Q78 49 76 61" stroke="url(#g9)" strokeWidth="7" fill="none" strokeLinecap="round" />
          <ellipse cx="75" cy="64" rx="5" ry="4" fill="url(#g9)" />
          {/* Left leg */}
          <path d="M120 35 Q122 48 124 62" stroke="url(#g9)" strokeWidth="8" fill="none" strokeLinecap="round" />
          <ellipse cx="125" cy="65" rx="6" ry="4" fill="url(#g9)" />
          {/* Right leg */}
          <path d="M135 35 Q137 48 139 62" stroke="url(#g9)" strokeWidth="8" fill="none" strokeLinecap="round" />
          <ellipse cx="140" cy="65" rx="6" ry="4" fill="url(#g9)" />
          {/* Breathing dots */}
          <motion.circle cx="14" cy="25" r="3" fill="rgba(167,139,202,0.5)"
            animate={{ opacity: [0, 1, 0], y: [0, -8, -16] }}
            transition={{ repeat: Infinity, duration: 4, delay: 0 }} />
          <motion.circle cx="8" cy="25" r="2" fill="rgba(196,160,216,0.4)"
            animate={{ opacity: [0, 0.8, 0], y: [0, -6, -12] }}
            transition={{ repeat: Infinity, duration: 4, delay: 1.5 }} />
        </motion.g>
      </svg>
    ),
    'Easy Pose': (
      <svg viewBox="0 0 110 110" width="130" height="130">
        <defs>
          <linearGradient id="g10" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a78bca" />
            <stop offset="100%" stopColor="#c4a0d8" />
          </linearGradient>
        </defs>
        <motion.g animate={{ scale: [1, 1.02, 1] }} transition={{ repeat: Infinity, duration: 4 }}>
          {/* Head */}
          <ellipse cx="55" cy="12" rx="10" ry="10" fill="url(#g10)" />
          {/* Body upright */}
          <path d="M40 26 Q55 22 70 26 L67 58 Q55 62 43 58 Z" fill="url(#g10)" />
          {/* Arms on knees */}
          <path d="M40 36 Q28 48 22 62" stroke="url(#g10)" strokeWidth="7" fill="none" strokeLinecap="round" />
          <ellipse cx="20" cy="65" rx="5" ry="5" fill="url(#g10)" />
          <path d="M70 36 Q82 48 88 62" stroke="url(#g10)" strokeWidth="7" fill="none" strokeLinecap="round" />
          <ellipse cx="90" cy="65" rx="5" ry="5" fill="url(#g10)" />
          {/* Cross-legged */}
          <path d="M43 58 Q30 65 18 68 Q10 72 14 78" stroke="url(#g10)" strokeWidth="8" fill="none" strokeLinecap="round" />
          <ellipse cx="15" cy="81" rx="7" ry="5" fill="url(#g10)" />
          <path d="M67 58 Q80 65 92 68 Q100 72 96 78" stroke="url(#g10)" strokeWidth="8" fill="none" strokeLinecap="round" />
          <ellipse cx="95" cy="81" rx="7" ry="5" fill="url(#g10)" />
          {/* Meditation aura */}
          <motion.circle cx="55" cy="12" r="16" fill="none" stroke="rgba(167,139,202,0.2)" strokeWidth="2"
            animate={{ r: [16, 22, 16], opacity: [0.4, 0, 0.4] }}
            transition={{ repeat: Infinity, duration: 3 }} />
        </motion.g>
      </svg>
    ),
    'Seated Meditation': (
      <svg viewBox="0 0 110 120" width="130" height="130">
        <defs>
          <linearGradient id="g11" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a78bca" />
            <stop offset="100%" stopColor="#c4a0d8" />
          </linearGradient>
        </defs>
        <motion.g>
          {/* Aura rings */}
          <motion.circle cx="55" cy="14" r="20" fill="none" stroke="rgba(167,139,202,0.15)" strokeWidth="2"
            animate={{ r: [20, 30, 20], opacity: [0.5, 0, 0.5] }}
            transition={{ repeat: Infinity, duration: 3, delay: 0 }} />
          <motion.circle cx="55" cy="14" r="14" fill="none" stroke="rgba(196,160,216,0.2)" strokeWidth="2"
            animate={{ r: [14, 22, 14], opacity: [0.6, 0, 0.6] }}
            transition={{ repeat: Infinity, duration: 3, delay: 0.5 }} />
          {/* Head */}
          <ellipse cx="55" cy="14" rx="10" ry="10" fill="url(#g11)" />
          {/* Body */}
          <path d="M40 28 Q55 24 70 28 L67 62 Q55 66 43 62 Z" fill="url(#g11)" />
          {/* Arms in mudra */}
          <path d="M40 38 Q28 50 20 64" stroke="url(#g11)" strokeWidth="7" fill="none" strokeLinecap="round" />
          <ellipse cx="18" cy="67" rx="5" ry="5" fill="url(#g11)" />
          <path d="M70 38 Q82 50 90 64" stroke="url(#g11)" strokeWidth="7" fill="none" strokeLinecap="round" />
          <ellipse cx="92" cy="67" rx="5" ry="5" fill="url(#g11)" />
          {/* Cross-legged */}
          <path d="M43 62 Q30 70 16 72 Q8 76 12 82" stroke="url(#g11)" strokeWidth="8" fill="none" strokeLinecap="round" />
          <ellipse cx="13" cy="85" rx="7" ry="5" fill="url(#g11)" />
          <path d="M67 62 Q80 70 94 72 Q102 76 98 82" stroke="url(#g11)" strokeWidth="8" fill="none" strokeLinecap="round" />
          <ellipse cx="97" cy="85" rx="7" ry="5" fill="url(#g11)" />
          {/* Floating breath particles */}
          <motion.circle cx="55" cy="4" r="3" fill="rgba(167,139,202,0.6)"
            animate={{ opacity: [0, 1, 0], y: [0, -12, -24] }}
            transition={{ repeat: Infinity, duration: 3, delay: 0 }} />
          <motion.circle cx="47" cy="6" r="2" fill="rgba(196,160,216,0.5)"
            animate={{ opacity: [0, 0.8, 0], y: [0, -10, -20] }}
            transition={{ repeat: Infinity, duration: 3, delay: 1 }} />
          <motion.circle cx="63" cy="6" r="2" fill="rgba(196,160,216,0.5)"
            animate={{ opacity: [0, 0.8, 0], y: [0, -10, -20] }}
            transition={{ repeat: Infinity, duration: 3, delay: 2 }} />
        </motion.g>
      </svg>
    ),
    'Happy Baby': (
      <svg viewBox="0 0 140 110" width="140" height="120">
        <defs>
          <linearGradient id="g12" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a78bca" />
            <stop offset="100%" stopColor="#c4a0d8" />
          </linearGradient>
        </defs>
        <motion.g
          animate={{ rotate: [-3, 3, -3] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          style={{ transformOrigin: '70px 70px' }}>
          {/* Head */}
          <ellipse cx="70" cy="18" rx="10" ry="10" fill="url(#g12)" />
          {/* Body on back */}
          <path d="M55 28 Q70 24 85 28 L83 58 Q70 62 57 58 Z" fill="url(#g12)" />
          {/* Arms grabbing feet */}
          <path d="M57 36 Q44 42 36 54 Q30 62 32 72" stroke="url(#g12)" strokeWidth="7" fill="none" strokeLinecap="round" />
          <path d="M83 36 Q96 42 104 54 Q110 62 108 72" stroke="url(#g12)" strokeWidth="7" fill="none" strokeLinecap="round" />
          {/* Legs up and bent */}
          <path d="M60 58 Q50 68 42 72 Q36 76 32 72" stroke="url(#g12)" strokeWidth="8" fill="none" strokeLinecap="round" />
          <ellipse cx="30" cy="71" rx="6" ry="5" fill="url(#g12)" />
          <path d="M80 58 Q90 68 98 72 Q104 76 108 72" stroke="url(#g12)" strokeWidth="8" fill="none" strokeLinecap="round" />
          <ellipse cx="110" cy="71" rx="6" ry="5" fill="url(#g12)" />
        </motion.g>
      </svg>
    ),
    'Butterfly Pose': (
      <svg viewBox="0 0 120 110" width="130" height="120">
        <defs>
          <linearGradient id="g13" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a78bca" />
            <stop offset="100%" stopColor="#c4a0d8" />
          </linearGradient>
        </defs>
        <motion.g>
          {/* Head */}
          <ellipse cx="60" cy="12" rx="10" ry="10" fill="url(#g13)" />
          {/* Body */}
          <path d="M44 26 Q60 22 76 26 L73 60 Q60 64 47 60 Z" fill="url(#g13)" />
          {/* Arms */}
          <path d="M44 36 Q34 46 28 56" stroke="url(#g13)" strokeWidth="7" fill="none" strokeLinecap="round" />
          <ellipse cx="26" cy="59" rx="5" ry="5" fill="url(#g13)" />
          <path d="M76 36 Q86 46 92 56" stroke="url(#g13)" strokeWidth="7" fill="none" strokeLinecap="round" />
          <ellipse cx="94" cy="59" rx="5" ry="5" fill="url(#g13)" />
          {/* Butterfly legs - feet together */}
          <motion.path d="M47 60 Q30 70 18 80 Q10 88 16 94"
            stroke="url(#g13)" strokeWidth="8" fill="none" strokeLinecap="round"
            animate={{ d: ['M47 60 Q30 70 18 80 Q10 88 16 94', 'M47 60 Q30 72 20 84 Q12 92 18 96', 'M47 60 Q30 70 18 80 Q10 88 16 94'] }}
            transition={{ repeat: Infinity, duration: 2 }} />
          <motion.path d="M73 60 Q90 70 102 80 Q110 88 104 94"
            stroke="url(#g13)" strokeWidth="8" fill="none" strokeLinecap="round"
            animate={{ d: ['M73 60 Q90 70 102 80 Q110 88 104 94', 'M73 60 Q90 72 100 84 Q108 92 102 96', 'M73 60 Q90 70 102 80 Q110 88 104 94'] }}
            transition={{ repeat: Infinity, duration: 2 }} />
          {/* Feet meeting */}
          <ellipse cx="60" cy="96" rx="10" ry="6" fill="url(#g13)" />
        </motion.g>
      </svg>
    ),
    'Supine Twist': (
      <svg viewBox="0 0 150 100" width="150" height="110">
        <defs>
          <linearGradient id="g14" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a78bca" />
            <stop offset="100%" stopColor="#c4a0d8" />
          </linearGradient>
        </defs>
        <motion.g animate={{ scaleX: [1, 1.01, 1] }} transition={{ repeat: Infinity, duration: 5 }}>
          {/* Head turned */}
          <ellipse cx="18" cy="42" rx="10" ry="9" fill="url(#g14)" />
          {/* Body */}
          <path d="M27 38 Q65 34 95 36 Q110 37 118 40" stroke="url(#g14)" strokeWidth="11" fill="none" strokeLinecap="round" />
          {/* Arm spread wide */}
          <path d="M45 42 Q42 55 40 68" stroke="url(#g14)" strokeWidth="6" fill="none" strokeLinecap="round" />
          <ellipse cx="39" cy="71" rx="5" ry="4" fill="url(#g14)" />
          <path d="M65 40 Q90 30 110 22" stroke="url(#g14)" strokeWidth="6" fill="none" strokeLinecap="round" />
          <ellipse cx="113" cy="20" rx="5" ry="4" fill="url(#g14)" />
          {/* Hips */}
          <ellipse cx="120" cy="44" rx="11" ry="9" fill="url(#g14)" />
          {/* Knee crossed over */}
          <path d="M115 38 Q100 30 85 35 Q74 40 70 52" stroke="url(#g14)" strokeWidth="9" fill="none" strokeLinecap="round" />
          <ellipse cx="68" cy="55" rx="8" ry="7" fill="url(#g14)" />
          {/* Other leg */}
          <path d="M125 50 Q130 65 132 80" stroke="url(#g14)" strokeWidth="8" fill="none" strokeLinecap="round" />
          <ellipse cx="133" cy="83" rx="6" ry="4" fill="url(#g14)" />
        </motion.g>
      </svg>
    ),
    'Eagle Pose': (
      <svg viewBox="0 0 100 130" width="120" height="130">
        <defs>
          <linearGradient id="g15" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a78bca" />
            <stop offset="100%" stopColor="#c4a0d8" />
          </linearGradient>
        </defs>
        <motion.g
          animate={{ rotate: [-1, 1, -1] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
          style={{ transformOrigin: '50px 115px' }}>
          {/* Head */}
          <ellipse cx="50" cy="12" rx="9" ry="9" fill="url(#g15)" />
          {/* Body */}
          <path d="M38 26 Q50 22 62 26 L59 58 Q50 62 41 58 Z" fill="url(#g15)" />
          {/* Arms wrapped */}
          <path d="M38 34 Q44 38 50 36 Q56 34 62 34 Q58 40 50 42 Q42 44 38 40 Z" fill="url(#g15)" />
          <path d="M46 30 Q50 26 54 30" stroke="url(#g15)" strokeWidth="5" fill="none" strokeLinecap="round" />
          {/* Standing leg */}
          <path d="M50 58 Q50 80 50 112" stroke="url(#g15)" strokeWidth="9" fill="none" strokeLinecap="round" />
          <ellipse cx="50" cy="115" rx="8" ry="4" fill="url(#g15)" />
          {/* Wrapped leg */}
          <path d="M44 70 Q36 76 32 86 Q28 94 32 100" stroke="url(#g15)" strokeWidth="7" fill="none" strokeLinecap="round" />
          <ellipse cx="33" cy="103" rx="6" ry="4" fill="url(#g15)" />
        </motion.g>
      </svg>
    ),
    'Warrior III': (
      <svg viewBox="0 0 150 100" width="150" height="110">
        <defs>
          <linearGradient id="g16" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a78bca" />
            <stop offset="100%" stopColor="#c4a0d8" />
          </linearGradient>
        </defs>
        <motion.g animate={{ y: [0, -2, 0] }} transition={{ repeat: Infinity, duration: 3 }}>
          {/* Head forward */}
          <ellipse cx="128" cy="46" rx="9" ry="9" fill="url(#g16)" />
          {/* Body horizontal */}
          <path d="M75 50 Q100 47 118 47" stroke="url(#g16)" strokeWidth="11" fill="none" strokeLinecap="round" />
          {/* Arms extended forward */}
          <path d="M118 44 Q128 42 138 40" stroke="url(#g16)" strokeWidth="7" fill="none" strokeLinecap="round" />
          <ellipse cx="141" cy="39" rx="5" ry="4" fill="url(#g16)" />
          <path d="M118 50 Q128 50 138 50" stroke="url(#g16)" strokeWidth="7" fill="none" strokeLinecap="round" />
          <ellipse cx="141" cy="50" rx="5" ry="4" fill="url(#g16)" />
          {/* Standing leg */}
          <path d="M75 50 Q72 65 70 90" stroke="url(#g16)" strokeWidth="9" fill="none" strokeLinecap="round" />
          <ellipse cx="69" cy="93" rx="7" ry="4" fill="url(#g16)" />
          {/* Raised leg back */}
          <path d="M75 50 Q60 50 40 50 Q28 50 20 52" stroke="url(#g16)" strokeWidth="9" fill="none" strokeLinecap="round" />
          <ellipse cx="16" cy="52" rx="5" ry="7" fill="url(#g16)" />
        </motion.g>
      </svg>
    ),
  }

  const defaultPose = (
    <svg viewBox="0 0 100 120" width="130" height="130">
      <defs>
        <linearGradient id="gd" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a78bca" />
          <stop offset="100%" stopColor="#c4a0d8" />
        </linearGradient>
      </defs>
      <motion.g animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 3 }}>
        <ellipse cx="50" cy="12" rx="9" ry="9" fill="url(#gd)" />
        <path d="M36 26 Q50 22 64 26 L61 62 Q50 65 39 62 Z" fill="url(#gd)" />
        <path d="M36 36 Q24 46 20 60" stroke="url(#gd)" strokeWidth="7" fill="none" strokeLinecap="round" />
        <ellipse cx="18" cy="63" rx="5" ry="4" fill="url(#gd)" />
        <path d="M64 36 Q76 46 80 60" stroke="url(#gd)" strokeWidth="7" fill="none" strokeLinecap="round" />
        <ellipse cx="82" cy="63" rx="5" ry="4" fill="url(#gd)" />
        <path d="M44 62 Q42 82 40 105" stroke="url(#gd)" strokeWidth="8" fill="none" strokeLinecap="round" />
        <ellipse cx="39" cy="108" rx="6" ry="4" fill="url(#gd)" />
        <path d="M56 62 Q58 82 60 105" stroke="url(#gd)" strokeWidth="8" fill="none" strokeLinecap="round" />
        <ellipse cx="61" cy="108" rx="6" ry="4" fill="url(#gd)" />
      </motion.g>
    </svg>
  )

  return poses[poseName] || defaultPose
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