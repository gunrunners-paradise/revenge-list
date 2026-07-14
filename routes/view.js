const express = require('express');
const router = express.Router();
const {index,lists} = require('../controllers/view');


router.get('/', index);
router.get('/lists', lists);

module.exports = router;