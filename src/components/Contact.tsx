import { useState } from 'react'

const CONTACT_ITEMS = [
  { icon: 'fa-envelope', label: 'Email', value: 'andersonchaves@gmail.com' },
  { icon: 'fa-mobile-screen', label: 'Telefone', value: '+55 (99) 99999-9999' },
  { icon: 'fa-location-dot', label: 'Localização', value: 'Itaituba, PA — Brasil' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 3500)
    setForm({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <section id="contato">
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto' }} className="reveal">
          <p className="section-label">Contato</p>
          <h2 className="section-title">Entre em Contato</h2>
          <p className="section-subtitle">
            Estou sempre aberto a discutir novos projetos, ideias criativas ou
            oportunidades para fazer parte da sua visão.
          </p>
        </div>

        <div className="contact-grid">
          {/* Info */}
          <div className="contact-info reveal">
            <h3>Vamos trabalhar juntos!</h3>
            <p>
              Se você tem um projeto em mente ou quer conversar sobre
              oportunidades, não hesite em entrar em contato.
            </p>

            <div className="contact-items">
              {CONTACT_ITEMS.map(item => (
                <div key={item.label} className="contact-item">
                  <div className="contact-icon">
                    <i className={`fa-solid ${item.icon}`} />
                  </div>
                  <div className="contact-item-text">
                    <h4>{item.label}</h4>
                    <p>{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="social-links">
              <a
                href="https://github.com/AndersonChavesS"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <i className="fa-brands fa-github" />
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/developer-anderson-chaves/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <i className="fa-brands fa-linkedin" />
                LinkedIn
              </a>
            </div>
          </div>

          {/* Form */}
          <form className="contact-form reveal" onSubmit={handleSubmit} style={{ animationDelay: '0.15s' }}>
            <div className="form-group">
              <label htmlFor="contact-name">Nome</label>
              <input
                id="contact-name"
                type="text"
                placeholder="Seu nome completo"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="contact-email">Email</label>
              <input
                id="contact-email"
                type="email"
                placeholder="seu@email.com"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="contact-subject">Assunto</label>
              <input
                id="contact-subject"
                type="text"
                placeholder="Sobre o que você quer falar?"
                value={form.subject}
                onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
              />
            </div>
            <div className="form-group">
              <label htmlFor="contact-message">Mensagem</label>
              <textarea
                id="contact-message"
                rows={5}
                placeholder="Escreva sua mensagem aqui..."
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              {sent ? (
                <><i className="fa-solid fa-check" /> Mensagem Enviada!</>
              ) : (
                <><i className="fa-solid fa-paper-plane" /> Enviar Mensagem</>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
