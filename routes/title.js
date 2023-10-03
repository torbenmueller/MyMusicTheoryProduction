const express = require('express');
const router = express.Router();
const TitleController = require('../controllers/title');

router.get('', TitleController.getTitle);

module.exports = router;