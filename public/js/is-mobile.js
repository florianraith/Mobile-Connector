(function() {

    // dom elements
    $connectionType = document.getElementById('connection-type');
    $hidden = document.querySelector('[name="isMobile"]');

    // set global is mobile variable
    window.isMobile = /Mobi|Android/i.test(navigator.userAgent);

    if($connectionType && window.isMobile) {
        $connectionType.innerHTML = ' (as mobile)';
    }

    if($hidden) {
        $hidden.value = window.isMobile.toString();
    }
})();
