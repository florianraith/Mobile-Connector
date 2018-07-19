const express           = require('express');
const channelController = require('./channelController');
const routes            = require('./routes');

const router = express.Router();


router.get('/', routes.index);
router.post('/newusername', routes.newUsername);

router.get('/channel/desktop/:id', channelController.dekstop);
router.get('/channel/mobile/:id', channelController.mobile);
router.post('/channel/create', channelController.create);


module.exports = router;