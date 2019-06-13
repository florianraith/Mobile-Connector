import channels from '../channels';
import { io } from '../socket';

export default {

    view(req, res) {
        // TODO: if connection type isn't set yet, render an empty page, wait for the connection type to be set, rerender the page
        if(!('connectionType' in req.session)) {
            res.redirect('/');
            return;
        }

        const channelID = req.params.id;
        const connectionType = req.session.connectionType || 'null';

        // redirect if the channel does not exsist
        if(!channels.has(channelID)) {
            res.redirect('/');
            return;
        }

        const channel = channels.get(channelID);

        // redirect if the channel is already full or if the channel already has a connection of given type
        if(channel.isFull() || channel.hasConnectionOfType(connectionType)) {
            res.redirect('/');
            return;
        }

        // save channel id into session
        req.session.channelID = channelID;

        // render page
        const title = 'Channel ' + channelID;
        const userName = req.session.userName;
        const csrf = req.csrfToken();
        res.render(connectionType, { channelID, title, csrf, connectionType, userName });
    },
 
    create(req, res) {
        if(!('connectionType' in req.session)) {
            res.redirect('/');
            return;
        }

        const channel = channels.create();
        res.redirect(`/channel/${channel.id}`);
    },

    delete(req, res) {
        const channelID = req.session.channelID;
        if(!channels.has(channelID)) {
            res.json({ failed: true });
            return;
        }

        // disconnect all connections in this channel
        // the channel deletion itself will be handled by the socket handler once all clients are disconnected
        io.in(channelID).clients((error, clients) => {
            if(error) throw error;

            for(let client of clients) {
                io.sockets.connected[client].disconnect(true);
            }
        });
                
        res.json({ success: true });
    }

};