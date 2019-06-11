window.addEventListener('load', function() {

    var $connectionType = document.querySelector('[name="connectionType"]');
    var $connectionTypeTexts = document.getElementsByClassName('connectionType');
    var csrf = document.querySelector('[name="csrf"]').content;

    // dont execute the script if the connection type is already set
    if($connectionType.content !== 'null') return;
    
    // set connection type to desktop if there is no deviceorientation event
    if(!('ondeviceorientation' in window)) {
        setConnectionType('desktop');
        return;
    }

    var handler = function(event) {

        // for devices that have no orientation, the event.alpha value is null.
        var connectionType = event.alpha === null ? 'desktop' : 'mobile';

        setConnectionType(connectionType);
        window.removeEventListener('deviceorientation', handler);
    }

    window.addEventListener('deviceorientation', handler);

    // setting connection type by removing and adding a new meta tag
    function setConnectionType(connectionType) {
        $connectionType.remove();

        var meta = document.createElement('meta');
        meta.name = 'connectionType';
        meta.content = connectionType;
        document.head.appendChild(meta);
        
        window.connectionType = connectionType;

        axios.post('/setconnectiontype', { 
            connectionType: connectionType,
            _csrf: csrf
        }).then(function() {
            for(var i in $connectionTypeTexts) {
                $connectionTypeTexts[i].innerHTML = connectionType;
            }
        });
    }

});