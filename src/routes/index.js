import express from 'express';
import channelController from './channelController';
import mainController from './mainController';

const router = express.Router();

router.get('/', mainController.index);
router.post('/newusername', mainController.newUsername);
router.post('/setconnectiontype', mainController.setConnectionType);

// TODO: use one route for both desktop and mobile channel
router.get('/channel/desktop/:id', channelController.dekstop);
router.get('/channel/mobile/:id', channelController.mobile);
router.post('/channel/create', channelController.create);

export default router;