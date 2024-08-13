import cors from 'cors'

const WHITE_LIST = [
  'http://127.0.0.1:5500'
]

export const corsMiddleware = ({ whiteList = WHITE_LIST } = {}) => cors({
  origin: (origin, callback) => {
    if (whiteList.includes(origin) || !origin) {
      return callback(null, true)
    }
  }
})
