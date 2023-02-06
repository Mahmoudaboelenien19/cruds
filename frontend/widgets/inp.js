const inputs = document.querySelectorAll( "input" );



const handleEmptyInp = ( e ) => {

    if ( e.target.value.length > 0 ) {

        e.target.nextElementSibling.classList.remove( "hide" );
        e.target.nextElementSibling.addEventListener( "click", ( ev ) => {

            if ( ev.target.classList.contains( "clear" ) ) {

                ev.target.classList.add( "hide" );
                e.target.value = "";

            }

        } );

    } else {

        e.target.nextElementSibling.classList.add( "hide" );

    }
};










inputs.forEach( inp => {

    inp.addEventListener( "keyup", handleEmptyInp );

} );