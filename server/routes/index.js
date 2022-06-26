const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json("Start page");
});
router.post('/sign-in', (req, res) => {
    res.json("Sign in");
});
router.post('/sign-up', (req, res) => {
    res.json("Sign up");
});

module.exports = router;