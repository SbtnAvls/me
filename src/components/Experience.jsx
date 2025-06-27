import { useMemo } from 'react'
import './Experience.css'

const notes = [
  {
    title: '✨ Quién soy',
    content: [
      'Hola, soy Juan Sebastián Solano Avilés, desarrollador full-stack de 23 años. Llevo 3 años y medio convirtiendo ideas en productos reales. Para mí, programar es lo más parecido a tener superpoderes: materializar soluciones que impactan a las personas.',
    ],
  },
  {
    title: '🖥️ Front-end & Mobile',
    content: [
      'React + React Native',
      'Redux Toolkit, React Reanimated y módulos nativos',
      '4 apps publicadas en iOS & Android',
      'Responsabilidades: UI/UX, pruebas, despliegue, métricas post-lanzamiento',
    ],
  },
  {
    title: '⚙️ Back-end & DevOps',
    content: [
      'Node.js + TypeScript y Python para microservicios',
      'Infraestructura en GCP y Firebase',
      'Bases de datos SQL y NoSQL',
      'Automatización con contenedores y CI/CD pipelines',
    ],
  },
  {
    title: '📱 Código Nativo',
    content: [
      'Kotlin y Objective-C',
      'Herramientas: Xcode & Android Studio',
      'Desarrollo o integración de módulos nativos cuando el rendimiento lo exige',
    ],
  },
  {
    title: '🤖 Experimentos en IA',
    content: [
      'Modelos locales en LM Studio (p. ej. Gemma 3)',
      'Whisper + Coqui TTS para procesamiento de voz en tiempo real',
      'Próximamente verás estos proyectos (visión por computador, chatbots, etc.) en la sección Proyectos',
    ],
  },
  {
    title: '🌱 Filosofía Personal',
    content: [
      'Curiosidad insaciable, obsesión por el detalle y ganas de compartir conocimiento.',
      'Meta: seguir construyendo productos que enamoren a los usuarios y desafíen mis límites como desarrollador y como ser humano.',
    ],
  },
]

function Experience() {
  const rotations = useMemo(() =>
    notes.map(() => Math.random() * 30 - 15),
  [])

  return (
    <div className="experience-section">
      <div className="experience-wrapper">
        <h2 className="experience-title">
          <span className="experience-title-text">Experiencia</span>
        </h2>
        <div className="postics-container">
          {notes.map((note, idx) => (
            <div
              key={note.title}
              className="postic"
              style={{ transform: `rotate(${rotations[idx]}deg)` }}
            >
              <h3>{note.title}</h3>
              {note.content.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Experience
