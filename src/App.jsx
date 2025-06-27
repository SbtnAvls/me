import { useRef, useState, useEffect } from 'react'
import {
  House,
  Briefcase,
  Folder,
  Mail,
} from 'lucide-react'
import './App.css'
import Hero from './components/Hero.jsx'
import Experience from './components/Experience.jsx'
import Projects from './components/Projects.jsx'
import Contact from './components/Contact.jsx'

const sections = [
  { name: 'inicio', label: 'Inicio', icon: House },
  { name: 'experiencia', label: 'Experiencia', icon: Briefcase },
  { name: 'proyectos', label: 'Proyectos', icon: Folder },
  { name: 'contacto', label: 'Contacto', icon: Mail },
]

function App() {
  const refs = useRef([])
  const [active, setActive] = useState(0)

  const handleClick = (index) => {
    refs.current[index]?.scrollIntoView({ behavior: 'smooth' })
    setActive(index)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = refs.current.findIndex((el) => el === entry.target)
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            if (idx !== -1) {
              setActive(idx)
            }
          } else {
            entry.target.classList.remove('visible')
          }
        })
      },
      { threshold: 0.4 }
    )

    refs.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="app">
      <nav className="sidebar">
        <button className="profile-button">
          <span className="icon">
            <img src="/profile.jpg" alt="Perfil" className="profile-photo" />
          </span>
          <span className="label">Juan Sebastian Aviles</span>
        </button>
        <div className="sidebar-menu">
          {sections.map(({ name, label, icon: Icon }, idx) => (
            <button
              key={name}
              onClick={() => handleClick(idx)}
              className={idx === active ? 'active' : ''}
            >
              <span className="icon">
                <Icon />
              </span>
              <span className="label">{label}</span>
            </button>
          ))}
        </div>
        <div className="sidebar-bottom">
          <a href="mailto:juansebastian3g@gmail.com" className="contact-link">
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
            {idx === 1 && <Experience />}
            {idx === 2 && <Projects />}
            {idx === 3 && <Contact />}
          </section>
        ))}
      </div>
    </div>
  )
}

export default App
