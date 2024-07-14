const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const router = express.Router();

const secret_key = process.env.SECRET_KEY

router.post('/login', (req, res) => {
    const dummy = {
        id: 0,
        username: 'ankit555',
        email: 'ankit.chaurasia@scryai.com'
    }
    jwt.sign({ dummy }, secret_key, { expiresIn: '300s' }, (err, token) => {
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
            res.json(401);
        }
        res.json({
            profile: auth_data
        })
    });
});

function verifyToken(req, res) {
    const bearerHeader = req.headers['authorization'];
    if (bearerHeader) {
        req.token = bearerHeader.trim().split(' ')[1];
        next();
    }
    return res.send(401);
}

module.exports = router;