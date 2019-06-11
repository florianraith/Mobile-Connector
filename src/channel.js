export default class Channel {

    constructor(id) {
        this.id = id;
        this.connection = {
            desktop: null,
            mobile: null
        };
    }

    hasMobileConnection() {
        return this.connection.mobile !== null;
    }

    hasDesktopConnection() {
        return this.connection.desktop !== null;
    }

    isFull() {
        return this.hasMobileConnection() && this.hasDesktopConnection();
    }

    isConnected(user) {
        return this.connection.desktop === user || this.connection.mobile === user;
    }

}