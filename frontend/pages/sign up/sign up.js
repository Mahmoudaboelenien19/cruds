
let chechStrength = ( str ) => {
    let strength = 0;
    let containsNum = false;
    let containsCaptial = false;
    let containsSpecial = false;

    let bad = ["1234", "password"];
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
let spans = document.querySelectorAll( "#strength span" );
const stregnthSpan = document.querySelector( ".strength-span" );
const stregnthP = document.querySelector( ".strength-p" );

document.querySelector( ".password" ).addEventListener( "keyup", () => {
    let pass = document.querySelector( ".password" ).value;
    let stregnth = chechStrength( pass );
    if ( stregnth == 0 ) {
        spans.forEach( span => span.className = "" );
        stregnthP.classList.add( "hide" );
    }
    else if ( stregnth <= 3 ) {
        stregnthP.classList.remove( "hide" );

        spans.forEach( span => span.className = "" );
        spans[0].classList.add( "weak" );


        stregnthSpan.className = "";
        stregnthSpan.innerHTML = "weak";
        stregnthSpan.classList.add( "weak" );
    } else if ( stregnth <= 6 ) {
        spans.forEach( span => span.className = "" );
        spans[0].classList.add( "medium" );
        spans[1].classList.add( "medium" );
        stregnthSpan.className = "";

        stregnthSpan.innerHTML = "medium";
        stregnthSpan.classList.add( "medium" );
    } else {
        spans.forEach( span => span.className = "" );
        spans.forEach( span => {
            span.classList.add( "strong" );

        } );
        stregnthSpan.innerHTML = "strong";
        stregnthSpan.className = "";
        stregnthSpan.classList.add( "strong" );
    }
} );