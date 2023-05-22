require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const { logger, logEvents } = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const connectDB = require('./config/dbConn')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 8080

connectDB()
app.use(logger)

app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())

app.use('/', express.static(path.join(__dirname, 'public'))) // static files used on server (images, css)
app.use('/', require('./routes/root'))
app.use('/auth', require('./routes/authRoutes'))
app.use('/users', require('./routes/userRoutes'))
app.use('/sessions', require('./routes/sessionRoutes'))

app.use('/tasks', require('./routes/taskRoutes'))
app.use('/projects', require('./routes/projectRoutes'))





app.use(errorHandler)
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB')
  app.listen(PORT, () => console.log(`Server is running on port ${ PORT }`));
})

mongoose.connection.on('error', err => {
  console.log(err)
  logEvents(`${ err.no }: ${ err.code }\t${ err.syscall }\t${ err.hostname }`, 'mongoErrLog.log')
})