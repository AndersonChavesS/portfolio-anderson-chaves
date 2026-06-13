import { useState, useEffect, useRef } from 'react'
import { useTheme } from '../hooks/useTheme'

const NAV_LINKS = [
  { href: '#inicio', label: 'Início' },
  { href: '#sobre', label: 'Sobre' },
  { href: '#habilidades', label: 'Habilidades' },
  { href: '#projetos', label: 'Projetos' },
  { href: '#contato', label: 'Contato' },
]

const THEME_OPTIONS = [
  { value: 'light' as const, label: 'Claro', icon: 'fa-sun' },
  { value: 'dark'  as const, label: 'Escuro', icon: 'fa-moon' },
  { value: 'system' as const, label: 'Sistema', icon: 'fa-circle-half-stroke' },
]

export default function Navbar() {
  const { theme, setTheme, resolved } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropOpen, setDropOpen] = useState(false)
  const [active, setActive] = useState('#inicio')
  const dropRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setDropOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Track active section
  useEffect(() => {
    const sections = NAV_LINKS.map(l => document.querySelector(l.href))
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setActive(`#${e.target.id}`)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    sections.forEach(s => s && observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const currentIcon = THEME_OPTIONS.find(o => o.value === theme)?.icon ?? 'fa-circle-half-stroke'

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <a href="#inicio" className="navbar-logo">AC</a>

        <nav aria-label="Navegação principal">
          <ul className="navbar-links">
            {NAV_LINKS.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={active === link.href ? 'active' : ''}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="navbar-right">
          {/* Theme toggle */}
          <div className="theme-toggle" ref={dropRef}>
            <button
              className="theme-btn"
              onClick={() => setDropOpen(v => !v)}
              aria-label="Selecionar tema"
              aria-expanded={dropOpen}
            >
              <i className={`fa-solid ${currentIcon}`} />
              {THEME_OPTIONS.find(o => o.value === theme)?.label}
              <i className={`fa-solid fa-chevron-${dropOpen ? 'up' : 'down'}`} style={{ fontSize: '0.7rem' }} />
            </button>

            {dropOpen && (
              <div className="theme-dropdown" role="menu">
                {THEME_OPTIONS.map(opt => (
                  <button
                    key={opt.value}
                    className={`theme-option${theme === opt.value ? ' active' : ''}`}
                    role="menuitem"
                    onClick={() => { setTheme(opt.value); setDropOpen(false) }}
                  >
                    <i className={`fa-solid ${opt.icon}`} />
                    {opt.label}
                    {theme === opt.value && <i className="fa-solid fa-check" style={{ marginLeft: 'auto', fontSize: '0.7rem' }} />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Hamburger */}
          <button
            className={`hamburger${menuOpen ? ' open' : ''}`}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            onClick={() => setMenuOpen(v => !v)}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <ul className={`mobile-menu${menuOpen ? ' open' : ''}`} role="navigation" aria-label="Menu mobile">
        {NAV_LINKS.map(link => (
          <li key={link.href}>
            <a href={link.href} onClick={() => setMenuOpen(false)}>{link.label}</a>
          </li>
        ))}
      </ul>
    </header>
  )
}
