import fetchUser from "../../classes/UserApi.js";
import { handlePop } from "../../widgets/popup.js";

const LogInForm = document.querySelector( ".content #log-form" );
const logInp = document.querySelector( "#log-email" );

const handleLogInForm = ( e ) => {
    e.preventDefault();
};


LogInForm.addEventListener( "click", handleLogInForm );

if ( localStorage.getItem( "email" ) && localStorage.getItem( "signupmessage" ) ) {

    logInp.value = localStorage.getItem( "email" );
    handlePop( localStorage.getItem( "signupmessage" ) );
    setTimeout( () => {
        localStorage.removeItem( "signupmessage" );
    }, 1200 );

}

if ( localStorage.getItem( "logoutMsg" ) ) {

    handlePop( localStorage.getItem( "logoutMsg" ) );
    setTimeout( () => {
        localStorage.removeItem( "logoutMsg" );
    }, 1000 );

}


const handleLogIn = async ( e ) => {
    e.preventDefault();
    if ( e.target.classList.contains( "submit" ) ) {


        const logEmail = document.querySelector( "#log-email" ).value;
        const logPass = document.querySelector( "#log-password" ).value;
        const logInData = {
            email: logEmail,
            password: logPass
        };


        let res = await fetchUser.authenticate( logInData );
        if ( res.token ) {

            localStorage.setItem( "log-message", res.message );
            localStorage.setItem( "email", res.email );
            setTimeout( () => {
                window.location.href = "./../../index.html";
            }, 1000 );

        } else {
            handlePop( res.message, "danger" );
        }
    }
};


const link = document.querySelector( "#log-link" );
link.addEventListener( "click", () => {

    open( link.href, "_self" );
} );



LogInForm.addEventListener( "click", handleLogIn )

