
const jwt = require('jsonwebtoken')
module.exports = (type, bodyid=' ', bodypwd = ' ') => {
   if(type ==  'AccessKey'){
    var AccessToken = jwt.sign({    // Create Access Token
        id : bodyid,
        name : bodypwd
    },process.env.SECRET_KEY,{
        expiresIn : '1h',
        issuer : "YoonHyunWoo"
    })    
    return AccessToken 
    }else if(type=='RefreshKey'){
        var RefreshToken = jwt.sign({   // Create Refresh Token
        },process.env.SECRET_KEY,{
            expiresIn : '14d',
            issuer : "YoonHyunWoo"
        })
        return RefreshToken
    }
}