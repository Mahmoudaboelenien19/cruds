
const popCont = document.querySelector( ".pop-cont" );


export const handlePop = ( content, type = "success" ) => {
    const span = `<span class="${ type } pop">
    ${ type == "success" ? '<i class="fa-solid fa-check-double"></i>' : '<i class="fa-solid fa-triangle-exclamation"></i>' }
    ${ content }</span>`;
    popCont.insertAdjacentHTML( "afterbegin", span );
    document.querySelectorAll( ".pop-cont .pop" ).forEach( e => {

        setTimeout( () => {
            e.remove();
        }, 4000 );

    } );
};


