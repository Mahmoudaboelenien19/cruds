

const passwordInp = document.querySelectorAll( ".password" );


document.querySelectorAll( ".eye" ).forEach( ( eye, i ) => {

    eye.addEventListener( "click", ( e ) => {
        if ( e.target.classList.contains( "fa-eye" ) ) {

            return passwordInp[i].type === "password" ? passwordInp[i].type = "text" : passwordInp[i].type = "password";
        }

    } );
}
);
