import general from "../../classes/general.js";
import { pass, confirm } from "./signup_main.js";

export let chechStrength = ( str ) => {
    let strength = 0;
    let containsNum = false;
    let containsCaptial = false;
    let containsSpecial = false;

    if ( /[0-9]/.test( str ) ) {
        containsNum = true;
        strength++;
    }
    if ( /[a-z]/.test( str ) ) {
        strength++;
    }

    if ( /[A-Z]/.test( str ) ) {
        containsCaptial = true;

        strength++;
    }
    if ( /[^0-9a-zA-z]/.test( str ) ) {
        containsSpecial = true;
        strength++;
    }
    if ( str.length >= 4 ) {
        strength++;
    }
    if ( str.length >= 10 ) {
        strength++;
    }

    if ( containsCaptial && containsNum && containsSpecial ) {
        strength++;
    }

    return strength;
};

const stregnthDescription = document.querySelector( ".strength-description" );

export const handleStrengthUI = () => {

    const spans = document.querySelectorAll( "#strength span" );
    const stregnthCont = document.querySelector( "#strength-cont" );


    let password = pass.value;
    let stregnth = chechStrength( password );

    if ( stregnth == 0 ) {
        spans.forEach( span => span.className = "" );
        general.addClass( stregnthCont, "hide" );
    }
    else if ( stregnth <= 3 ) {
        general.removeClass( stregnthCont, "hide" );
        spans.forEach( span => span.className = "" );

        general.addClass( spans[0], "weak" );

        stregnthDescription.className = "";
        stregnthDescription.innerHTML = "weak";
        general.addClass( stregnthDescription, "weak" );

    } else if ( stregnth <= 6 ) {
        spans.forEach( span => span.className = "" );
        general.addClass( spans[0], "medium" );
        general.addClass( spans[1], "medium" );

        stregnthDescription.className = "";
        stregnthDescription.innerHTML = "medium";
        general.addClass( stregnthDescription, "medium" );

    } else {
        spans.forEach( span => span.className = "" );
        spans.forEach( span => span.classList.add( "strong" ) );

        stregnthDescription.innerHTML = "strong";
        stregnthDescription.className = "";
        general.addClass( stregnthDescription, "strong" );
    }
};






export const handleCHange = () => {
    const passWrong = document.querySelector( ".fa-x" );
    const passCorrect = document.querySelector( ".fa-check" );

    if ( pass.value.length == 0 ) {
        general.addClass( passCorrect, "hide" );
        general.addClass( passWrong, "hide" );
    }

    else {
        if ( confirm.value === pass.value ) {

            general.addClass( passWrong, "hide" );
            general.removeClass( passCorrect, "hide" );


        } else {

            general.removeClass( passWrong, "hide" );
            general.addClass( passCorrect, "hide" );

        }
    }

};