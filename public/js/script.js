
window.addEventListener('identifiedconnection', function() {

    // dom elements
    var $mobileConnection = document.getElementById('mobile-connection');
    var $desktopConnection = document.getElementById('desktop-connection');
    var $btnDeleteChannel = document.getElementById('delete-channel'); 
    var $btnCalibrateRotation = document.getElementById('calibrate-rotation');

    // vars
    var connectionType = document.head.querySelector('[name="connectionType"]').content;
    var csrf = document.head.querySelector('[name="csrf"]').content;

    var orientation = { alpha: 0, beta: 0, gamma: 0 };
    var offset = { alpha: 0, beta: 0, gamma: 0 };
    var socket;

    if(connectionType === 'null') {
        alert('connection type is not set');
        return;
    }

    // setup socket handler
    var socketHandler = {

        newConnection: function(data) {
            
            // update dom connection list
            if(connectionType === 'mobile' && data.connection.desktop) {
                $desktopConnection.innerHTML = data.connection.desktop.name;
            } else if(connectionType === 'desktop' && data.connection.mobile) {
                $mobileConnection.innerHTML = data.connection.mobile.name;
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
    socket.emit('join-channel');
    socket.on('new-connection', socketHandler.newConnection);
    socket.on('redirect', socketHandler.redirect);

    if(connectionType === 'desktop') {
        socket.on('device-orientation', socketHandler.deviceOrientation);
        socket.on('calibrate-orientation', socketHandler.calibrateOrientation);
    }
    
    if(connectionType === 'desktop') {
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

        // setup delete channel button handler
        $btnDeleteChannel.onclick = function() {
            socket.emit('delete-channel');
        }
    }

    if(connectionType === 'mobile') {

        // set calibrate rotation button handler
        $btnCalibrateRotation.onclick = function() {
            socket.emit('calibrate-orientation', orientation);
        }

        // add device orientation listener
        window.addEventListener('deviceorientation', function(event) {
            orientation = { alpha: event.alpha, beta: event.beta, gamma: event.gamma };
            socket.emit('device-orientation', orientation);
        });

    }

});