import { useState, useRef, useEffect } from 'react'
import CodeDrift from './codeDrift/CodeDrift'
import CodeModal from './CodeModal'
import botCode from '../assets/telegram_voice_bot.py?raw'
import './Projects.css'

const categories = ['Todos', 'Frontend', 'Backend']

const projects = [
  {
    title: 'App Servimax Tenderos',
    description:
      'Aplicación para la venta de productos dirigida a tenderos, disponible tanto en App Store como en Play Store.',
    techs: ['React Native', 'TypeScript', 'Objective-C', "Kotlin"],
    image: '/vite.svg',
    category: 'Frontend',
  },
  {
    title: 'App Servimax Vendedoras',
    description:
      'Aplicación con funcionamiento totalmente offline para el equipo de ventas presenciales. Publicada en App Store y Play Store',
    techs: ['React Native', 'TypeScript', 'Objective-C', "Kotlin"],
    image: '/vite.svg',
    category: 'Frontend',
  },
  {
    title: 'Servimax Conductores',
    description:
      'Aplicación con funciones offline completas que permite gestionar las entregas y los pagos contra entrega. Disponible en Play Store',
    techs: ['React Native', 'TypeScript', 'Objective-C', "Kotlin"],
    image: '/vite.svg',
    category: 'Frontend',
  },
  {
    title: 'Chat de audio con IA',
    description:
      'Bot de Telegram que habilita la comunicación por voz con modelos como Gemma 3 ejecutados localmente.',
    techs: ['Python'],
    image: '/vite.svg',
    category: 'Backend',
    code: botCode,
  },
]

function Projects() {
  const [filter, setFilter] = useState('Todos')
  const containerRef = useRef(null)
  const [codeOpen, setCodeOpen] = useState(null)

  useEffect(() => {
    containerRef.current?.scrollTo({ top: 0 })
  }, [filter])

  const filtered =
    filter === 'Todos' ? projects : projects.filter((p) => p.category === filter)

  return (
    <div className="projects-section" ref={containerRef}>
      <CodeDrift />
      <div className="projects-card">
        
        <div className="projects-nav-wrapper">
          <nav className="projects-nav">
            {categories.map((cat) => (
              <button
                key={cat}
                className={filter === cat ? 'active' : ''}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </nav>
        </div>

        <ul className="projects-list">
          {filtered.map((proj) => (
            <li key={proj.title} className="project-item">
              <div className="project-info">
                <h3>{proj.title}</h3>
                <p>{proj.description}</p>
                <div className="project-techs">
                  {proj.techs.map((t) => (
                    <span key={t} className="tech">
                      {t}
                    </span>
                  ))}
                </div>
                {proj.code && (
                  <button
                    className="code-button"
                    onClick={() => setCodeOpen(proj.code)}
                  >
                    Ver Código
                  </button>
                )}
              </div>
              <div className="project-image">
                <img src={proj.image} alt={proj.title} />
              </div>
            </li>
          ))}
        </ul>
      </div>
      <CodeModal open={!!codeOpen} onClose={() => setCodeOpen(null)} code={codeOpen} />
    </div>
  )
}

export default Projects
