const app = require('express')()
const router = require('express').Router()
const verifyToken = require('../token/verifyToken')
const headCookieParser = require('../middleware/headCookieParser')

router.get('/', (req,res)=>{
    if(req.headers.cookie == undefined){
        res.sendFile('/workspace/token example/web/login.html'); // 토큰이 둘 다 없을 때는 로그인 페이지로 리다이렉트
    }else{
    var ck = req.headers.cookie
    if(ck.includes(';')){
        var cookies = headCookieParser(req.headers.cookie)
        console.log(cookies)
        var access = verifyToken(cookies[0], cookies[1]); //토큰이 둘 다 있다면 로그인 ( 본 예제에서는 id, name, refreshToken을 반환함 )
        res.send({
            "id": access[0].id,
            "name": access[0].name,
            "RefreshToken": access[1]
        })
    }else{
        //토큰이 하나만 있다면 취할 동작
        
    }
   
    }

})

module.exports = router;