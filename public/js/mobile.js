
var channelID = document.head.querySelector("[name=channelID]").content;
var lastData = {};

var socket = io();
socket.emit('join-channel', { channelID: channelID, isMobile: true });

socket.on('redirect', function() {
    window.location.replace(window.location.origin + '/'); 
})

window.addEventListener('deviceorientation', function(event) {
    var data = {
        a: event.alpha,
        b: event.beta,
        g: event.gamma
    }
    lastData = data;
    socket.emit('device-orientation', data);
}, true);

function calibrateRotation() {
    socket.emit('calibrate-orientation', lastData);
}