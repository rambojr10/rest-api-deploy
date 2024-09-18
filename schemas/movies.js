import zod from 'zod'

const currentYear = new Date().getFullYear()

const movieSchema = ({ genres }) => zod.object({
  title: zod.string({
    invalid_type_error: 'Movie title must be a string',
    required_error: 'Movie title is required'
  }),
  year: zod.number().int().min(1900).max(currentYear),
  director: zod.string(),
  duration: zod.number().int().positive(),
  poster: zod.string().url({
    message: 'Invalid URL format for poster'
  }),
  genre: zod.array(
    zod.enum(genres),
    {
      required_error: 'Movie genre is required',
      invalid_type_error: 'Movie genre must be an array of enum Genre'
    }
  ),
  rate: zod.number().min(0).max(10).default(5)
})

export function validateMovie ({ genres, ...object }) {
  return movieSchema({ genres }).safeParse(object)
}

export function validatePartialMovie ({ genres, ...object }) {
  return movieSchema({ genres }).partial().safeParse(object)
}
