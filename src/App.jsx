import { useRef } from 'react'
import './App.css'

const sections = [
  'inicio',
  'experiencia',
  'proyectos',
  'inspiracion',
  'contacto',
]

function App() {
  const refs = useRef([])

  const handleClick = (index) => {
    refs.current[index]?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="app">
      <nav className="sidebar">
        {sections.map((item, idx) => (
          <button key={item} onClick={() => handleClick(idx)}>
            {item}
          </button>
        ))}
      </nav>
      <div className="pages">
        {sections.map((item, idx) => (
          <section
            key={item}
            ref={(el) => {
              refs.current[idx] = el
            }}
            id={item}
            className="page"
          ></section>
        ))}
      </div>
    </div>
  )
}

export default App
