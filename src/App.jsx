import { useRef } from 'react'
import './App.css'
import Hero from './components/Hero.jsx'

const sections = [
  { name: 'inicio', icon: '🏠' },
  { name: 'experiencia', icon: '💼' },
  { name: 'proyectos', icon: '💻' },
  { name: 'inspiracion', icon: '💡' },
  { name: 'contacto', icon: '✉️' },
]

function App() {
  const refs = useRef([])

  const handleClick = (index) => {
    refs.current[index]?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="app">
      <nav className="sidebar">
        {sections.map(({ name, icon }, idx) => (
          <button key={name} onClick={() => handleClick(idx)}>
            <span className="icon">{icon}</span>
            <span className="label">{name}</span>
          </button>
        ))}
        <div className="sidebar-bottom">
          <a
            href="https://wa.me/573023350784"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="icon">💬</span>
            <span className="label">WhatsApp</span>
          </a>
          <a href="mailto:juansebastian3g@gmail.com">
            <span className="icon">📧</span>
            <span className="label">Correo</span>
          </a>
        </div>
      </nav>
      <div className="pages">
        {sections.map(({ name }, idx) => (
          <section
            key={name}
            ref={(el) => {
              refs.current[idx] = el
            }}
            id={name}
            className="page"
          >
            {idx === 0 && <Hero />}
          </section>
        ))}
      </div>
    </div>
  )
}

export default App
