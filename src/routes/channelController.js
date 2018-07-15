const channels = require('../channels');

module.exports = {

    dekstop(req, res) {
        const id = req.params.id;
        const csrf = req.csrfToken();
        const title = `Desktop - ${id}`;

        const channel = channels.get(id);

        // redirect if the channel does not exsist
        if(!channel) {
            res.redirect('/');
            return;
        }

        // redirect if the channel is already full
        if('desktop' in channel.connection && 'mobile' in channel.connection) {
            res.redirect('/');
            return;
        }

        // redirect if the client is a mobile and a mobile already is in the channal and the same with desktop
        if('isMobile' in req.session) {
            const isMobile = req.session.isMobile === 'true';
            if((isMobile && 'mobile' in channel.connection) || (!isMobile && 'desktop' in channel.connection)) {
                res.redirect('/');
                return;
            }
        }

        // render page
        req.session.channelID = id;
        res.render('desktop', { id, csrf, title });
    },

    mobile(req, res) {
        const id = req.params.id;
        const title = `Mobile - ${id}`;

        const channel = channels.get(id);

        // redirect if the channel does not exsist
        if(!channel) {
            res.redirect('/');
            return;
        }

        // redirect if the channel is already full
        if('desktop' in channel.connection && 'mobile' in channel.connection) {
            res.redirect('/');
            return;
        }

        // redirect if the client is a desktop or the client is a mobile and a mobile already is in the channel
        if('isMobile' in req.session) {
            const isMobile = req.session.isMobile === 'true';
            if(!isMobile || (isMobile && 'mobile' in channel.connection)) {
                res.redirect('/');
                return;
            }
        }

        // render page
        res.render('mobile', { id, title });
    },

    create(req, res) {
        const channel = channels.create();
        const isMobile = req.body.isMobile;

        req.session.isMobile = isMobile;

        res.redirect(`/channel/desktop/${channel.id}`);
    },

    

};