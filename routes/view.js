const express = require('express');
const router = express.Router();
const {index,lists,create} = require('../controllers/view');


router.get('/', index);
router.get('/lists', lists);
router.get('/create', create);

module.exports = router;