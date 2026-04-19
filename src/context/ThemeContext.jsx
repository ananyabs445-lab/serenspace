import { createContext, useContext, useState, useEffect } from 'react'

const themes = {
  lavender: {
    name: 'Lavender Dream',
    emoji: '🌸',
    bg: 'linear-gradient(135deg, #f5f0ff 0%, #fce4f0 50%, #e8f4ff 100%)',
    primary: '#a78bca',
    primaryLight: 'rgba(167,139,202,0.15)',
    accent: '#c4a0d8',
    text: '#2d2538',
    muted: '#8c7fa0',
    card: 'rgba(255,255,255,0.65)',
    border: 'rgba(167,139,202,0.2)',
  },
  midnight: {
    name: 'Midnight Focus',
    emoji: '🌙',
    bg: 'linear-gradient(135deg, #0f0c1a 0%, #1a1030 50%, #0c1525 100%)',
    primary: '#b39ddb',
    primaryLight: 'rgba(179,157,219,0.2)',
    accent: '#ce93d8',
    text: '#ede7f6',
    muted: '#9e8fb2',
    card: 'rgba(255,255,255,0.07)',
    border: 'rgba(179,157,219,0.2)',
  },
  rose: {
    name: 'Rose Gold',
    emoji: '🌹',
    bg: 'linear-gradient(135deg, #fff0f3 0%, #ffe4e8 50%, #fff8f0 100%)',
    primary: '#e8748a',
    primaryLight: 'rgba(232,116,138,0.12)',
    accent: '#f48fb1',
    text: '#3d1a24',
    muted: '#9e6070',
    card: 'rgba(255,255,255,0.7)',
    border: 'rgba(232,116,138,0.2)',
  },
  forest: {
    name: 'Forest Calm',
    emoji: '🌿',
    bg: 'linear-gradient(135deg, #f0fff4 0%, #e8f5e9 50%, #f0f4ff 100%)',
    primary: '#66bb6a',
    primaryLight: 'rgba(102,187,106,0.12)',
    accent: '#81c784',
    text: '#1b2e1c',
    muted: '#5a7a5c',
    card: 'rgba(255,255,255,0.65)',
    border: 'rgba(102,187,106,0.2)',
  },
  ocean: {
    name: 'Ocean Breeze',
    emoji: '🌊',
    bg: 'linear-gradient(135deg, #e8f4ff 0%, #e0f7fa 50%, #f0e8ff 100%)',
    primary: '#29b6f6',
    primaryLight: 'rgba(41,182,246,0.12)',
    accent: '#4dd0e1',
    text: '#0d2137',
    muted: '#4a7a9b',
    card: 'rgba(255,255,255,0.65)',
    border: 'rgba(41,182,246,0.2)',
  },
}

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [themeName, setThemeName] = useState(() => localStorage.getItem('seren_theme') || 'lavender')
  const theme = themes[themeName] || themes.lavender

  const setTheme = (name) => {
    setThemeName(name)
    localStorage.setItem('seren_theme', name)
  }

  return (
    <ThemeContext.Provider value={{ theme, themeName, setTheme, themes }}>
      <div style={{
        minHeight: '100vh',
        background: theme.bg,
        transition: 'background 0.6s ease',
      }}>
        {children}
      </div>
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)