console.log('Task Manager App')

require('dotenv').config()

const express = require('express')
const app = express()

const tasks = require('./routes/tasks')
const connectDB = require('./db/connect')

const port = process.env.PORT || 3000

// middleware
app.use(express.json())

// routes
app.get('/hello', (req, res) => {
  res.send('Task Manager App')
})

app.use('/api/v1/tasks', tasks)

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
