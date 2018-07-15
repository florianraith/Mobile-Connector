const express           = require('express');
const channelController = require('./channelController');

const router = express.Router();


router.get('/', require('./homeRoute'));
router.get('/channel/desktop/:id', channelController.dekstop);
router.get('/channel/mobile/:id', channelController.mobile);
router.post('/create', channelController.create);


module.exports = router;