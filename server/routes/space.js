const express = require('express');
const router = express.Router();
const spaceController = require('../controllers/spaceController');
const auth = require("../middleware/auth");

router.get('/', auth, spaceController.index);
router.post('/wall-post', auth, spaceController.wall_POST);
router.get('/wall-get', auth, spaceController.wall_GET);

module.exports = router;