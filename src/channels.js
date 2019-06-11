import Channel from './channel';

export default {

    channels: {},

    create() {
        const chars = 'abcdef0123456789';
        let randomID = '';
        for(let i = 0; i < 6; i++) randomID += chars[Math.floor(Math.random() * chars.length)];

        this.channels[randomID] = new Channel(randomID);

        return this.channels[randomID];
    },

    has(channelID) {
        return channelID && channelID in this.channels;
    },

    get(channelID) {
        return this.channels[channelID]; 
    },

    delete(channelID) {
        if(this.has(channelID)) {
            delete this.channels[channelID];
        }
    },

    ids() {
        return Object.keys(this.channels);
    },

};