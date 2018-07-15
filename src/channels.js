module.exports = {

    channels: {},

    create() {
        const chars = 'abcdef0123456789';
        let randomID = '';
        for(let i = 0; i < 6; i++) randomID += chars[Math.floor(Math.random() * chars.length)];

        this.channels[randomID] = {
            id: randomID,
            connection: {}
        }

        return this.channels[randomID];
    },

    has(channelID) {
        return this.channels[channelID] !== undefined;
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