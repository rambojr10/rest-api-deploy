import express, { json } from 'express'
import { corsMiddleware } from './middlewares/cors.js'
import { movieRouter } from './routes/movies.js'

const PORT = process.env.PORT ?? 3000

const app = express()
app.disable('x-powered-by')
app.use(json())
app.use(corsMiddleware())

app.use(movieRouter)

app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}`)
})
