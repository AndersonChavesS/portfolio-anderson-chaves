interface Project {
  title: string
  description: string
  tags: string[]
  image?: string
  link: string
}

const PROJECTS: Project[] = [
  {
    title: 'HTML e CSS Explorer sem limites',
    description:
      'Projeto de estudos focado em explorar HTML, CSS e um pouco de JavaScript. Criação de layouts responsivos e interativos.',
    tags: ['HTML', 'CSS3', 'JavaScript'],
    image: '/images/image-project-html-css-explorer.jpg',
    link: 'https://andersonchavess.github.io/HTML-e-CSS-Explorer-sem-limites/',
  },
  {
    title: 'Alpha Learning — Projeto Markdown',
    description:
      'Projeto de estudos para aprendizagem da linguagem Markdown, com um resumo dos principais tópicos estudados desde o início das aulas.',
    tags: ['Markdown'],
    image: '/images/image-project-alpha-learning.jpg',
    link: 'https://andersonchavess.github.io/Alpha-Learning/',
  },
  {
    title: 'Business Trader — Alta Performance',
    description:
      'Website institucional fictício para uma empresa de consultoria em operações no mercado financeiro realizados por robôs, focado em alta performance no Forex e Commodities.',
    tags: ['HTML5', 'CSS3'],
    image: '/images/image-project-business-trader.jpg',
    link: 'https://andersonchavess.github.io/business-trader-versao-estudo/',
  },
]

export default function Projects() {
  return (
    <section id="projetos">
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto' }} className="reveal">
          <p className="section-label">Projetos</p>
          <h2 className="section-title">Em Destaque</h2>
          <p className="section-subtitle">
            Uma seleção dos projetos que desenvolvi durante minha jornada de
            aprendizado.
          </p>
        </div>

        <div className="projects-grid">
          {PROJECTS.map((project, i) => (
            <article key={project.title} className="project-card reveal" style={{ animationDelay: `${i * 0.12}s` }}>
              <div className="project-image">
                {project.image ? (
                  <img src={project.image} alt={`Imagem do projeto ${project.title}`} loading="lazy" />
                ) : (
                  <div className="project-image-placeholder">
                    <i className="fa-solid fa-code" />
                  </div>
                )}
              </div>
              <div className="project-body">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tags">
                  {project.tags.map(tag => (
                    <span key={tag} className="project-tag">{tag}</span>
                  ))}
                </div>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  Ver Projeto
                  <i className="fa-solid fa-arrow-right" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
