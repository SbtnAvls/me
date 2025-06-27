import { useEffect } from 'react'
import './CodeModal.css'

export default function CodeModal({ open, onClose, code }) {
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)

    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', handleKey)
    }
  }, [open, onClose])
  if (!open) return null
  return (
    <div className="code-modal-overlay" onClick={onClose}>
      <div className="code-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>Cerrar</button>
        <pre className="modal-code"><code>{code}</code></pre>
      </div>
    </div>
  )
}
