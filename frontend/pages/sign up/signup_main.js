import fetchUser from "../../classes/UserApi.js";
import { handlePop } from "../../widgets/popup.js";
import { handleCHange, handleStrengthUI } from "./checkStrength.js";
import { emailValidiation, handleSignUpPopUps, phoneValidiation, signUpCheck, userNameValidiation } from "./SignUp.js";
export const confirm = document.querySelector( "#confirm" );
export const pass = document.querySelector( "#password" );
export const email = document.querySelector( "#email" );
export const userName = document.querySelector( "#name" );
export const phone = document.querySelector( "#phone" );


const inputs = document.querySelectorAll( "form input" );
const emptySignUoInputs = () => {
    userName.value = "";
    email.value = "";
    pass.value = "";
    confirm.value = "";
    phone.value = "";
};



const checkValidiation = async () => {
    let check = await signUpCheck();
    return check;

};


const handleSignUpForm = async ( e ) => {
    e.preventDefault();


    if ( await checkValidiation() ) {

        let user = {
            name: userName.value,
            email: email.value,
            password: pass.value,
            phone: phone.value
        };

        let { data } = await fetchUser.create( user );

        localStorage.setItem( "email", email.value );
        localStorage.setItem( "signupmessage", data.message );

        emptySignUoInputs();
        setTimeout( () => {

            window.location.href = "./../log in/login.html";
        }, 1000 );


    } else {

        let EmptyInps = [...inputs].filter( e => e.value == "" );

        if ( EmptyInps.length ) {
            handlePop( `${ EmptyInps[0].id } is required`, "danger" );
        } else {

            handleSignUpPopUps();
        }

    }

};


confirm.addEventListener( "keyup", handleCHange );
pass.addEventListener( "keyup", () => {
    handleCHange();
    handleStrengthUI();
} );


export const signUpForm = document.querySelector( "#sign-up-form" );

signUpForm.addEventListener( "submit", handleSignUpForm );
signUpForm.addEventListener( "keyup", ( e ) => {
    phoneValidiation( e );
    emailValidiation( e );
    userNameValidiation( e );

} );

phone.addEventListener( "keydown", ( e ) => {
    if ( e.key === "e" ) {
        e.preventDefault();
    }
}
);

// inputs.forEach( inp => {
//     inp.addEventListener( "blur", handleSignUpPopUps );
// }
// )

