const express = require('express')
const app = express()
const router = express.Router()
const login = require('./router/login')
const logout = require('./router/logout')
const createToken = require('./token/createToken')
app.use(express.json())
app.use(express.urlencoded({ extends: true}))

app.use('/',login) // /login response login.html

app.use('/logout',logout) // Logout response logout.html

app.use('/login',createToken) // Create Access & Refresh Token


app.listen(3000,()=>{
    console.log("server is running to http://localhost:3000")
})