import general from "../../classes/general.js";
import { handlePop } from "../../widgets/popup.js";
import { passwordMatch, passWordStrength } from "./checkStrength.js";

let isUserValid = false;
let isEmailValid = false;
let isPhoneValid = false;


export let signUpCheck = async () => {

    if ( passWordStrength && passwordMatch && isEmailValid && isPhoneValid && isUserValid ) {
        return true;

    }
    return false;

};


export const userNameValidiation = ( e ) => {
    const userIconCont = document.querySelector( "#user-validate-icon" );
    const userX = document.querySelector( "#user-x" );
    const userCheck = document.querySelector( "#user-check" );
    if ( e.target.classList.contains( "user-inp" ) ) {
        let user = e.target.value;
        general.removeClass( userIconCont, "hide" );


        let pattern = /^[a-zA-Z]\w{5,20}/;
        if ( user.length == 0 ) {
            isUserValid = false;

            general.addClass( userIconCont, "hide" );
        }
        if ( pattern.test( user ) ) {
            isUserValid = true;


            general.removeClass( userCheck, "hide" );
            general.addClass( userX, "hide" );

        } else {
            isUserValid = false;

            general.removeClass( userX, "hide" );
            general.addClass( userCheck, "hide" );

        }
    }

};





export const phoneValidiation = ( e ) => {
    const phoneIconCont = document.querySelector( "#phone-validate-icon" );
    const phoneX = document.querySelector( "#phone-x" );
    const phoneCheck = document.querySelector( "#phone-check" );

    if ( e.target.classList.contains( "phone" ) ) {

        let phone = e.target.value;
        general.removeClass( phoneIconCont, "hide" );


        let pattern = /\d{9,}/;
        if ( phone.length == 0 ) {
            isPhoneValid = false;

            general.addClass( phoneIconCont, "hide" );
        }
        if ( pattern.test( phone ) ) {
            isPhoneValid = true;
            general.removeClass( phoneCheck, "hide" );
            general.addClass( phoneX, "hide" );

        } else {
            isPhoneValid = false;

            general.removeClass( phoneX, "hide" );
            general.addClass( phoneCheck, "hide" );

        }
    }

};





export const emailValidiation = ( e ) => {
    const emailIconCont = document.querySelector( "#email-validate-icon" );
    const emailX = document.querySelector( "#email-x" );
    const emailCheck = document.querySelector( "#email-check" );

    if ( e.target.classList.contains( "email" ) ) {

        let email = e.target.value;
        general.removeClass( emailIconCont, "hide" );


        let pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if ( email.length == 0 ) {
            isEmailValid = false;

            general.addClass( emailIconCont, "hide" );
        }
        if ( pattern.test( email ) ) {

            isEmailValid = true;
            general.removeClass( emailCheck, "hide" );
            general.addClass( emailX, "hide" );


        } else {
            isEmailValid = false;

            general.removeClass( emailX, "hide" );
            general.addClass( emailCheck, "hide" );

        }
    }

};



export const handleSignUpPopUps = () => {


    if ( !isUserValid ) {

        handlePop( "invalid username !", "danger" );

    }


    else if ( !isEmailValid ) {


        handlePop( "invalid email !", "danger" );

    }



    else if ( !isPhoneValid ) {

        handlePop( "invalid phone !", "danger" );
    }

    else if ( !passwordMatch ) {

        handlePop( "password doesn't match!", "danger" );

    }


    else if ( !passWordStrength ) {

        handlePop( "your password is weak !", "danger" );

    }
}



