(function() {

    // dom elements
    var $mobileConnection = document.getElementById('mobile-connection');
    var $desktopConnection = document.getElementById('desktop-connection');
    var $btnDeleteChannel = document.getElementById('delete-channel'); 
    var $channelID = document.head.querySelector('[name="channelID"]');

    // variables
    var youTemplate = ' <span class="text-secondary"><em>(you)</em></span>';
    var channelID = $channelID.content;
    var orientation = { alpha: 0, beta: 0, gamma: 0 };
    var offset = { alpha: 0, beta: 0, gamma: 0 };
    var socket;

    // redirect if client is mobile
    if(window.connectionType === 'mobile') {
        window.location.replace(window.location.origin + '/channel/mobile/' + channelID);
    }

    // setup socket handler
    var socketHandler = {

        joinChannel: function(data) {
            var connection = data.connection;

            if(connection.desktop !== null) {
                $desktopConnection.innerHTML = connection.desktop.name;
                if(socket.id === connection.desktop.id) $desktopConnection.innerHTML += youTemplate;
                desktopConnected = true;
            }

            if(connection.mobile !== null) {
                $mobileConnection.innerHTML = connection.mobile.name;
                if(socket.id === connection.mobile.id) $mobileConnection.innerHTML += youTemplate;
                mobileConnected = true;
            }
        },

        deviceOrientation: function(data) {
            orientation = data;
        },

        calibrateOrientation: function(data) {
            offset = data;
        },

        redirect: function() {
            window.location.replace(window.location.origin + '/'); 
        }

    };

    // initialize socket and listen
    socket = io();
    socket.emit('join-channel', { isMobile: false });
    socket.on('join-channel', socketHandler.joinChannel);
    socket.on('device-orientation', socketHandler.deviceOrientation);
    socket.on('calibrate-orientation', socketHandler.calibrateOrientation);
    socket.on('redirect', socketHandler.redirect);

    // setup delete channel button handler
    $btnDeleteChannel.onclick = function() {
        socket.emit('delete-channel');
    }



    // sketch
    new p5(function(sketch) {

        sketch.setup  = function() {
            sketch.createCanvas(600, 400, sketch.WEBGL);
    
        }

        sketch.draw = function() {
            sketch.background(255);
            sketch.rotateX(sketch.radians(orientation.beta - offset.beta));
            sketch.rotateY(sketch.radians(orientation.alpha - offset.alpha));
            sketch.rotateZ(sketch.radians(orientation.gamma - offset.gamma));
            sketch.box();
        }
    
    
    }, 'canvas');

})();







