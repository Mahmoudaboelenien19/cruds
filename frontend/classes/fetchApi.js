import { handlePop } from "../widgets/popup.js";

function getTokenFromCookie () {
    const cookie = document.cookie;
    console.log( { cookie } );
    const parts = cookie.split( ';' );
    for ( const part of parts ) {
        const [name, value] = part.split( '=' );
        if ( name.trim() === 'token' ) {
            return value;
        }
    }
    return null;
}


class FetchClass {

    constructor() {
        if ( FetchClass.instance ) {
            return FetchClass.instance;
        }
        Object.freeze( this );
        FetchClass.instance = this;
    }
    async get () {
        const res = await fetch( "/products" );
        const data = await res.json();
        return data;
    };



    async create ( product ) {
        const token = getTokenFromCookie();

        if ( token ) {


            let res = await fetch( "/product", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${ token }`
                },
                body: JSON.stringify( product )
            } );
            let data = await res.json();
            return data;
        } else {
            return null;
        }

    }


    async delete ( id ) {
        const token = getTokenFromCookie();
        if ( token ) {
            const data = await fetch( `/product/${ id }`, {
                method: "DELETE",
                headers: {

                    'Authorization': `Bearer ${ token }`
                }
            } );

            return data.json();
        } else {
            return null;
        }
    }


    async clear () {
        const token = getTokenFromCookie();
        if ( token ) {

            const data = await fetch( `/products`, {
                method: "DELETE"
                , headers: {

                    'Authorization': `Bearer ${ token }`
                }
            } );
            return data.json();
        } else {
            return null;
        }
    }

    async update ( product, id ) {
        const token = getTokenFromCookie();
        if ( token ) {


            const data = await fetch( `/product/${ id }`, {
                method: "PATCH",
                headers: {
                    'content-Type': 'application/json'
                    , 'Authorization': `Bearer ${ token }`
                },
                body: JSON.stringify( product )
            } );
            return await data.json();
        } else {
            return null;
        }
    };

}


let fetchProduct = new FetchClass();
export default fetchProduct;
