import { Router } from 'express'
import { MovieController } from '../controllers/movies.js'

export const movieRouter = Router()

movieRouter.get('/movies', MovieController.getAll)

movieRouter.get('/movies/:id', MovieController.getById)

movieRouter.post('/movies', MovieController.create)

movieRouter.patch('/movies/:id', MovieController.update)

movieRouter.delete('/movies/:id', MovieController.delete)
