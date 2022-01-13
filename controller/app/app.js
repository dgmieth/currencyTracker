//node modules
const http = require('http')
const request = require('request-promise')
const path = require('path')
//npm modules
require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
//app creation
const app = express()
var db = require(`../../model/mysql`)
//app set up
app.use(express.json())
app.use(cookieParser())
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'../../view/views'))
app.use(express.static(path.join(__dirname,'../../view/public')))
//router
const router = require('../router/MainRouter')
app.use(router)
//server creation
http.createServer(app).listen(process.env.PORT, ()=>{
    console.log('serverListening')
})
