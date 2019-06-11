import channels from '../channels';

export default {

    dekstop(req, res) {
        const id = req.params.id;
        const csrf = req.csrfToken();
        const title = `Desktop - ${id}`;
        const connectionType = req.session.connectionType || 'null';
        const userName = req.session.userName;
        
        // redirect if the channel does not exsist
        if(!channels.has(id)) {
            res.redirect('/');
            return;
        }
        
        const channel = channels.get(id);

        // redirect if the channel is already full
        if(channel.isFull()) {
            res.redirect('/');
            return;
        }

        // redirect if the client is a mobile and a mobile already is in the channel and the same with desktop
        if('connectionType' in req.session) {
            if(req.session.connectionType === 'mobile' && channel.hasMobileConnection()) {
                res.redirect('/');
                return;
            }

            if(req.session.connectionType === 'desktop' && channel.hasDesktopConnection()) {
                res.redirect('/');
                return;
            }
        }

        // render page
        req.session.channelID = channel.id;
        res.render('desktop', { id, csrf, title, connectionType, userName });
    },

    mobile(req, res) {
        const id = req.params.id;
        const title = `Mobile - ${id}`;
        const connectionType = req.session.connectionType || 'null';
        const userName = req.session.userName;
        
        // redirect if the channel does not exsist
        if(!channels.has(id)) {
            res.redirect('/');
            return;
        }
        
        const channel = channels.get(id);

        // redirect if the channel is already full
        if(channel.isFull()) {
            res.redirect('/');
            return;
        }
        
        // redirect if the client is a desktop or the client is a mobile and a mobile already is in the channel
        if('connectionType' in req.session) {
            if(req.session.connectionType === 'desktop') {
                res.redirect('/');
                return; 
            }
            
            if(req.session.connectionType === 'mobile' && channel.hasMobileConnection()) {
                res.redirect('/');
                return;
            }
        }

        // render page
        req.session.channelID = channel.id;
        res.render('mobile', { id, title, connectionType, userName });
    },

    create(req, res) {
        if(!('connectionType' in req.session)) {
            res.redirect('/');
            return;
        }

        const channel = channels.create();
        res.redirect(`/channel/${req.session.connectionType}/${channel.id}`);
    },

    

};