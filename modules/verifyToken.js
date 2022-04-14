const { decode } = require('jsonwebtoken');
const jwt = require('jsonwebtoken');
require('dotenv').config();

function verifyToken(access, refresh){
    var AccessToken = jwt.verify(access, process.env.SECRET_KEY, (error, decoded) => {
        if(error) {
            console.error(error);
            return;
        }
        var result = [decoded, refresh]
        return result;
    });
    return AccessToken
}


module.exports = verifyToken;