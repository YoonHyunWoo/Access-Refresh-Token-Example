const app = require('express')()
const router = require('express').Router()
const verifyToken = require('../token/verifyToken')
const headCookieParser = require('../middleware/headCookieParser')
const OneCookieParser = require('../middleware/OneCookieParser')
const CreateToken = require('../middleware/CreateToken')

router.get('/', (req,res)=>{
    var ck = req.headers.cookie
    if(req.headers.cookie == undefined){
        res.sendFile('/workspace/Access-Refresh-Token-Example/web/login.html'); // 토큰이 둘 다 없을 때는 로그인 페이지로 리다이렉트
    }else{
    if(ck.includes(';')){
        var cookies = headCookieParser(req.headers.cookie)
        console.log(cookies)
        var access = verifyToken(cookies[0], cookies[1]); //토큰이 둘 다 있다면 로그인 ( 본 예제에서는 id, name, refreshToken을 반환함 )
        res.send({
            "id": access[0].id,
            "name": access[0].name,
            "RefreshToken": access[1]
        })
    }else{ //토큰이 하나만 있다면 취할 동작
        var cookies = OneCookieParser(ck)
        var WhatToken = verifyToken(cookies)
        if(WhatToken[0].name == undefined && WhatToken[0].iss == 'YoonHyunWoo'){// Refresh Token만 있는 경우
            var AccessToken = CreateToken('AccessKey', 'awda','awdad');
            res.cookie('access',AccessToken,{maxAge:3600000, httpOnly:true})
            res.redirect('http://localhost:3000/')
        }else{ // Access Token만 있는 경우
            var RefreshToken = CreateToken('RefreshKey');
            res.cookie('RefreshToken',RefreshToken,{maxAge:3600000, httpOnly:true})
            res.redirect('http://localhost:3000/')
        } 
    }
    }

})

module.exports = router;