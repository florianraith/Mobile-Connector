(function() {
    
    // dom elements
    var $mobileConnection = document.getElementById('mobile-connection');
    var $desktopConnection = document.getElementById('desktop-connection');
    var $btnCalibrateRotation = document.getElementById('calibrate-rotation');

    // variables
    var orientation =  { alpha: 0, beta: 0, gamma: 0 };

    // setup socket handler
    var socketHandler = {

        joinChannel: function(data) {
            var connection = data.connection;
            if('desktop' in connection) $desktopConnection.innerHTML = connection.desktop.name;
            if('mobile' in connection) $mobileConnection.innerHTML = connection.mobile.name;
        },

        redirect: function() {
            window.location.replace(window.location.origin + '/');
        }

    }

    // initialze socket and listen
    var socket = io();
    socket.emit('join-channel', { isMobile: true });
    socket.on('join-channel', socketHandler.joinChannel);
    socket.on('redirect', socketHandler.redirect);

    // set calibrate rotation button handler
    $btnCalibrateRotation.onclick = function() {
        socket.emit('calibrate-orientation', orientation);
    }

    // add device orientation listener
    window.addEventListener('deviceorientation', function(event) {
        orientation = { alpha: event.alpha, beta: event.beta, gamma: event.gamma };
        socket.emit('device-orientation', orientation);
    });

})();