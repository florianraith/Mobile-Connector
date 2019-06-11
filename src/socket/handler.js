import { logger } from '../logger'; 
import channels from '../channels';

export default (io, socket) => ({

    joinChannel(data) {
        const isMobile = data.isMobile;
        const channel = channels.get(socket.handshake.session.channelID);

        // redirect user if the channel does not exists
        if(!channels.has(socket.handshake.session.channelID)) {
            socket.emit('redirect');
            return;
        }

        // redirect user if the channel already has the connection type
        if((isMobile && channel.hasMobileConnection()) || (!isMobile && channel.hasDesktopConnection())) {
            socket.emit('redirect');
            return;
        }

        // connect user to the channel
        socket.user = {
            id: socket.id,
            name: socket.handshake.session.userName
        };

        socket.channel = channel.id;
        socket.join(socket.channel);


        if(isMobile) {
            channel.connection.mobile = socket.user;
        } else {
            channel.connection.desktop = socket.user;
        }


        logger.info('user %o connected to channel %o', socket.user.name, channel.id);
        io.in(socket.channel).emit('join-channel', { user: socket.user, connection: channel.connection });
    },

    disconnect() {
        if(!channels.has(socket.channel)) return;
        const channel = channels.get(socket.channel);

        // delete the channel if the user is connected
        if(channel.isConnected(socket.user)) {
            channels.delete(socket.channel);
        
            logger.info('deleting channel %o', socket.channel);
            socket.in(socket.channel).emit('redirect');
            return;
        }

        logger.info('user %o disconnected to channel %o', socket.user.name, socket.channel);
    },

    deleteChannel() {
        channels.delete(socket.channel);

        logger.info('deleting channel %o', socket.channel);
        io.in(socket.channel).emit('redirect');
    },

    deviceOrientation(data) {   
        socket.in(socket.channel).emit('device-orientation', data);
    },

    calibrateOrientation(data) {
        socket.in(socket.channel).emit('calibrate-orientation', data);
    },

});
