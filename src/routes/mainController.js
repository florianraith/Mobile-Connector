import channels from '../channels';
import { logger } from '../logger';

export default {

    index(req, res) {
        const csrf = req.csrfToken();
        const channelIDs = channels.ids();
        const userName = req.session.userName;
        const connectionType = req.session.connectionType || 'null';
        const title = 'Home';

        res.render('index', { csrf, channels: channelIDs, userName, connectionType, title });
    },

    // TODO: dont redirect
    newUsername(req, res) {
        const backURL = req.header('Referer') || '/';
        req.session.oldUserName = req.session.userName;
        req.session.userName = '';
        res.redirect(backURL);
    },

    setConnectionType(req, res) {
        if('connectionType' in req.session) {
            res.json({ failed: true });
            return;
        }

        req.session.connectionType = req.body.connectionType;
        logger.info(`set connection type of ${req.session.userName} to ${req.session.connectionType}`);
        res.json({ success: true });
    },

}