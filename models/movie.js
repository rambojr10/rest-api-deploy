import { readJson } from '../utils.js'
import { randomUUID } from 'node:crypto'

const movies = await readJson('./movies.json')

export class MovieModel {
  static async getAll ({ genre }) {
    if (genre) {
      const moviesByGenre = movies.filter(
        movie => movie.genre.some(gen => gen.toLowerCase() === genre.toLowerCase())
      )
      return moviesByGenre
    }

    return movies
  }

  static async getById ({ id }) {
    const movieById = movies.find(movie => movie.id === id)
    if (movieById) return movieById

    throw new Error('Movie not found')
  }

  static async getAllGenres () {
    const genres = new Set()
    for (const movie of movies) {
      movie.genre.map(genre => {
        genres.add(genre)
        return 0
      })
    }

    return Array.from(genres)
  }

  static async create ({ input }) {
    const newMovie = {
      id: randomUUID(),
      ...input
    }

    const existsMovie = movies.find(movie => movie.title.toLowerCase() === newMovie.title.toLowerCase())
    if (existsMovie) throw new Error('Movie already exists')

    movies.push(newMovie)
    return newMovie
  }

  static async update ({ id, input }) {
    const movieIndex = movies.findIndex(movie => movie.id === id)
    if (movieIndex === -1) throw new Error('Movie not found')

    const updatedMovie = {
      ...movies[movieIndex],
      ...input
    }
    movies[movieIndex] = updatedMovie
    return updatedMovie
  }

  static async delete ({ id }) {
    const movieIndex = movies.findIndex(movie => movie.id === id)
    if (movieIndex === -1) throw new Error('Movie not found')

    movies.splice(movieIndex, 1)
    return true
  }
}
