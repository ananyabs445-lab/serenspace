import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

export default function ThemeSelector() {
  const { themes, themeName, setTheme, theme } = useTheme()
  const [open, setOpen] = useState(false)

  return (
    <div style={{ position: 'relative' }}>
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(o => !o)}
        style={{
          background: theme.primaryLight,
          border: `1px solid ${theme.border}`,
          borderRadius: 50, padding: '7px 14px',
          cursor: 'pointer', fontSize: '0.82rem',
          fontFamily: '"DM Sans", sans-serif',
          fontWeight: 500, color: theme.primary,
          display: 'flex', alignItems: 'center', gap: 6,
        }}>
        {themes[themeName].emoji} Theme
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            style={{
              position: 'absolute', top: '110%', right: 0,
              background: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(20px)',
              borderRadius: 16, padding: '12px',
              boxShadow: '0 8px 32px rgba(45,37,56,0.15)',
              border: '1px solid rgba(255,255,255,0.8)',
              zIndex: 999, minWidth: 180,
            }}>
            <p style={{ fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8c7fa0', marginBottom: 8, padding: '0 4px' }}>Choose Theme</p>
            {Object.entries(themes).map(([key, t]) => (
              <motion.button
                key={key}
                whileHover={{ x: 4 }}
                onClick={() => { setTheme(key); setOpen(false) }}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                  padding: '9px 12px', borderRadius: 10, border: 'none',
                  background: themeName === key ? 'rgba(167,139,202,0.12)' : 'transparent',
                  cursor: 'pointer', fontFamily: '"DM Sans", sans-serif',
                  fontSize: '0.85rem', color: '#2d2538', fontWeight: themeName === key ? 600 : 400,
                  textAlign: 'left',
                }}>
                <span style={{ fontSize: '1.1rem' }}>{t.emoji}</span>
                <span>{t.name}</span>
                {themeName === key && <span style={{ marginLeft: 'auto', color: '#a78bca', fontSize: '0.75rem' }}>✓</span>}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {open && (
        <div onClick={() => setOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 998 }} />
      )}
    </div>
  )
}