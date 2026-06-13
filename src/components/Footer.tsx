export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer>
      <div className="container footer-inner">
        <p>© {year} Anderson Chaves. Todos os direitos reservados.</p>
        <p>
          Desenvolvido com{' '}
          <i className="fa-solid fa-heart heart" aria-hidden="true" />{' '}
          e muito código
        </p>
      </div>
    </footer>
  )
}
