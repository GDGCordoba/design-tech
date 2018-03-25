$( document ).ready( () => {
    $( "[data-scroll]" ).click( function( e ) {
        e.preventDefault();

        $( "html, body" ).animate({
            scrollTop: $( "[data-section='" + $( this ).attr( 'data-scroll' ) + "']" ).offset().top - 64
        }, 1000 );
    });
});
