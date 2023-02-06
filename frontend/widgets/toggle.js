// const moon = document.querySelector( "#moon" );
const sun = document.querySelector( "#sun" );
export const toggle = document.querySelector( ".toggle" );



let isClicked = false;
let darkMode = localStorage.getItem( "mode" ) || false;

console.log( { darkMode } );

let clr1 = "rgb(245, 240, 240)";
let clr2 = "#161716";



// export const hanleColors = () => {

//     // let clr1 = "rgb(245, 240, 240)";
//     // let clr2 = "#161716";

//     if ( isClicked ) {
//         document.documentElement.style.setProperty( "--main", clr2 );
//         document.documentElement.style.setProperty( "--secondary", clr1 );
//     } else {
//         document.documentElement.style.setProperty( "--main", clr1 );
//         document.documentElement.style.setProperty( "--secondary", clr2 );

//     }

// };




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
        isClicked = !isClicked;
        darkMode = false;
        // hanleColors();
        handleLightMode();
        localStorage.setItem( "mode", darkMode );
        // dots.forEach( dot => {
        //     dot.classList.add( "hide" );
        // } );

        // sun.classList.remove( "dark-mode" );
        // moon.classList.add( "light-mode" );



        // stars.forEach( e => {
        //     e.classList.add( "light-mode", "hide" );
        // } );

        // setTimeout( () => {
        //     moon.classList.add( "hide" );
        //     sun.classList.remove( "hide" );
        // }, 1500 );
    }


    if ( e.target.classList.contains( "sun" ) ) {
        isClicked = !isClicked;
        darkMode = true;
        // hanleColors();
        handleDarkMode();
        localStorage.setItem( "mode", darkMode );


        // handleLightMode();
        // setTimeout( () => {
        //     moon.classList.remove( "light-mode", "hide" );

        // }, 500 );

        // setTimeout( () => {

        //     sun.classList.add( "hide" );
        //     dots.forEach( dot => {
        //         dot.classList.remove( "hide" );
        //     } );
        // }, 1500 );


        // sun.classList.add( "dark-mode" );
        // stars.forEach( e => {
        //     e.classList.remove( "light-mode" );
        //     e.classList.remove( "hide" );


        // } );

    }


};






export const handleMode = () => {
    if ( darkMode ) {
        handleDarkMode();
    } else {
        handleLightMode();
    }

};