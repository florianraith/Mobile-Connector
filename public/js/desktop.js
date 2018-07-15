var $mobileConnection = document.getElementById('mobile-connection');

var templateConnection = 'connection.desktop: %desktop%<br>connection.mobile: %mobile%'

var channelID = document.head.querySelector("[name=channelID]").content;
var isMobile = /Mobi|Android/i.test(navigator.userAgent);

var ralpha = 0;
var rbeta = 0;
var rgamma = 0;

var users = [];
var normData = {a: 0, b: 0, g: 0};

if(isMobile) {
    window.location.replace(window.location.origin + '/channel/mobile/' + channelID);
} else {

    var socket = io();
    socket.emit('join-channel', { isMobile: false });
    
    socket.on('redirect', function() {
        window.location.replace(window.location.origin + '/'); 
    })
    
    socket.on('join-channel', function(data) {
        users.push(data.user);

        var connection = data.connection;
        $mobileConnection.innerHTML = templateConnection
            .replace('%desktop%', connection.desktop ? connection.desktop.name : null)
            .replace('%mobile%', connection.mobile ? connection.mobile.name : null);
    });
    
    socket.on('device-orientation', function(data) {
        ralpha = data.a;
        rbeta = data.b;
        rgamma = data.g;
    });

    socket.on('calibrate-orientation', function(data) {
        normData = data;
    });
    
    
    function deleteChannel() {
        socket.emit('delete-channel');
    }

}

function setup() {
    createCanvas(600, 400, WEBGL);
}

function draw() {
    background(255);
    rotateX(radians(rbeta - normData.b));
    rotateY(radians(ralpha - normData.a));
    rotateZ(radians(rgamma - normData.g));
    box();
}

