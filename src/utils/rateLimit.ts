/**
 * rateLimit.ts
 * Rate limiting client-side via localStorage.
 * Regras:
 *  - No máximo 1 envio a cada 30 segundos (cooldown)
 *  - No máximo 3 envios por hora
 */

const STORAGE_KEY = 'ac_form_submissions'
const COOLDOWN_MS = 30_000      // 30 segundos entre envios
const MAX_PER_HOUR = 3
const ONE_HOUR_MS  = 3_600_000

interface SubmissionRecord {
  timestamps: number[]
}

function getRecord(): SubmissionRecord {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw) as SubmissionRecord
  } catch {
    // ignora erros de parse
  }
  return { timestamps: [] }
}

function saveRecord(record: SubmissionRecord): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(record))
  } catch {
    // ignora erros de storage cheio
  }
}

export interface RateLimitResult {
  allowed: boolean
  reason?: 'cooldown' | 'hourly_limit'
  /** Segundos restantes até poder enviar novamente */
  waitSeconds?: number
}

export function checkRateLimit(): RateLimitResult {
  const now = Date.now()
  const record = getRecord()

  // Limpa timestamps mais antigos que 1 hora
  record.timestamps = record.timestamps.filter(t => now - t < ONE_HOUR_MS)

  // Verifica cooldown (último envio < 30s)
  if (record.timestamps.length > 0) {
    const lastSent = record.timestamps[record.timestamps.length - 1]
    const elapsed = now - lastSent
    if (elapsed < COOLDOWN_MS) {
      return {
        allowed: false,
        reason: 'cooldown',
        waitSeconds: Math.ceil((COOLDOWN_MS - elapsed) / 1000),
      }
    }
  }

  // Verifica limite por hora
  if (record.timestamps.length >= MAX_PER_HOUR) {
    const oldest = record.timestamps[0]
    const waitMs = ONE_HOUR_MS - (now - oldest)
    return {
      allowed: false,
      reason: 'hourly_limit',
      waitSeconds: Math.ceil(waitMs / 1000),
    }
  }

  return { allowed: true }
}

export function recordSubmission(): void {
  const now = Date.now()
  const record = getRecord()
  record.timestamps = record.timestamps.filter(t => now - t < ONE_HOUR_MS)
  record.timestamps.push(now)
  saveRecord(record)
}
