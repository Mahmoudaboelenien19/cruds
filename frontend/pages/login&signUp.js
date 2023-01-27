

const passwordInp = document.querySelectorAll( ".password" );
const link = document.querySelector( "#log-link" );


document.querySelectorAll( ".eye" ).forEach( ( eye, i ) => {

    eye.addEventListener( "click", ( e ) => {
        if ( e.target.classList.contains( "fa-eye" ) ) {

            return passwordInp[i].type === "password" ? passwordInp[i].type = "text" : passwordInp[i].type = "password";
            // return passwordInp.forEach( ele => ele.type === "password" ? ele.type = "text" : ele.type = "password" );
        }

    } );
}
);
link.addEventListener( "click", () => {

    open( link.href, "_self" );
} );