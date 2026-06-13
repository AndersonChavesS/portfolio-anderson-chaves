import { useContactForm } from '../hooks/useContactForm'

const CONTACT_ITEMS = [
  { icon: 'fa-envelope',      label: 'Email',       value: 'andersonmaiconchaves@gmail.com' },
  { icon: 'fa-mobile-screen', label: 'Telefone',    value: '+55 (99) 99999-9999' },
  { icon: 'fa-location-dot',  label: 'Localização', value: 'Itaituba, PA — Brasil' },
]

export default function Contact() {
  const {
    values,
    errors,
    touched,
    status,
    rateLimitMsg,
    handleChange,
    handleBlur,
    handleSubmit,
    resetStatus,
  } = useContactForm()

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
          {/* ── Info ────────────────────────────────────────────────── */}
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

          {/* ── Form ────────────────────────────────────────────────── */}
          <form
            className="contact-form reveal"
            onSubmit={handleSubmit}
            noValidate
            style={{ animationDelay: '0.15s' }}
          >
            {/* Honeypot — invisível para humanos, armadilha para bots */}
            <input
              type="text"
              name="_hp"
              value={values._hp}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              style={{ display: 'none' }}
            />

            {/* Nome */}
            <div className={`form-group${touched.name ? (errors.name ? ' has-error' : ' has-success') : ''}`}>
              <label htmlFor="contact-name">
                Nome <span className="required-star">*</span>
              </label>
              <div className="input-wrapper">
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  placeholder="Seu nome completo"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  maxLength={80}
                  required
                  autoComplete="name"
                  aria-describedby={errors.name && touched.name ? 'name-error' : undefined}
                  aria-invalid={!!(errors.name && touched.name)}
                />
                {touched.name && (
                  <span className="field-icon" aria-hidden="true">
                    <i className={`fa-solid ${errors.name ? 'fa-circle-xmark' : 'fa-circle-check'}`} />
                  </span>
                )}
              </div>
              {errors.name && touched.name && (
                <p id="name-error" className="field-error" role="alert">
                  <i className="fa-solid fa-triangle-exclamation" />
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div className={`form-group${touched.email ? (errors.email ? ' has-error' : ' has-success') : ''}`}>
              <label htmlFor="contact-email">
                Email <span className="required-star">*</span>
              </label>
              <div className="input-wrapper">
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  maxLength={254}
                  required
                  autoComplete="email"
                  aria-describedby={errors.email && touched.email ? 'email-error' : undefined}
                  aria-invalid={!!(errors.email && touched.email)}
                />
                {touched.email && (
                  <span className="field-icon" aria-hidden="true">
                    <i className={`fa-solid ${errors.email ? 'fa-circle-xmark' : 'fa-circle-check'}`} />
                  </span>
                )}
              </div>
              {errors.email && touched.email && (
                <p id="email-error" className="field-error" role="alert">
                  <i className="fa-solid fa-triangle-exclamation" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Assunto */}
            <div className={`form-group${touched.subject ? (errors.subject ? ' has-error' : '') : ''}`}>
              <label htmlFor="contact-subject">Assunto</label>
              <div className="input-wrapper">
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  placeholder="Sobre o que você quer falar?"
                  value={values.subject}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  maxLength={120}
                />
              </div>
              {errors.subject && touched.subject && (
                <p className="field-error" role="alert">
                  <i className="fa-solid fa-triangle-exclamation" />
                  {errors.subject}
                </p>
              )}
            </div>

            {/* Mensagem */}
            <div className={`form-group${touched.message ? (errors.message ? ' has-error' : ' has-success') : ''}`}>
              <label htmlFor="contact-message">
                Mensagem <span className="required-star">*</span>
              </label>
              <div className="input-wrapper">
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  placeholder="Escreva sua mensagem aqui..."
                  value={values.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  maxLength={2000}
                  required
                  aria-describedby={errors.message && touched.message ? 'message-error' : 'message-count'}
                  aria-invalid={!!(errors.message && touched.message)}
                />
              </div>
              <div className="field-footer">
                {errors.message && touched.message ? (
                  <p id="message-error" className="field-error" role="alert">
                    <i className="fa-solid fa-triangle-exclamation" />
                    {errors.message}
                  </p>
                ) : <span />}
                <span
                  id="message-count"
                  className={`char-count${values.message.length > 1900 ? ' char-count--warn' : ''}`}
                  aria-live="polite"
                >
                  {values.message.length}/2000
                </span>
              </div>
            </div>

            {/* Rate limit feedback */}
            {status === 'rate_limited' && (
              <div className="form-alert form-alert--warn" role="alert">
                <i className="fa-solid fa-clock" />
                {rateLimitMsg}
                <button type="button" className="alert-close" onClick={resetStatus} aria-label="Fechar">
                  <i className="fa-solid fa-xmark" />
                </button>
              </div>
            )}

            {/* Error feedback */}
            {status === 'error' && (
              <div className="form-alert form-alert--error" role="alert">
                <i className="fa-solid fa-circle-exclamation" />
                Erro ao enviar. Verifique sua conexão e tente novamente.
                <button type="button" className="alert-close" onClick={resetStatus} aria-label="Fechar">
                  <i className="fa-solid fa-xmark" />
                </button>
              </div>
            )}

            {/* Submit */}
            {status === 'success' ? (
              <div className="form-success" role="status">
                <i className="fa-solid fa-circle-check" />
                <div>
                  <strong>Mensagem enviada!</strong>
                  <p>Obrigado pelo contato. Responderei em breve!</p>
                </div>
              </div>
            ) : (
              <button
                type="submit"
                className="btn btn-primary"
                disabled={status === 'sending'}
                style={{ width: '100%', justifyContent: 'center' }}
              >
                {status === 'sending' ? (
                  <><i className="fa-solid fa-spinner fa-spin" /> Enviando...</>
                ) : (
                  <><i className="fa-solid fa-paper-plane" /> Enviar Mensagem</>
                )}
              </button>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
