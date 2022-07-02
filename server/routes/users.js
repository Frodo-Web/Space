const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const auth = require("../middleware/auth");

router.get('/', auth, usersController.index);

module.exports = router;