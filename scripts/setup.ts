// scripts/setup.ts
import { mkdir } from 'fs/promises'
import path from 'path'

async function setup() {
  const uploadsDir = path.join(process.cwd(), 'public/uploads')

  try {
    await mkdir(uploadsDir, { recursive: true })
    console.log('Created uploads directory:', uploadsDir)
  } catch (error) {
    console.error('Error creating uploads directory:', error)
  }
}

setup()
