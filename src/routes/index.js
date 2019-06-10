import express from 'express';
import channel from './channel';
import routes from './routes';

const router = express.Router();


router.get('/',                    routes.index);
router.post('/newusername',        routes.newUsername);

router.get('/channel/desktop/:id', channel.dekstop);
router.get('/channel/mobile/:id',  channel.mobile);
router.post('/channel/create',     channel.create);

router.get('/404', (req, res) => res.render('404'));
export default router;