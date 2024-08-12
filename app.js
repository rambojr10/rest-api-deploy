const express = require('express')
const crypto = require('node:crypto')
const movies = require('./movies.json')
const { validateMovie, validatePartialMovie } = require('./schemas/movies.js')

const PORT = process.env.PORT ?? 3000

const app = express()
app.disable('x-powered-by')
app.use(express.json())

/* Para el uso de cors hay metodos:
* Normales: GET/HEAD/POST
* Complejos: PUT/PATCH/DELETE
* En los métodos complejos tenemos CORS Pre-fligth, lo cual requiere una petición especial llamada options
* Esta solicitud es una verificación preliminar para asegurarse de que el servidor permite la operación que el cliente (como un navegador) intenta realizar.
*
* Por otro lado tenemos las peticiones que vienen desde el mismo dominio, lo cual no envía la cabecera origin
* por lo que debemos permitir las peticiones cuando no tenemos esta cabecera || !origin
*/

const WHITE_LIST = [
  'http://127.0.0.1:5500'
]
app.use((req, res, next) => {
  const { origin } = req.headers
  if (WHITE_LIST.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin)
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
  }

  if (req.method === 'OPTIONS') return res.sendStatus(204)

  next()
})

app.get('/movies', (req, res) => {
  const { genre } = req.query
  if (genre) {
    // se usa el some porque es un array
    const moviesByGenre = movies.filter(
      movie => movie.genre.some(gen => gen.toLowerCase() === genre.toLowerCase())
    )
    return res.status(200).json(moviesByGenre)
  }

  res.status(200).json(movies)
})

app.get('/movies/:id', (req, res) => {
  const { id } = req.params
  const movieById = movies.find(movie => movie.id === id)

  if (!movieById) return res.status(404).json({ message: 'Movie not found' })

  res.status(200).json(movieById)
})

app.post('/movies', (req, res) => {
  const result = validateMovie(req.body)

  if (result.error) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  const existsMovie = movies.find(movie => movie.title === result.data.title)
  if (existsMovie) return res.status(409).json({ message: 'Movie already exists' })

  const newMovie = {
    id: crypto.randomUUID(),
    ...result.data
  }
  movies.push(newMovie)

  res.status(201).json(newMovie)
})

app.patch('/movies/:id', (req, res) => {
  const result = validatePartialMovie(req.body)

  if (!result.success) return res.status(400).json({ error: JSON.parse(result.error.message) })

  const { id } = req.params
  const movieIndex = movies.findIndex(movie => movie.id === id)

  if (movieIndex === -1) return res.status(404).json({ message: 'Movie not found' })

  const updatedMovie = {
    ...movies[movieIndex],
    ...result.data
  }
  movies[movieIndex] = updatedMovie

  res.status(200).json(updatedMovie)
})

app.delete('/movies/:id', (req, res) => {
  const { id } = req.params
  const movieIndex = movies.findIndex(movie => movie.id === id)
  if (movieIndex === -1) return res.status(404).json({ message: 'Movie not found' })

  movies.splice(movieIndex, 1)

  res.json({ message: 'Movie deleted' })
})

app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}`)
})
