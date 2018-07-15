module.exports = (req, res) => {

    const csrf = req.csrfToken();
    const channels = require('../channels').ids();
    const title = 'Home';

    res.render('index', { csrf, channels, title });

}