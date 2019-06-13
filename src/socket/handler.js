import { logger } from '../logger'; 
import channels from '../channels';

export default (io, socket) => ({

    joinChannel() {
        const connectionType = socket.handshake.session.connectionType;
        const channelID = socket.handshake.session.channelID;

        // redirect user if the channel does not exists
        if(!channels.has(channelID)) {
            socket.emit('redirect');
            return;
        }

        const channel = channels.get(channelID);

        // redirect if the channel is already full or if the channel already has a connection of given type
        if(channel.isFull() || channel.hasConnectionOfType(connectionType)) {
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

        channel.connect(connectionType, socket.user);

        logger.info('user %o connected to channel %o', socket.user.name, channel.id);
        io.in(socket.channel).emit('new-connection', { user: socket.user, connection: channel.connection, connectionType });
    },

    disconnect() {
        if(!channels.has(socket.channel)) return;
        const channel = channels.get(socket.channel);
        channel.disconnect(socket.user);

        // delete the channel if the channel is empty
        if(channel.isEmpty()) {
            channels.delete(socket.channel);
        
            logger.info('deleting channel %o', socket.channel);
        }

        logger.info('user %o disconnected from channel %o', socket.user.name, socket.channel);
    },

    deviceOrientation(data) {   
        socket.in(socket.channel).emit('device-orientation', data);
    },

    calibrateOrientation(data) {
        socket.in(socket.channel).emit('calibrate-orientation', data);
    },

});
