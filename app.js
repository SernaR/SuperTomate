const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('./utils/jwt')
const path = require('path')

const app = express()
const DIST_DIR = path.join(__dirname, '/dist')
const HTML_FILE = path.join(DIST_DIR, 'index.html')

const adminRoutes = require('./routes/adminRoutes')
const userRoutes = require('./routes/userRoutes')
const apiRoutes = require('./routes/apiRoutes')
const authRoutes = require('./routes/authRoutes')
const errorController = require('./controllers/errorController')
const cors = require('cors')

//app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static(path.join(DIST_DIR)))
app.use('/images', express.static(path.join(__dirname, 'images'))) 

app.use(cors())
app.use("/api", apiRoutes)
app.use("/api",authRoutes)
app.use("/api",(req, res, next) => {
    const userId = jwt.getUserId(req.headers['authorization'])
    if (userId < 0)
        return res.status(400).json({ 'error': 'wrong token'})
    if (!userId)
        return res.status(403).json({ 'error': 'forbibben, not authorized path'})
    req.userId = userId
    next()  
})

app.use('/api/user', userRoutes)
app.use('/api/admin', adminRoutes)
app.use("/api", errorController.pageNotFound)

app.get('/', (req, res) => {
    res.sendFile(HTML_FILE); // EDIT
})

app.listen(3000, () => {
    console.log('serveur en écoute sur le port 3000')
})
