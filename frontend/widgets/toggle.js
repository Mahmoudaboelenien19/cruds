const moon = document.querySelector( "#moon" );
const sun = document.querySelector( "#sun" );
export const toggle = document.querySelector( ".toggle" );
const dot1 = document.querySelector( ".dot1" );
const dot2 = document.querySelector( ".dot2" );

// --main: rgb( 245, 240, 240 );
// --secondary: #161716;

console.log( localStorage.getItem( "mode" ) );
let isToggleCLicked = localStorage.getItem( "mode" ) || false;
export const hanleColors = () => {

    let clr1 = "rgb(245, 240, 240)";
    let clr2 = "#161716";
    if ( isToggleCLicked ) {

        document.documentElement.style.setProperty( "--main", clr2 );
        document.documentElement.style.setProperty( "--secondary", clr1 );
    } else {

        document.documentElement.style.setProperty( "--main", clr1 );
        document.documentElement.style.setProperty( "--secondary", clr2 );
    }
};


export const handleToggle = ( e ) => {
    if ( e.target.classList.contains( "fa-moon" ) ) {
        isToggleCLicked = !isToggleCLicked;
        localStorage.setItem( "mode", isToggleCLicked );
        hanleColors();

        document.querySelector( "#moon" ).classList.remove( "return" );
        sun.classList.remove( "dark-mode" );
        e.target.classList.add( "light-mode" );


        dot1.classList.add( "light-mode" );
        dot2.classList.add( "light-mode" );
        document.querySelectorAll( ".fa-star" ).forEach( e => {
            e.classList.add( "light-mode" );
        } );
        setTimeout( () => {
            e.target.classList.add( "hide" );
            sun.classList.remove( "hide" );
        }, 1500 );
    }


    if ( e.target.classList.contains( "sun" ) ) {
        isToggleCLicked = !isToggleCLicked;
        // localStorage.setItem( "mode", isToggleCLicked );

        hanleColors();

        setTimeout( () => {
            setTimeout( () => {
                document.querySelector( "#moon" ).classList.remove( "light-mode" );

                document.querySelector( "#moon" ).classList.remove( "hide" );
            }, 500 );
            e.target.classList.add( "hide" );
        }, 1500 );
        setTimeout( () => {
            dot1.classList.remove( "light-mode" );
            dot2.classList.remove( "light-mode" );
        }, 1000 );
        e.target.classList.add( "dark-mode" );
        document.querySelectorAll( ".fa-star" ).forEach( e => {
            e.classList.remove( "light-mode" );

        } );

    }


}



