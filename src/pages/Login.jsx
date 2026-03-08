import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [serverErr, setServerErr] = useState('')
  const [showPass, setShowPass] = useState(false)

  const validate = () => {
    const e = {}
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Enter a valid email address.'
    if (pass.length < 6) e.pass = 'Password must be at least 6 characters.'
    return e
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setErrors({})
    setLoading(true)
    setServerErr('')
    try {
      await login(email, pass)
      navigate('/dashboard')
    } catch (err) {
      setServerErr(err.message || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '100px 24px 40px', position: 'relative', zIndex: 1,
    }}>

      {/* Decorative blobs */}
      <div style={{ position: 'fixed', top: '15%', left: '5%', width: 200, height: 200, borderRadius: '50%', background: 'rgba(167,139,202,0.12)', filter: 'blur(60px)', pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', bottom: '20%', right: '5%', width: 250, height: 250, borderRadius: '50%', background: 'rgba(252,224,236,0.2)', filter: 'blur(70px)', pointerEvents: 'none' }} />

      <motion.div
        initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        style={{ width: '100%', maxWidth: 420 }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.8rem', fontWeight: 600, color: '#2d2538' }}>
            Seren<span style={{ color: '#a78bca' }}>Space</span>
          </p>
          <p style={{ fontSize: '0.78rem', color: '#c0b4d0', letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: 4 }}>
            Breathe. Be still. Begin again.
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(24px)',
          borderRadius: 24,
          padding: '40px 36px',
          border: '1px solid rgba(255,255,255,0.9)',
          boxShadow: '0 8px 40px rgba(45,37,56,0.08)',
        }}>
          <h2 style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: '1.9rem', fontWeight: 400, fontStyle: 'italic',
            color: '#2d2538', marginBottom: 4, textAlign: 'center',
          }}>Welcome back 🌿</h2>
          <p style={{ color: '#8c7fa0', fontSize: '0.85rem', marginBottom: 32, textAlign: 'center' }}>
            Sign in to continue your practice
          </p>

          {serverErr && (
            <div style={{
              background: 'rgba(224,112,144,0.08)',
              border: '1px solid rgba(224,112,144,0.25)',
              borderRadius: 10, padding: '10px 14px',
              fontSize: '0.84rem', color: '#c05070', marginBottom: 20,
              textAlign: 'center',
            }}>{serverErr}</div>
          )}

          {/* Email */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8c7fa0', marginBottom: 8 }}>
              Email
            </label>
            <input className="seren-input" type="email" placeholder="you@college.edu"
              value={email} onChange={e => setEmail(e.target.value)} />
            {errors.email && <p style={{ fontSize: '0.78rem', color: '#e07090', marginTop: 5 }}>{errors.email}</p>}
          </div>

          {/* Password */}
          <div style={{ marginBottom: 28 }}>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8c7fa0', marginBottom: 8 }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input className="seren-input" type={showPass ? 'text' : 'password'} placeholder="Your password"
                value={pass} onChange={e => setPass(e.target.value)} style={{ paddingRight: 52 }} />
              <button type="button" onClick={() => setShowPass(p => !p)} style={{
                position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', cursor: 'pointer',
                fontSize: '0.8rem', color: '#a78bca', fontWeight: 500,
              }}>{showPass ? 'Hide' : 'Show'}</button>
            </div>
            {errors.pass && <p style={{ fontSize: '0.78rem', color: '#e07090', marginTop: 5 }}>{errors.pass}</p>}
          </div>

          {/* Submit */}
          <button type="button" onClick={handleSubmit}
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center', padding: '13px', fontSize: '0.95rem' }}
            disabled={loading}>
            {loading ? '🌿 Signing in...' : 'Sign in →'}
          </button>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '24px 0' }}>
            <div style={{ flex: 1, height: 1, background: 'rgba(167,139,202,0.15)' }} />
            <p style={{ fontSize: '0.75rem', color: '#c0b4d0' }}>or</p>
            <div style={{ flex: 1, height: 1, background: 'rgba(167,139,202,0.15)' }} />
          </div>

          <p style={{ textAlign: 'center', fontSize: '0.85rem', color: '#8c7fa0' }}>
            New to SerenSpace?{' '}
            <Link to="/signup" style={{ color: '#a78bca', textDecoration: 'none', fontWeight: 500 }}>
              Create an account
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
