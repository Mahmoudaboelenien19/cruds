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



// if ( localStorage.getItem( "iscreated" ) ) {
//     handlePop( localStorage.getItem( "iscreated" ) );
//     setTimeout( () => {
//         localStorage.remove( iscreated );
//     }, 4000 );

// }
