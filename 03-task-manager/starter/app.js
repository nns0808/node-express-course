console.log('Task Manager App')

require('dotenv').config()

const express = require('express')
const app = express()

const tasks = require('./routes/tasks')
const connectDB = require('./db/connect')
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')


// middleware
app.use(express.static('./public'))
app.use(express.json())


// routes


app.use('/api/v1/tasks', tasks)
app.use(notFound)
app.use(errorHandlerMiddleware)
const port = process.env.PORT || 3000

// start server
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    console.log('MongoDB CONNECTED')
    app.listen(port, () => {
        console.log(`Server is listening on port ${port}...`)
    })

  } catch (error) {
    console.log('DB connection failed')
    console.log(error)
  }
}

start()
