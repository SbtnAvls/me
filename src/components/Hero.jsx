import './Hero.css'

const codeExample = `function Hello() {\n  return <h1>Hello World</h1>\n}`

function Hero() {
  return (
    <div className="hero-banner">
      <div className="hero-left">
        <h1>Hi! I'm Sebastian, React-ReactNative developer</h1>
      </div>
      <div className="hero-right">
        <div className="tools" aria-hidden="true">🛠️</div>
        <pre className="code-window">
          <code className="code-text">{codeExample}</code>
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
