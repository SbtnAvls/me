import './Hero.css'

const codeExample = [
  'function Hello() {',
  '  return <h1>Hello World</h1>',
  '}',
]

function Hero() {
  return (
    <div className="hero-banner">
      <div className="hero-left">
        <h1>Hi! I'm Sebastian, React / React-Native developer</h1>
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
                  animation: `typing 2s steps(${line.length}) ${idx * 2}s forwards` +
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
