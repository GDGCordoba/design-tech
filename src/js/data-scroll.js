$( document ).ready( () => {
    $( "[data-scroll]" ).click( function( e ) {
        e.preventDefault();
        
        $( "body" ).animate({
            scrollTop: $( "[data-section='" + $( this ).attr( 'data-scroll' ) + "']" ).offset().top - 64
        }, 1000 );
    });
});
