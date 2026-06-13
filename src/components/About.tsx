const STATS = [
  { number: '3+', label: 'Projetos Concluídos' },
  { number: '7ª', label: 'Turma Alpha edtech' },
  { number: '100%', label: 'Dedicação' },
  { number: '∞', label: 'Vontade de Aprender' },
]

const TIMELINE = [
  { title: 'Alpha edtech — Turma 7 Selene', desc: 'Formação em Desenvolvimento Web Full Stack' },
  { title: 'HTML & CSS Explorer', desc: 'Projetos de estudo e layout responsivo' },
  { title: 'JavaScript & React', desc: 'Em aprendizado contínuo' },
]

export default function About() {
  return (
    <section id="sobre">
      <div className="container">
        <div className="about-grid">
          {/* Text */}
          <div className="about-text reveal">
            <p className="section-label">Sobre Mim</p>
            <h2 className="section-title">Construindo o futuro,<br />linha a linha</h2>

            <p>
              Sou Anderson Chaves, um aspirante a desenvolvedor full-stack,
              atualmente focado em aprimorar minhas habilidades em
              desenvolvimento web.
            </p>
            <p>
              Faço parte da "turma 7 - Selene" do programa Alpha edtech, onde
              estou adquirindo conhecimentos valiosos para minha carreira. Esta
              sendo uma jornada incrível de aprendizado e crescimento
              profissional.
            </p>
            <p>
              Acredito que código bem escrito é arte — cada projeto é uma
              oportunidade de crescer e criar algo que faça diferença na vida
              das pessoas.
            </p>

            {/* Stats */}
            <div className="about-stats">
              {STATS.map(s => (
                <div key={s.label} className="stat-card">
                  <div className="stat-number">{s.number}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Card */}
          <div className="about-image-wrap reveal" style={{ animationDelay: '0.15s' }}>
            <div className="about-card-glow" />
            <div className="about-card">
              <h3 className="about-card-title">
                <i className="fa-solid fa-code-branch" style={{ marginRight: '0.6rem', color: 'var(--accent-primary)' }} />
                Minha Jornada
              </h3>
              {TIMELINE.map((item, i) => (
                <div key={i} className="timeline-item">
                  <div className="timeline-dot" />
                  <div className="timeline-content">
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
