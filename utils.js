// import { createRequire } from 'node:module'

// const require = createRequire(import.meta.url)
// export const readJson = path => require(path)

import { promises as fs } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

export const readJson = async (relativePath) => {
  try {
    const filePath = resolve(__dirname, relativePath)
    const data = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(data)
  } catch (err) {
    console.error(`Error reading JSON file: ${err.message}`)
    throw err
  }
}
