// lib/csrf.ts
import { randomBytes, createHmac } from 'crypto'

const CSRF_SALT_LENGTH = 8
const CSRF_SECRET = process.env.CSRF_SECRET || 'your-csrf-secret-key'

export async function generateToken(): Promise<{
  clientToken: string
  sessionToken: string
}> {
  const salt = randomBytes(CSRF_SALT_LENGTH).toString('hex')
  const clientToken = randomBytes(32).toString('hex')

  const hmac = createHmac('sha256', CSRF_SECRET)
  hmac.update(clientToken + salt)
  const sessionToken = `${salt}.${hmac.digest('hex')}`

  return { clientToken, sessionToken }
}

export async function verifyToken(
  clientToken: string,
  sessionToken: string
): Promise<boolean> {
  try {
    const [salt, hash] = sessionToken.split('.')

    const hmac = createHmac('sha256', CSRF_SECRET)
    hmac.update(clientToken + salt)
    const expectedHash = hmac.digest('hex')

    return hash === expectedHash
  } catch {
    return false
  }
}
