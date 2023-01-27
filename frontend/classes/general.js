

class General {

    constructor() {
        if ( General.instance ) {
            return General.instance;
        }
        Object.freeze( this );
        General.instance = this;
    }

    removeClass ( element, cls ) {
        element.classList.remove( cls );
    }

    addClass ( element, cls ) {
        element.classList.add( cls );
    }

}

const general = new General();

export default general;