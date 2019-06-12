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

    hasConnectionOfType(connectionType) {
        if(connectionType === 'mobile') {
            return this.hasMobileConnection();
        }

        if(connectionType === 'desktop') {
            return this.hasDesktopConnection();
        }

        return false;
    }

    isFull() {
        return this.hasMobileConnection() && this.hasDesktopConnection();
    }

    isEmpty() {
        return !this.hasMobileConnection() && !this.hasDesktopConnection();
    }

    connect(connectionType, user) {
        if(connectionType === 'mobile') {
            this.connection.mobile = user;
        }

        if(connectionType === 'desktop') {
            this.connection.desktop = user;
        }
    } 

    disconnect(user) {
        if(this.connection.desktop === user) {
            this.connection.desktop = null;
        }

        if(this.connection.mobile === user) {
            this.connection.mobile = null;
        }
    }

    isConnected(user) {
        return this.connection.desktop === user || this.connection.mobile === user;
    }

}