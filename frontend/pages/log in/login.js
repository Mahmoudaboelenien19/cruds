import fetchUser from "../../classes/UserApi.js";
import { handlePop } from "../../widgets/popup.js";

const LogInForm = document.querySelector( "#log-form" );
const logInp = document.querySelector( "#log-email" );

const handleLogInForm = ( e ) => {
    e.preventDefault();
};


LogInForm.addEventListener( "click", handleLogInForm );

if ( localStorage.getItem( "email" ) && localStorage.getItem( "signupmessage" ) ) {

    logInp.value = localStorage.getItem( "email" );
    handlePop( localStorage.getItem( "signupmessage" ) );
    setTimeout( () => {
        localStorage.clear();
    }, 1200 );

}

if ( localStorage.getItem( "logoutMsg" ) ) {

    handlePop( localStorage.getItem( "logoutMsg" ) );

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

            setTimeout( () => {

                localStorage.setItem( "log-message", res.message );

                window.location.href = "./../../index.html";
            }, 1000 );
        } else {
            handlePop( res.message, "danger" );
        }
    }
};






LogInForm.addEventListener( "click", handleLogIn )

