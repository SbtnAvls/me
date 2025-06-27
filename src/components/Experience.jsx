import { Marquee } from '../registry/magicui/marquee'
import { cn } from '../lib/utils'
import './Experience.css'

const notes = [
  {
    title: '✨ Quién soy',
    content: [
      'Mi nombre es Juan Sebastián, desarrollador full-stack de 23 años. Llevo 3 años y medio convirtiendo ideas en productos reales. Para mí, programar es lo más parecido a tener superpoderes: materializar soluciones que impactan a las personas.',
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
  const firstRow = notes.slice(0, Math.ceil(notes.length / 2))
  const secondRow = notes.slice(Math.ceil(notes.length / 2))

  return (
    <div className="experience-section">
      <div className="experience-wrapper">
        <h2 className="experience-title">
          <span className="experience-title-text">Experiencia</span>
        </h2>
        <div className="experience-marquee">
          <Marquee pauseOnHover className="marquee" repeat={2}>
            {firstRow.map((note) => (
              <figure key={note.title} className={cn('experience-card')}>
                <figcaption>
                  <h3>{note.title}</h3>
                </figcaption>
                {note.content.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </figure>
            ))}
          </Marquee>
          <Marquee pauseOnHover reverse className="marquee" repeat={2}>
            {secondRow.map((note) => (
              <figure key={note.title} className={cn('experience-card')}>
                <figcaption>
                  <h3>{note.title}</h3>
                </figcaption>
                {note.content.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </figure>
            ))}
          </Marquee>
        </div>
      </div>
    </div>
  )
}

export default Experience
