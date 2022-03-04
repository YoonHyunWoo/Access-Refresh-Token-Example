const router = require('express').Router();

router.post('/',(req,res)=>{
    //remove Refresh Token to DB
    res.clearCookie('access');
    res.clearCookie('refresh');
    res.redirect('http://localhost:3000/')
})

module.exports = router