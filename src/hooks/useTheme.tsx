import { createContext, useContext, useEffect, useState } from 'react'

type ThemeMode = 'dark' | 'light' | 'system'

interface ThemeContextValue {
  theme: ThemeMode
  setTheme: (t: ThemeMode) => void
  resolved: 'dark' | 'light'
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'system',
  setTheme: () => {},
  resolved: 'dark',
})

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('ac-theme') as ThemeMode | null
    return saved ?? 'system'
  })

  const getResolved = (t: ThemeMode): 'dark' | 'light' => {
    if (t === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return t
  }

  const [resolved, setResolved] = useState<'dark' | 'light'>(() => getResolved(theme))

  useEffect(() => {
    const r = getResolved(theme)
    setResolved(r)
    document.documentElement.setAttribute('data-theme', r)
  }, [theme])

  // Watch system preference changes
  useEffect(() => {
    if (theme !== 'system') return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => {
      const r = getResolved('system')
      setResolved(r)
      document.documentElement.setAttribute('data-theme', r)
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [theme])

  const setTheme = (t: ThemeMode) => {
    setThemeState(t)
    localStorage.setItem('ac-theme', t)
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolved }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
