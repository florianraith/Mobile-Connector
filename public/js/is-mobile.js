(function() {

    // dom elements
    $connectionType = document.getElementById('connection-type');
    $hidden = document.querySelector('[name="isMobile"]');
    $channels = document.getElementsByClassName('channel-link');

    // set global is mobile variable
    window.isMobile = /Mobi|Android/i.test(navigator.userAgent);

    if($connectionType && window.isMobile) {
        $connectionType.innerHTML = ' (as mobile)';
    }

    if($hidden) {
        $hidden.value = window.isMobile.toString();
    }

    if(window.isMobile) {
        for(var i = 0; i < $channels.length; i++) {
            var channel = $channels[i];
            channel.href = channel.href.replace('desktop', 'mobile').replace('false', 'true');
        }
    }
})();
