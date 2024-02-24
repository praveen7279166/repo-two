const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserAuth = require('../model/authuser');

const app = express();

// router = express.Router();

app.post('/sign-up', (req,res, next) => {
    bcrypt.hash(req.body.sPassword, 10).then((hash) => {
        if(!!res) {
            const user = new UserAuth({sUsername: req.body.sUserName, sPassword: hash});
            user.save().then(() => {
                res.json(user);
            })
            .catch((error) =>{
                res.json({error})
            })
        }
    })
})

app.post('/sign-in', (req,res, next) => {
    UserAuth.findOne({sUsername: req.body.sUserName}).then((user) => {
        if(!!user) {
            bcrypt.compare(req.body.sPassword, user.sPassword).then((isValid) => {
                if(isValid){
                    const sToken = jwt.sign({ sUsername: user.sUsername, sId: user._id }, "secret_code", {expiresIn: "10m"});
                    const sRefreshToken = jwt.sign({ sUsername: user.sUsername, sId: user._id }, "secret_code", {expiresIn: "2h"});
                    const decoded = jwt.decode(sToken);
                    res.json({bSuccess: true, sAccessToken: sToken, sRefreshTkn: sRefreshToken, expiresIn: decoded.exp - decoded.iat});
                }
                else {
                    res.json({bSuccess: false});
                }
            })
        }
    })
    console.log("onsingIN");
})

module.exports = app;