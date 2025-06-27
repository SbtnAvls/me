import { useEffect, useRef } from 'react'
import { Github, Linkedin } from 'lucide-react'
import './Hero.css'

const codeExample = [
  'function Hello() {',
  '  return <h1>Hello World</h1>',
  '}',
]

function Hero() {
  const title = "Hi! I'm Sebastian, React / React-Native developer"
  const titleRef = useRef(null)

  useEffect(() => {
    const el = titleRef.current
    if (!el) return

    const thresholds = Array.from({ length: 101 }, (_, i) => i / 100)
    const observer = new IntersectionObserver(
      ([entry]) => {
        el.style.opacity = String(entry.intersectionRatio)
      },
      { threshold: thresholds }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="hero-banner">
      <div className="hero-left">
        <h1 className="hero-title" ref={titleRef}>
          {title}
        </h1>
        <div className="hero-links">
          <a
            className="hero-link"
            href="https://github.com/SbtnAvls"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github size={20} /> GitHub
          </a>
          <a
            className="hero-link"
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin size={20} /> LinkedIn
          </a>
        </div>
      </div>
      <div className="hero-right">
        <div className="tools" aria-hidden="true">🛠️</div>
        <pre className="code-window">
          <code className="code-text">
            {codeExample.map((line, idx) => (
              <span
                key={idx}
                className="code-line"
                style={{
                  animation:
                    `typing 2s steps(${line.length}) ${idx * 2}s forwards` +
                    (idx === codeExample.length - 1
                      ? `, blink 0.8s step-end infinite ${idx * 2}s`
                      : ''),
                }}
              >
                {line}
              </span>
            ))}
          </code>
        </pre>
        <div className="phone">
          <div className="phone-screen">
            <p>Hello World</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
