require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const config = require('./config/dev')
const PORT = process.env.PORT || 5000

// Connect to MongoDB
const mongoURI = process.env.mongoURI || config.mongoURI
const connect = mongoose.connect(mongoURI, {
  dbName: 'main',
  useUnifiedTopology: true,
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
})

// Cross Origin Resource Sharing
const origin = process.env.WHITE_URL || [
  'http://localhost:3000',
  'http://192.168.0.191:3000',
  'http://127.0.0.1:4173',
  'http://localhost:3001',
  'http://192.168.0.191:3001',
]
app.use(cors({ origin, credentials: true }))

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }))

// built-in middleware for json
app.use(express.json())

//middleware for cookies
app.use(cookieParser())

//serve static files
app.use('/', express.static(path.join(__dirname, '/public')))

// routes
app.use('/auth', require('./routes/auth'))
app.use('/register', require('./routes/register'))
app.use('/login', require('./routes/login'))
app.use('/refresh', require('./routes/refresh'))
app.use('/post', require('./routes/post'))
app.use('/product', require('./routes/product'))

// app.all('*', (req, res) => {
//     res.status(404);
//     if (req.accepts('html')) {
//         res.sendFile(path.join(__dirname, 'views', '404.html'));
//     } else if (req.accepts('json')) {
//         res.json({ "error": "404 Not Found" });
//     } else {
//         res.type('txt').send("404 Not Found");
//     }
// });
//
// app.use(errorHandler);

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB')
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})
