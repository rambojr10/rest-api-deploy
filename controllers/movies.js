import { MovieModel } from '../models/movie.js'
import { validateMovie, validatePartialMovie } from '../schemas/movies.js'

export class MovieController {
  static async getAll (req, res) {
    const { genre } = req.query
    const movies = await MovieModel.getAll({ genre })
    res.json(movies)
  }

  static async getById (req, res) {
    const { id } = req.params

    const movieById = await MovieModel.getById({ id })
    if (!movieById) return res.status(404).json({ message: 'Movie not found' })

    return res.json(movieById)
  }

  static async create (req, res) {
    const result = validateMovie(req.body)
    if (!result.success) return res.status(400).json({ message: result.error.message })

    const newMovie = await MovieModel.create({ input: result.data })
    if (!newMovie) return res.status(409).json({ message: 'Movie already exists' })

    return res.status(201).json(newMovie)
  }

  static async update (req, res) {
    const { id } = req.params

    const result = validatePartialMovie(req.body)
    if (!result.success) return res.json(400).json({ message: result.data.message })

    const updatedMovie = await MovieModel.update({ id, input: result.data })
    if (!updatedMovie) return res.status(404).json({ message: 'Movie not found' })

    return res.status(200).json(updatedMovie)
  }

  static async delete (req, res) {
    const { id } = req.params
    const deleted = await MovieModel.delete({ id })
    if (!deleted) return res.status(404).json({ message: 'Movie not found' })

    return res.status(200).json({ message: 'Movie deleted' })
  }
}
