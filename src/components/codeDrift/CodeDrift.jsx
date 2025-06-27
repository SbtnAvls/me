import { useMemo } from 'react';
import './CodeDrift.css';

interface CodeDriftProps {
  /** Nº de “hileras” de texto que cruzan la pantalla */
  rows?: number;
  /** Tiempo (s) que tarda cada hilera en cruzar */
  baseDuration?: number;
}

export default function CodeDrift({ rows = 14, baseDuration = 20 }: CodeDriftProps) {
  // Generamos un array con código aleatorio solo la primera vez
  const snippets = useMemo(() => {
    const samples = [
      'const sum = (a,b) => a + b;',
      'if (result === void 0) return;',
      'for (let i=0;i<items.length;i++){ }',
      'def hello(): print("Hello")',
      'useEffect(()=>{},[])',
      '#pragma GCC diagnostic',
      'public class MyClass { }',
      'SELECT * FROM users;',
      'async function main() { await fetch() }',
      'let _ = [].flatMap(decodeThought);',
    ];
    return Array.from({ length: rows }, () =>
      Array.from({ length: 8 }, () => samples[Math.floor(Math.random() * samples.length)]).join('   ')
    );
  }, [rows]);

  return (
    <div className="code-drift-wrapper">
      {snippets.map((snippet, i) => (
        <span
          key={i}
          className="code-drift-line"
          style={{
            // Duración y desfase para que no vayan sincronizadas
            animationDuration: `${baseDuration + (i % 5) * 2}s`,
            animationDelay: `${-(i * 1.5)}s`,
            top: `calc(${(i / rows) * 100}% - 0.5rem)`,
          }}
        >
          {snippet}
        </span>
      ))}
    </div>
  );
}
