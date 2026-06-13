export default function Hero() {
  return (
    <section id="inicio" className="hero">
      <div className="container hero-inner">
        {/* Text content */}
        <div className="hero-content reveal">
          <div className="hero-badge">
            <span>Disponível para oportunidades</span>
          </div>

          <h1 className="hero-title">
            Olá, eu sou<br />
            <span className="gradient-text">Anderson Chaves</span>
          </h1>

          <p className="hero-subtitle">Aspirante a Desenvolvedor Web Full Stack</p>

          <p className="hero-description">
            Transformando ideias em experiências digitais incríveis através de
            código limpo e design moderno.
          </p>

          <div className="hero-actions">
            <a href="#projetos" className="btn btn-primary">
              <i className="fa-solid fa-rocket" />
              Ver Projetos
            </a>
            <a href="#contato" className="btn btn-outline">
              <i className="fa-solid fa-paper-plane" />
              Entrar em Contato
            </a>
          </div>
        </div>

        {/* Avatar */}
        <div className="hero-visual reveal" style={{ animationDelay: '0.2s' }}>
          <div className="hero-avatar-wrapper">
            <div className="hero-avatar-ring" />
            <div className="hero-avatar-ring-inner" />
            <div className="hero-avatar-bg" />
            <div className="hero-avatar">
              <img
                src="/images/image-profile.png"
                alt="Foto de Anderson Chaves"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
