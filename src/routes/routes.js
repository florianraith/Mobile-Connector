import channels from '../channels';

export default {

    index(req, res) {
        const csrf = req.csrfToken();
        const channelIDs = channels.ids();
        const userName = req.session.userName;
        const title = 'Home';

        res.render('index', { csrf, channels: channelIDs, userName, title });
    },

    newUsername(req, res) {
        const backURL = req.header('Referer') || '/';
        req.session.oldUserName = req.session.userName;
        req.session.userName = '';
        res.redirect(backURL);
    }

}