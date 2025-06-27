import { useEffect, useState } from 'react'
import './Hero.css'

const codeExample = [
  'function Hello() {',
  '  return <h1>Hello World</h1>',
  '}',
]

function Hero() {
  const title = "Hi! I'm Sebastian, React / React-Native developer"
  const [visibleText, setVisibleText] = useState('')
  const [typed, setTyped] = useState(false)

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      i += 1
      setVisibleText(title.slice(0, i))
      if (i >= title.length) {
        clearInterval(interval)
        setTyped(true)
      }
    }, 50)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (!typed) return
    const handleScroll = () => {
      const scrolled = Math.min(window.scrollY, window.innerHeight)
      const progress = scrolled / window.innerHeight
      const len = Math.floor(title.length * (1 - progress))
      setVisibleText(title.slice(0, len))
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [typed])

  return (
    <div className="hero-banner">
      <div className="hero-left">
        <h1 className="hero-title">
          {visibleText}
          <span className="cursor" aria-hidden="true">|</span>
        </h1>
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
