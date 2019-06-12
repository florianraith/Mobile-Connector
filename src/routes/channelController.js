import channels from '../channels';

export default {

    view(req, res) {
        // TODO: if connection type isn't set yet, render an empty page, wait for the connection type to be set, rerender the page
        if(!('connectionType' in req.session)) {
            res.redirect('/');
        }

        const channelID = req.params.id;
        const connectionType = req.session.connectionType || 'null';

        // redirect if the channel does not exsist
        if(!channels.has(channelID)) {
            res.redirect('/');
            return;
        }

        const channel = channels.get(channelID);

        // redirect if the channel is already full
        if(channel.isFull()) {
            res.redirect('/');
            return;
        }

        // redirect if connection type is mobile and a mobile connection already exists in the channel
        if(connectionType === 'mobile' && channel.hasMobileConnection()) {
            res.redirect('/');
            return;
        }

        // redirect if connection type is desktop and a desktop connection already exists in the channel
        if(connectionType === 'desktop' && channel.hasDesktopConnection()) {
            res.redirect('/');
            return;
        }

        // save channel id into session
        req.session.channelID = channelID;

        // render page
        const title = 'Channel ' + channelID;
        const userName = req.session.userName;
        res.render(connectionType, { channelID, title, connectionType, userName });
    },
 
    create(req, res) {
        if(!('connectionType' in req.session)) {
            res.redirect('/');
            return;
        }

        const channel = channels.create();
        res.redirect(`/channel/${channel.id}`);
    },

    

};