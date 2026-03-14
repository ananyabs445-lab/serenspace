export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(167,139,202,0.15)',
      padding: '32px 40px',
      textAlign: 'center',
      background: 'rgba(255,255,255,0.4)',
      backdropFilter: 'blur(10px)',
    }}>
      <p style={{
        fontFamily: '"Cormorant Garamond", serif',
        fontSize: '1.2rem', color: '#a78bca',
        marginBottom: 8,
      }}>
        Seren<span style={{ color: '#2d2538' }}>Space</span>
      </p>
      <p style={{ fontSize: '0.78rem', color: '#8c7fa0', marginBottom: 6 }}>
        Breathe. Be still. Begin again.
      </p>
      <p style={{ fontSize: '0.72rem', color: '#c0b4d0' }}>
        © 2026 SerenSpace · Built with MERN Stack · BCA Final Year Project
      </p>
    </footer>
  )
}