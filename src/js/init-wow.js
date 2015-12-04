$( document ).ready( () => {
    $( '.wow' ).each( function() {
        if( isOutsideView( this ) ) {
            $( this ).removeClass( 'wow' );
        }
    });

    new WOW({
        mobile: false
    }).init();
});


function isOutsideView( elem ) {
    var $elem = $( elem );
    var $window = $( window );

    var docViewTop = $window.scrollTop();
    var elemTop = $elem.offset().top;

    return elemTop < docViewTop;
}
