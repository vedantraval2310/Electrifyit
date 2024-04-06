const express = require('express');
const router = express.Router();

const{getEvData,getspecifics,getall} = require('../controllers/main');

router.route('/all').get(getall);
router.route('/Evdata').get(getEvData);
router.route('/specifics').get(getspecifics);

module.exports = router;