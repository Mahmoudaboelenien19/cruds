import fetchUser from "../../classes/UserApi.js";
import { handleCHange, handleStrengthUI } from "./checkStrength.js";
import { emailValidiation, phoneValidiation, signUpCheck, userNameValidiation } from "./SignUp.js";
export const confirm = document.querySelector( "#confirm" );
export const pass = document.querySelector( "#password" );
export const email = document.querySelector( "#email" );
export const userName = document.querySelector( "#name" );
export const phone = document.querySelector( "#phone" );

const emptySignUoInputs = () => {
    userName.value = "";
    email.value = "";
    pass.value = "";
    confirm.value = "";
    phone.value = "";
};



const checkValidiation = () => {
    // console.log( signUpCheck() );
    return signUpCheck() && [...document.querySelectorAll( ".inp" )].every( e => e.value !== "" );

};
console.log( signUpCheck() );

const handleSignUpForm = async ( e ) => {
    e.preventDefault();

    if ( checkValidiation() ) {

        let user = {
            name: userName.value,
            email: email.value,
            password: pass.value,
            phone: phone.value
        };

        let { data, status } = await fetchUser.create( user );
        console.log( data );

        localStorage.setItem( "existedemail", email.value );

        emptySignUoInputs();
        if ( status == 200 ) {
            console.log( "status 200" );
            localStorage.setItem( "iscreated", data.message );


        } else if ( status == 409 ) {

            setTimeout( () => {

                window.location.href = "./../log in/login.html";
                localStorage.setItem( "isexist", data.message );

            }, 1000 );
            setTimeout( () => {
                localStorage.removeItem( "existedemail" );
            }, 1200 );

        }
    }

};


confirm.addEventListener( "keyup", handleCHange );
pass.addEventListener( "keyup", () => {
    handleCHange();
    handleStrengthUI();
} );


const signUpForm = document.querySelector( "#sign-up-form" );

signUpForm.addEventListener( "submit", handleSignUpForm );
signUpForm.addEventListener( "keyup", ( e ) => {
    phoneValidiation( e );
    emailValidiation( e );
    userNameValidiation( e );

} );

// signUpForm.addEventListener( "change", signUpCheck );
phone.addEventListener( "keydown", ( e ) => {
    if ( e.key === "e" ) {
        e.preventDefault();
    }
}
);
