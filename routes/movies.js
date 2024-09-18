import { Router } from 'express'
import { MovieController } from '../controllers/movies.js'
import { validateMovieMiddleware, validatePartialMovieMiddleware } from '../middlewares/validateMovieMiddleware.js'

export const createMovieRouter = ({ movieModel }) => {
  const movieRouter = Router()
  const movieController = new MovieController({ movieModel })

  movieRouter.get('/', movieController.getAll)
  movieRouter.get('/:id', movieController.getById)
  movieRouter.post('/', validateMovieMiddleware({ movieModel }), movieController.create)
  movieRouter.patch('/:id', validatePartialMovieMiddleware({ movieModel }), movieController.update)
  movieRouter.delete('/:id', movieController.delete)

  return movieRouter
}
