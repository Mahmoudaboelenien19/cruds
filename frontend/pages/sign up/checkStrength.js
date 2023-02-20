import general from "../../classes/general.js";
// import { pass, confirm } from "./signup_main.js";



export let passWordStrength = false;
export let passwordMatch = false;

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
        strength = +2;
    }

    return strength;
};

const stregnthDescription = document.querySelector( ".strength-description" );

export const handleStrengthUI = () => {

    const spans = document.querySelectorAll( "#strength span" );
    const stregnthCont = document.querySelector( "#strength-cont" );

    const pass = document.querySelector( "#password" );


    let password = pass.value;
    let stregnth = chechStrength( password );

    pass.classList.remove( "weak", "medium", "strong" );
    spans.forEach( span => span.className = "" );
    stregnthDescription.className = "";

    if ( stregnth == 0 ) {
        // spans.forEach( span => span.className = "" );
        general.addClass( stregnthCont, "hide" );
        passWordStrength = false;
    }
    else if ( stregnth <= 3 ) {
        passWordStrength = false;
        general.removeClass( stregnthCont, "hide" );
        general.addClass( pass, "weak" );

        // spans.forEach( span => span.className = "" );

        general.addClass( spans[0], "weak" );

        // stregnthDescription.className = "";
        stregnthDescription.innerHTML = "weak";
        general.addClass( stregnthDescription, "weak" );

    } else if ( stregnth <= 5 ) {
        passWordStrength = true;

        spans.forEach( span => span.className = "" );
        general.addClass( spans[0], "medium" );
        general.addClass( spans[1], "medium" );
        general.addClass( pass, "medium" );

        // stregnthDescription.className = "";
        stregnthDescription.innerHTML = "medium";
        general.addClass( stregnthDescription, "medium" );

    } else {
        // spans.forEach( span => span.className = "" );
        spans.forEach( span => span.classList.add( "strong" ) );

        stregnthDescription.innerHTML = "strong";
        // stregnthDescription.className = "";
        general.addClass( stregnthDescription, "strong" );

        general.addClass( pass, "strong" );

    }
};








export const handleCHange = () => {
    const passWrong = document.querySelector( "#confirm-x" );
    const passCorrect = document.querySelector( "#confirm-check" );

    const confirm = document.querySelector( "#confirm" );
    const pass = document.querySelector( "#password" );
    if ( pass.value.length == 0 ) {
        passwordMatch = false;

        general.addClass( passCorrect, "hide" );
        general.addClass( passWrong, "hide" );
    }

    else {
        if ( confirm.value === pass.value ) {

            general.addClass( passWrong, "hide" );
            general.removeClass( passCorrect, "hide" );
            passwordMatch = true;

        } else {
            passwordMatch = false;

            general.removeClass( passWrong, "hide" );
            general.addClass( passCorrect, "hide" );

        }
    }
}


