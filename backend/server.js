const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')
const connectDB = require('./config/db.js')
const requestRoutes = require('./routes/requestRoutes.js')
const userRoutes = require('./routes/userRoutes.js')
const uploadRoutes = require('./routes/uploadRoutes.js')
const fileRoutes = require('./routes/fileRoutes.js')
const path = require('path')

dotenv.config()

connectDB()

const app = express()

app.use(express.json())


const PORT = process.env.PORT || 5100

app.use('/api/tasks', requestRoutes)
app.use('/api/users', userRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/file',fileRoutes);

app.use('/uploads', express.static(path.join(__dirname.split('/backend')[0], '/uploads')))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname.split('/backend')[0], '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname.split('/backend')[0], 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

app.listen(PORT, 
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    ))