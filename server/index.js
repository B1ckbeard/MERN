import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import authRoute from './routes/auth.js'

const app = express()
dotenv.config()

// Constants
const PORT = process.env.PORT || 3001
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_NAME = process.env.DB_NAME

// MiddleWare
app.use(cors()) // запросы с разных ip-адресов
app.use(express.json())

/*
app.get('/', (req, res) => {
  return res.json({message: 'All is fine'})
})
*/

// Routes
app.use('/api/auth', authRoute)

async function start() {
  try {
    await mongoose.connect(
      `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.ptcur.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`,
    )

    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()