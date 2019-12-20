const express = require('express');
const router = express.Router();
const login = require('../controllers/login')

router.get('/login', (req, res) => {
    login.redirectLogin(req, res);
});

router.post('/login', (req, res) => {
    login.login(req, res);
});

router.post('/logout', (req, res) => {
    login.logOut(req, res);
});

module.exports = router;