(function() {
    window.isMobile = /Mobi|Android/i.test(navigator.userAgent);

    $hidden = document.querySelector('[name="isMobile"]');
    if($hidden) {
        $hidden.value = window.isMobile.toString();
    }
})();
