const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');

router.get('/index', indexController.index_GET);

router.post('/sign-in', indexController.signIn_POST);
router.post('/sign-up', indexController.signUp_POST);
router.get('/logout', indexController.logout_GET);

module.exports = router;