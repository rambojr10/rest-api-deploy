import { readJson } from '../utils.js'
import { randomUUID } from 'node:crypto'

const movies = readJson('./movies.json')

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
    return movieById
  }

  static async create ({ input }) {
    const newMovie = {
      id: randomUUID(),
      ...input
    }

    const existsMovie = movies.find(movie => movie.title.toLowerCase() === newMovie.title.toLowerCase())
    if (existsMovie) return false

    movies.push(newMovie)
    return newMovie
  }

  static async update ({ id, input }) {
    const movieIndex = movies.findIndex(movie => movie.id === id)
    if (movieIndex === -1) return false

    const updatedMovie = {
      ...movies[movieIndex],
      ...input
    }
    movies[movieIndex] = updatedMovie
    return updatedMovie
  }

  static async delete ({ id }) {
    const movieIndex = movies.findIndex(movie => movie.id === id)
    if (!movieIndex === -1) return false

    movies.splice(movieIndex, 1)
    return true
  }
}
