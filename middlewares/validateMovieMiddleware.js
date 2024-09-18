import { validateMovie, validatePartialMovie } from '../schemas/movies.js'

export const validateMovieMiddleware = ({ movieModel }) => {
  return async (req, res, next) => {
    const genres = await movieModel.getAllGenres()
    const result = validateMovie({ genres, ...req.body })
    if (!result.success) return res.status(400).json({ message: JSON.parse(result.error.message) })

    next()
  }
}

export const validatePartialMovieMiddleware = ({ movieModel }) => {
  return async (req, res, next) => {
    const genres = await movieModel.getAllGenres()
    const result = validatePartialMovie({ genres, ...req.body })
    if (!result.success) return res.status(400).json({ message: JSON.parse(result.error.message) })

    next()
  }
}
