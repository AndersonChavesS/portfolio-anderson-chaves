const SKILLS = [
  {
    icon: 'fa-laptop-code',
    title: 'Front-end',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'React', 'TypeScript'],
  },
  {
    icon: 'fa-palette',
    title: 'Design & UI',
    tags: ['Figma', 'Responsivo', 'Acessibilidade', 'CSS Animations'],
  },
  {
    icon: 'fa-tools',
    title: 'Ferramentas',
    tags: ['Git', 'GitHub', 'VS Code', 'npm', 'Vite'],
  },
  {
    icon: 'fa-brain',
    title: 'Em Aprendizado',
    tags: ['Node.js', 'REST APIs', 'Banco de Dados', 'Next.js'],
  },
]

export default function Skills() {
  return (
    <section id="habilidades">
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto' }} className="reveal">
          <p className="section-label">Habilidades</p>
          <h2 className="section-title">O que eu sei fazer</h2>
          <p className="section-subtitle">
            Tecnologias e ferramentas que utilizo para criar experiências
            digitais modernas e funcionais.
          </p>
        </div>

        <div className="skills-grid">
          {SKILLS.map((skill, i) => (
            <div key={skill.title} className="skill-card reveal" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="skill-icon">
                <i className={`fa-solid ${skill.icon}`} />
              </div>
              <h3>{skill.title}</h3>
              <div className="skill-tags">
                {skill.tags.map(tag => (
                  <span key={tag} className="skill-tag">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
