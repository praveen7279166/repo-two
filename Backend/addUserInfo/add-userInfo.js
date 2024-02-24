const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const authorizationHeader = req.headers;

        jwt.verify(authorizationHeader.token, "secret_code", (err, UserInfo) => {
            if(!!UserInfo) {
                req.UserInfo = {id: UserInfo.sId, name: UserInfo.sUsername}
                next();
            }
            else{
                res.json({bSuccess: false, tData: []});
            }
        });
    }
    catch(err) {
        res.json({bSuccess: false, tData: []});
    }
}