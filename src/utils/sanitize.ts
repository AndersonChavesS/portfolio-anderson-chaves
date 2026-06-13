/**
 * sanitize.ts
 * Sanitização leve de inputs sem dependências externas.
 * Remove caracteres que possam ser usados em ataques XSS ou injeção.
 */

/** Remove tags HTML e scripts de uma string */
export function stripHtml(value: string): string {
  return value
    .replace(/<[^>]*>/g, '')          // remove tags HTML
    .replace(/javascript:/gi, '')      // remove javascript: URIs
    .replace(/on\w+\s*=/gi, '')        // remove event handlers inline
    .trim()
}

/** Sanitiza um campo de texto genérico */
export function sanitizeText(value: string): string {
  return stripHtml(value)
    .replace(/[<>"'`]/g, '')           // remove chars perigosos restantes
    .substring(0, 2000)               // limita tamanho máximo absoluto
}

/** Sanitiza um endereço de e-mail */
export function sanitizeEmail(value: string): string {
  return value
    .replace(/[^a-zA-Z0-9@._+\-]/g, '') // apenas chars válidos em email
    .substring(0, 254)
}
