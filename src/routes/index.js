import express from 'express';
import channelController from './channelController';
import mainController from './mainController';

const router = express.Router();

router.get('/', mainController.index);
router.post('/newusername', mainController.newUsername);
router.post('/setconnectiontype', mainController.setConnectionType);

router.get('/channel/:id', channelController.view);
router.post('/channel/create', channelController.create);
router.post('/channel/delete', channelController.delete);

export default router;