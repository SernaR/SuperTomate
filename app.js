//const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()

const adminRoutes = require('./routes/adminRoutes')
const apiRoutes = require('./routes/apiRoutes')
const errorController = require('./controllers/errorController')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
//app.use(express.static(path.join(__dirname, 'public')))

app.use(apiRoutes)
app.use('/admin', adminRoutes)
app.use(errorController.pageNotFound)

app.listen(3000, () => {
    console.log('serveur en écoute sur le port 3000')
})
