import { useState, useCallback } from 'react'
import { sanitizeText, sanitizeEmail } from '../utils/sanitize'
import { checkRateLimit, recordSubmission } from '../utils/rateLimit'

// ── Tipos ────────────────────────────────────────────────────────────────────

export interface FormValues {
  name: string
  email: string
  subject: string
  message: string
  /** Campo honeypot — deve permanecer vazio */
  _hp: string
}

export interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

export type FormStatus = 'idle' | 'sending' | 'success' | 'error' | 'rate_limited'

// ── Validações individuais ────────────────────────────────────────────────────

const EMAIL_REGEX = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/

function validateField(name: keyof FormErrors, value: string): string | undefined {
  switch (name) {
    case 'name':
      if (!value.trim()) return 'Nome é obrigatório.'
      if (value.trim().length < 2) return 'Nome deve ter pelo menos 2 caracteres.'
      if (value.trim().length > 80) return 'Nome deve ter no máximo 80 caracteres.'
      return undefined

    case 'email':
      if (!value.trim()) return 'E-mail é obrigatório.'
      if (!EMAIL_REGEX.test(value.trim())) return 'Informe um e-mail válido.'
      if (value.trim().length > 254) return 'E-mail muito longo.'
      return undefined

    case 'subject':
      if (value.length > 120) return 'Assunto deve ter no máximo 120 caracteres.'
      return undefined

    case 'message':
      if (!value.trim()) return 'Mensagem é obrigatória.'
      if (value.trim().length < 10) return 'Mensagem deve ter pelo menos 10 caracteres.'
      if (value.trim().length > 2000) return 'Mensagem deve ter no máximo 2000 caracteres.'
      return undefined

    default:
      return undefined
  }
}

function validateAll(values: FormValues): FormErrors {
  const errors: FormErrors = {}
  const fields: Array<keyof FormErrors> = ['name', 'email', 'subject', 'message']
  for (const field of fields) {
    const err = validateField(field, values[field])
    if (err) errors[field] = err
  }
  return errors
}

// ── Hook principal ────────────────────────────────────────────────────────────

const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT || ''

const INITIAL_VALUES: FormValues = {
  name: '',
  email: '',
  subject: '',
  message: '',
  _hp: '',
}

export function useContactForm() {
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES)
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Partial<Record<keyof FormErrors, boolean>>>({})
  const [status, setStatus] = useState<FormStatus>('idle')
  const [rateLimitMsg, setRateLimitMsg] = useState<string>('')

  // Atualiza campo e revalida se já tocado
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target
      setValues(prev => ({ ...prev, [name]: value }))

      if (touched[name as keyof FormErrors]) {
        const err = validateField(name as keyof FormErrors, value)
        setErrors(prev => ({ ...prev, [name]: err }))
      }
    },
    [touched]
  )

  // Marca campo como tocado e valida ao sair
  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target
      setTouched(prev => ({ ...prev, [name]: true }))
      const err = validateField(name as keyof FormErrors, value)
      setErrors(prev => ({ ...prev, [name]: err }))
    },
    []
  )

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()

      // ── Honeypot check ───────────────────────────────────────────────────
      if (values._hp) {
        // Bot detectado — simula sucesso sem enviar
        setStatus('success')
        return
      }

      // ── Validação completa ───────────────────────────────────────────────
      const allTouched = { name: true, email: true, subject: true, message: true }
      setTouched(allTouched)
      const errs = validateAll(values)
      setErrors(errs)
      if (Object.keys(errs).length > 0) return

      // ── Rate limiting ────────────────────────────────────────────────────
      const rateCheck = checkRateLimit()
      if (!rateCheck.allowed) {
        const msg =
          rateCheck.reason === 'cooldown'
            ? `Aguarde ${rateCheck.waitSeconds}s antes de enviar novamente.`
            : `Limite de envios atingido. Tente novamente em ${Math.ceil((rateCheck.waitSeconds ?? 3600) / 60)} minutos.`
        setRateLimitMsg(msg)
        setStatus('rate_limited')
        return
      }

      // ── Envio via Formspree ──────────────────────────────────────────────
      setStatus('sending')

      const payload = {
        name:    sanitizeText(values.name),
        email:   sanitizeEmail(values.email),
        subject: sanitizeText(values.subject),
        message: sanitizeText(values.message),
      }

      try {
        const res = await fetch(FORMSPREE_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload),
        })

        if (res.ok) {
          recordSubmission()
          setStatus('success')
          setValues(INITIAL_VALUES)
          setTouched({})
          setErrors({})
        } else {
          const data = await res.json().catch(() => ({}))
          console.error('Formspree error:', data)
          setStatus('error')
        }
      } catch (err) {
        console.error('Network error:', err)
        setStatus('error')
      }
    },
    [values]
  )

  const resetStatus = useCallback(() => {
    setStatus('idle')
    setRateLimitMsg('')
  }, [])

  const isValid = Object.keys(validateAll(values)).length === 0

  return {
    values,
    errors,
    touched,
    status,
    rateLimitMsg,
    isValid,
    handleChange,
    handleBlur,
    handleSubmit,
    resetStatus,
  }
}
