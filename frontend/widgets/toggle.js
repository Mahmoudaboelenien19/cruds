const sun = document.querySelector( "#sun" );
export const toggle = document.querySelector( ".toggle" );



let theme = localStorage.getItem( "mode" ) || "light";


let clr1 = "rgb(245, 240, 240)";
let clr2 = "#161716";


const handleLightMode = () => {
    const dots = document.querySelectorAll( ".dot" );
    const stars = document.querySelectorAll( ".fa-star" );
    const moon = document.querySelector( "#moon" );



    document.documentElement.style.setProperty( "--main", clr1 );
    document.documentElement.style.setProperty( "--secondary", clr2 );

    dots.forEach( dot => {
        dot.classList.add( "hide" );
    } );

    sun.classList.remove( "dark-mode" );
    moon.classList.add( "light-mode" );



    stars.forEach( e => {
        e.classList.add( "light-mode", "hide" );
    } );

    setTimeout( () => {
        moon.classList.add( "hide" );
        sun.classList.remove( "hide" );
    }, 1500 );
};



const handleDarkMode = () => {

    document.documentElement.style.setProperty( "--main", clr2 );
    document.documentElement.style.setProperty( "--secondary", clr1 );

    const dots = document.querySelectorAll( ".dot" );
    const stars = document.querySelectorAll( ".fa-star" );
    const moon = document.querySelector( "#moon" );

    setTimeout( () => {
        moon.classList.remove( "light-mode", "hide" );

    }, 500 );

    setTimeout( () => {

        sun.classList.add( "hide" );
        dots.forEach( dot => {
            dot.classList.remove( "hide" );
        } );
    }, 1500 );


    sun.classList.add( "dark-mode" );
    stars.forEach( e => {
        e.classList.remove( "light-mode" );
        e.classList.remove( "hide" );


    } );
};


export const handleToggle = ( e ) => {

    if ( e.target.classList.contains( "fa-moon" ) ) {
        theme = "light";
        handleLightMode();
        localStorage.setItem( "mode", "light" );
    }


    if ( e.target.classList.contains( "sun" ) ) {
        theme = "dark";
        handleDarkMode();
        localStorage.setItem( "mode", "dark" );
    }


};






export const handleMode = () => {
    if ( theme === "dark" ) {
        handleDarkMode();
    } else {
        handleLightMode();
    }

};