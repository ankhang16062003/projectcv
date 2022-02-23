const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

const AuthRoute = require('./routes/auth')
const UserRoute = require('./routes/users')
const PostRoute = require('./routes/posts')
const CategoryRoute = require('./routes/categories')

const app = express()
dotenv.config()

mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log('Database connect successfully !!!')
})
.catch(() => {
    console.log('Can not connect database')
})

app.use(cors({
    origin: '*'
}));
app.use(express.json())

app.use('/api/auth/', AuthRoute)
app.use('/api/users/', UserRoute)
app.use('/api/posts/', PostRoute)
app.use('/api/categories/', CategoryRoute)

app.listen(8800, () => {
    console.log('Server is running !!!')
})

