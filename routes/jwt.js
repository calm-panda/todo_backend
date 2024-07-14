const express = require('express');
const jwt = require('jsonwebtoken');

require('dotenv').config();
const secret_key = process.env.SECRET_KEY
const router = express.Router();

router.post('/login', (req, res) => {
    const {username, password} = req.body;
    // check if user is in db
    jwt.sign({ username, password }, secret_key, { expiresIn: '300s' }, (err, token) => {
        if (err) {
            console.log(err);
        } else {
            res.json({
                token
            });
        }
    });
});

router.post('/kuchbhi', verifyToken, (req, res) => {
    jwt.verify(req.token, secret_key, (err, auth_data) => {
        if (err) {
            res.sendStatus(401);
        }
        res.json({
            profile: auth_data
        })
    });
});

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (bearerHeader) {
        req.token = bearerHeader.trim().split(' ')[1];
        next();
    }
    return res.sendStatus(401);
}

module.exports = router;