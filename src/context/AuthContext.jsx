import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('seren_user')) } catch { return null }
  })

  const getAuthHeader = () => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('seren_token')}`
  })

  const register = async (name, email, password) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Registration failed')
    localStorage.setItem('seren_token', data.token)
    localStorage.setItem('seren_user', JSON.stringify(data.user))
    setUser(data.user)
  }

  const login = async (email, password) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Login failed')
    localStorage.setItem('seren_token', data.token)
    localStorage.setItem('seren_user', JSON.stringify(data.user))
    setUser(data.user)
  }

  const logout = () => {
    localStorage.removeItem('seren_token')
    localStorage.removeItem('seren_user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, register, login, logout, getAuthHeader }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)