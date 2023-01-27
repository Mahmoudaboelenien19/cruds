// import { ui } from "../../classes/UI.js";
import fetchUser from "../../classes/UserApi.js";
import { handleCHange, handleStrengthUI } from "./checkStrength.js";
// import { ui } from "./../../classes/UI.js";



export const confirm = document.querySelector( "#confirm" );
export const pass = document.querySelector( "#password" );
export const email = document.querySelector( "#email" );
export const userName = document.querySelector( "#name" );
export const phone = document.querySelector( "#phone" );


const emptySignUoInputs = () => {
    userName.value = "";
    email.value = "";
    pass.value = "";
    phone.value = "";
};



const checkValidiation = () => {
    return [...document.querySelectorAll( ".sign-up-inp" )].every( e => e.value !== "" );
};

const handleSignUpForm = async ( e ) => {
    e.preventDefault();
    if ( checkValidiation() ) {

        let user = {
            name: userName.value,
            email: email.value,
            password: pass.value,
            phone: phone.value
        };

        let data = await fetchUser.create( user );
        console.log( data );
        emptySignUoInputs();
        if ( data.message ) {
            console.log( "success" );
        }
        // ui.handlePop( data.message );
    }

};
confirm.addEventListener( "keyup", handleCHange );
pass.addEventListener( "keyup", () => {
    handleCHange();
    handleStrengthUI();
} );


const signUpForm = document.querySelector( "#sign-up-form" );

signUpForm.addEventListener( "click", handleSignUpForm );
// const link = document.querySelector( "#log-link" );
// link.addEventListener( "click", () => {
//     console.log( "sign up" );
//     open( link.href, "_self" );
// } );


