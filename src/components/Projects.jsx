import { useState } from 'react'
import './Projects.css'

const categories = ['Todos', 'FullStack', 'Frontend', 'Backend']

const projects = [
  {
    title: 'App Servimax Tenderos',
    description:
      'Aplicación para la venta de productos dirigida a tenderos, disponible tanto en App Store como en Play Store. Desarrollada con React Native, TypeScript, Kotlin, Objective-C y Redux.',
    category: 'Frontend',
  },
  {
    title: 'App Servimax Vendedoras',
    description:
      'Aplicación con funcionamiento totalmente offline para el equipo de ventas presenciales. Publicada en App Store y Play Store y desarrollada con React Native, TypeScript, Kotlin, Objective-C y Redux.',
    category: 'Frontend',
  },
  {
    title: 'Servimax Conductores',
    description:
      'Aplicación con funciones offline completas que permite gestionar las entregas y los pagos contra entrega. Disponible en Play Store y App Store. Desarrollada con React Native, TypeScript, Kotlin, Objective-C y Redux.',
    category: 'Frontend',
  },
  {
    title: 'Chat de audio con IA',
    description:
      'Bot de Telegram que habilita la comunicación por voz con modelos como Gemma 3 ejecutados localmente.',
    category: 'FullStack',
  },
]

function Projects() {
  const [filter, setFilter] = useState('Todos')

  const filtered =
    filter === 'Todos' ? projects : projects.filter((p) => p.category === filter)

  return (
    <div className="projects-section">
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
      <div className="projects-card">
        <ul className="projects-list">
          {filtered.map((proj) => (
            <li key={proj.title} className="project-item">
              <h3>{proj.title}</h3>
              <p>{proj.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Projects
