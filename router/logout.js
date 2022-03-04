const router = require('express').Router();
const removeToken = require('../token/removeToken')


router.get('/',(req,res)=>{
    res.sendFile('/workspace/Access-Refresh-Token-Example/web/logout.html');
})

router.use('/', removeToken)
module.exports = router