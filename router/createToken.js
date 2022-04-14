const express = require('express')
const app = express()
const router = express.Router();
const jwt = require('jsonwebtoken');
app.use(express.json())
app.use(express.urlencoded({ extends: true}))


require('dotenv').config()
router.post('/', (req,res)=>{
    var AccessToken = jwt.sign({    // Create Access Token
        id : req.body.id,
        name : req.body.name
    },process.env.SECRET_KEY,{
        expiresIn : '1h',
        issuer : "YoonHyunWoo"
    })

    var RefreshToken = jwt.sign({   // Create Refresh Token
    },process.env.SECRET_KEY,{
        expiresIn : '14d',
        issuer : "YoonHyunWoo"
    })

    res.cookie('access',AccessToken,{maxAge:3600000, httpOnly:true}) // Set AccessToken cookie
    res.cookie('refresh',RefreshToken,{maxAge:3600000, httpOnly:true}) // Set RefreshToken cookie
    res.redirect('http://localhost:3000/logout')
})



module.exports = router
