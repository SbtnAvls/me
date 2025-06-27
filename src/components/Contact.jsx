import './Contact.css'
import { FaGithub, FaLinkedin, FaWhatsapp, FaInstagram, FaEnvelope } from 'react-icons/fa'

function Contact() {
  return (
    <div className="contact-section">
      <p className="contact-message">
        Gracias por tu visita. Puedes encontrarme en mis redes sociales. ¡Se agradecen las recomendaciones!
      </p>
      <div className="contact-buttons">
        <a
          href="https://github.com/SbtnAvls"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <FaGithub size={24} />
        </a>
        <a
          href="https://www.linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <FaLinkedin size={24} />
        </a>
        <a
          href="https://wa.me/573023350784"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
        >
          <FaWhatsapp size={24} />
        </a>
        <a
          href="https://www.instagram.com/sopadepan_?igsh=MTQyNHBra2plNzlodQ%3D%3D&utm_source=qr"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <FaInstagram size={24} />
        </a>
        <a href="mailto:juansebastian3g@gmail.com" aria-label="Gmail">
          <FaEnvelope size={24} />
        </a>
      </div>
    </div>
  )
}

export default Contact
