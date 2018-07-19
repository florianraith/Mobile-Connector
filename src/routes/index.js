const express = require('express');
const channel = require('./channel');
const routes  = require('./routes');

const router = express.Router();


router.get('/',                    routes.index);
router.post('/newusername',        routes.newUsername);

router.get('/channel/desktop/:id', channel.dekstop);
router.get('/channel/mobile/:id',  channel.mobile);
router.post('/channel/create',     channel.create);

router.get('/404', (req, res) => res.render('404'));
module.exports = router;