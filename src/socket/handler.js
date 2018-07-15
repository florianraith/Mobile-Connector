const channels = require('../channels');

module.exports = (io, socket) => ({

    joinChannel(data) {
        const isMobile = data.isMobile;
        const channel = channels.get(socket.handshake.session.channelID);

        if(!channel) {
            socket.emit('redirect');
            return;
        }

        if((isMobile && 'mobile' in channel.connection) || (!isMobile && 'desktop' in channel.connection)) {
            socket.emit('redirect');
            return;
        }

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


        console.log(`user ${socket.user.name} connected to channel ${socket.channel}`);
        io.in(socket.channel).emit('join-channel', { user: socket.user, connection: channel.connection });
    },

    disconnect() {
        const channel = channels.get(socket.channel);

        if(!channel) return;

        if(channel.connection.desktop === socket.user || channel.connection.mobile === socket.user) {
            channels.delete(socket.channel);
        
            console.log(`deleting channel ${socket.channel}`);
            socket.in(socket.channel).emit('redirect');
            return;
        }

        console.log(`user ${socket.user.name} disconnected to channel ${socket.channel}`);
    },

    deleteChannel() {
        channels.delete(socket.channel);

        console.log(`deleting channel ${socket.channel}`);
        io.in(socket.channel).emit('redirect');
    },

    deviceOrientation(data) {   
        socket.in(socket.channel).emit('device-orientation', data);
    },

    calibrateOrientation(data) {
        socket.in(socket.channel).emit('calibrate-orientation', data);
    },

});
