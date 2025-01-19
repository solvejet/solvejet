// lib/storage.ts
import { writeFile } from 'fs/promises'
import path from 'path'
import { randomUUID } from 'crypto'

const UPLOADS_DIR = path.join(process.cwd(), 'public/uploads')

export async function saveFile(
  file: Buffer,
  originalName: string,
  prefix: string = ''
): Promise<{ fileName: string; fileUrl: string }> {
  try {
    // Create unique filename
    const extension = path.extname(originalName)
    const fileName = `${prefix}${randomUUID()}${extension}`
    const filePath = path.join(UPLOADS_DIR, fileName)

    // Save file
    await writeFile(filePath, file)

    // Return file info
    return {
      fileName,
      fileUrl: `/uploads/${fileName}`,
    }
  } catch (error) {
    console.error('Error saving file:', error)
    throw new Error('Failed to save file')
  }
}

export async function saveBase64File(
  base64Data: string,
  prefix: string = ''
): Promise<{ fileName: string; fileUrl: string }> {
  try {
    // Remove data URL prefix if present
    const base64Content = base64Data.replace(/^data:.*?;base64,/, '')
    const buffer = Buffer.from(base64Content, 'base64')

    const fileName = `${prefix}${randomUUID()}.wav`
    const filePath = path.join(UPLOADS_DIR, fileName)

    // Save file
    await writeFile(filePath, buffer)

    return {
      fileName,
      fileUrl: `/uploads/${fileName}`,
    }
  } catch (error) {
    console.error('Error saving base64 file:', error)
    throw new Error('Failed to save audio file')
  }
}
