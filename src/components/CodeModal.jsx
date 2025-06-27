import { useEffect } from 'react'
import './CodeModal.css'

export default function CodeModal({ open, onClose, code }) {
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])
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
