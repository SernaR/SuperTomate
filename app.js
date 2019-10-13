//const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('./utils/jwt')

const app = express()

const adminRoutes = require('./routes/adminRoutes')
const userRoutes = require('./routes/userRoutes')
const apiRoutes = require('./routes/apiRoutes')
const authRoutes = require('./routes/authRoutes')
const errorController = require('./controllers/errorController')
const cors = require('cors')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
//app.use(express.static(path.join(__dirname, 'public')))

app.use(cors())
app.use(apiRoutes)
app.use(authRoutes)
app.use((req, res, next) => {
    const userId = jwt.getUserId(req.headers['authorization'])
    if (userId < 0)
        return res.status(400).json({ 'error': 'wrong token'})
    if (!userId)
        return res.status(403).json({ 'error': 'forbibben, not authorized path'})
    req.userId = userId
    next()  
})

app.use('/user', userRoutes)
app.use('/admin', adminRoutes)
app.use(errorController.pageNotFound)

app.listen(8080, () => {
    console.log('serveur en écoute sur le port 8080')
})
