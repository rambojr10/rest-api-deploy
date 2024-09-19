// import { createRequire } from 'node:module'

// const require = createRequire(import.meta.url)
// export const readJson = path => require(path)

import { promises as fs } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const readJson = async (relativePath) => {
  try {
    const filePath = path.join(__dirname, relativePath)
    const data = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(data)
  } catch (err) {
    console.error(`Error reading JSON file: ${err.message}`)
    throw err
  }
}
