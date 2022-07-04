const express = require('express');
const router = express.Router();
const spaceController = require('../controllers/spaceController');
const auth = require("../middleware/auth");

router.get('/', auth, spaceController.index);

module.exports = router;