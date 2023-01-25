const passwordInp = document.querySelector( ".password" );

document.querySelector( ".eye" ).addEventListener( "click", ( e ) => {
    if ( e.target.classList.contains( "fa-eye" ) ) {

        console.log( "entered" );
        return passwordInp.type === "password" ? passwordInp.type = "text" : passwordInp.type = "password";
    }

} );