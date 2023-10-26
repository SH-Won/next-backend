const allowedOrigins = [
  'http://localhost:3000',
  'http://192.168.0.191:3000',
  'http://127.0.0.1:4173',
  'http://localhost:3001',
  'http://192.168.0.191:3001',
]
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  optionsSuccessStatus: 200,
}

module.exports = corsOptions
