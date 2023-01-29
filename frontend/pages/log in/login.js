import { handlePop } from "../../widgets/popup.js";

const LogInForm = document.querySelector( "#log-form" );
const logInp = document.querySelector( "#log-email" );

const handleLogInForm = ( e ) => {
    e.preventDefault();
};


LogInForm.addEventListener( "click", handleLogInForm );

if ( localStorage.getItem( "isexist" ) ) {
    console.log( localStorage.getItem( "existedemail" ) );
    logInp.value = localStorage.getItem( "existedemail" );
    console.log( "isexist" );
    handlePop( localStorage.getItem( "isexist" ) );
    setTimeout( () => {
        localStorage.clear();
    }, 4000 );

}