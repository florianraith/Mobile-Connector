const channels = require('../channels');

module.exports = {

    dekstop(req, res) {
        const id = req.params.id;
        const csrf = req.csrfToken();
        const title = `Desktop - ${id}`;
        const userName = req.session.userName;

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
        req.session.channelID = channel.id;
        res.render('desktop', { id, csrf, title, userName });
    },

    mobile(req, res) {
        const id = req.params.id;
        const title = `Mobile - ${id}`;

        const userName = req.session.userName;
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
            if(!isMobile) {
                res.redirect('/');
                return; 
            }
            
            if(isMobile && 'mobile' in channel.connection) {
                res.redirect('/');
                return;
            }
        }

        // render page
        req.session.channelID = channel.id;
        res.render('mobile', { id, title, userName });
    },

    create(req, res) {
        const channel = channels.create();
        const isMobile = req.session.isMobile;
        const connectionType = isMobile === 'true' ? 'mobile' : 'desktop';

        res.redirect(`/channel/${connectionType}/${channel.id}`);
    },

    

};