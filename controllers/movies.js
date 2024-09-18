export class MovieController {
  constructor ({ movieModel }) {
    this.movieModel = movieModel
  }

  getAll = async (req, res) => {
    const { genre } = req.query
    const movies = await this.movieModel.getAll({ genre })
    res.json(movies)
  }

  getById = async (req, res) => {
    try {
      const { id } = req.params
      const movieById = await this.movieModel.getById({ id })
      return res.json(movieById)
    } catch (error) {
      return res.status(404).json({ message: error.message })
    }
  }

  create = async (req, res) => {
    try {
      const newMovie = await this.movieModel.create({ input: req.body })
      return res.status(201).json(newMovie)
    } catch (error) {
      return res.status(409).json({ message: error.message })
    }
  }

  update = async (req, res) => {
    try {
      const { id } = req.params
      const updatedMovie = await this.movieModel.update({ id, input: req.body })
      return res.status(200).json(updatedMovie)
    } catch (error) {
      return res.status(404).json({ message: error.message })
    }
  }

  delete = async (req, res) => {
    try {
      const { id } = req.params
      await this.movieModel.delete({ id })
      return res.status(200).json({ message: 'Movie deleted' })
    } catch (error) {
      return res.status(404).json({ message: error.message })
    }
  }
}
