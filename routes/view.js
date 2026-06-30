const express = require('express');
const router = express.Router();
const {index} = require('../controllers/view');


router.get('/', index);

module.exports = router;