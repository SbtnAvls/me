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
