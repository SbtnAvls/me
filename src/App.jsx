import { useRef } from 'react'
import {
  House,
  Briefcase,
  Folder,
  Lightbulb,
  Mail,
} from './icons.jsx'
import './App.css'
import Hero from './components/Hero.jsx'

const sections = [
  { name: 'inicio', label: 'Inicio', icon: House },
  { name: 'experiencia', label: 'Experiencia', icon: Briefcase },
  { name: 'proyectos', label: 'Proyectos', icon: Folder },
  { name: 'inspiracion', label: 'Inspiracion', icon: Lightbulb },
  { name: 'contacto', label: 'Contacto', icon: Mail },
]

function App() {
  const refs = useRef([])

  const handleClick = (index) => {
    refs.current[index]?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="app">
      <nav className="sidebar">
        <div className="sidebar-menu">
          {sections.map(({ name, label, icon: Icon }, idx) => (
            <button key={name} onClick={() => handleClick(idx)}>
              <span className="icon">
                <Icon />
              </span>
              <span className="label">{label}</span>
            </button>
          ))}
        </div>
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
