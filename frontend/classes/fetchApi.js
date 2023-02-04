
export const getRefreshTOken = () => {
    const cookie = document.cookie;
    const parts = cookie.split( ';' );



    for ( const part of parts ) {
        const [name, value] = part.split( '=' );


        if ( name.trim() === 'refresh token' ) {
            return value;
        }

    };
};



const generateNewToken = async () => {
    let refToken = getRefreshTOken();
    if ( refToken ) {

        let res = await fetch( "/user/auth/refresh", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify( { refToken } )
        } );
        let data = await res.json();
        console.log( { newToken: data } );
        return data;

    } else {
        console.log( "unautharized" );
    }
};




export const getTokenFromCookie = () => {
    const cookie = document.cookie;
    const parts = cookie.split( ';' );

    let user = null;
    let token = null;
    for ( const part of parts ) {
        const [name, value] = part.split( '=' );

        if ( name.trim() === 'token' ) {
            token = value;
        }
        if ( name.trim() === 'user' ) {
            user = value;
        }

    }
    return { user, token };
};


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
        const cookie = await generateNewToken();
        // console.log( cookie );
        if ( cookie ) {


            let res = await fetch( "/product", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${ cookie.token }`
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
        const cookie = await generateNewToken();
        if ( cookie ) {
            const data = await fetch( `/product/${ id }`, {
                method: "DELETE",
                headers: {

                    'Authorization': `Bearer ${ cookie.token }`
                }
            } );

            return data.json();
        } else {
            return null;
        }
    }


    async clear () {
        const cookie = await generateNewToken();
        if ( cookie ) {

            const data = await fetch( `/products`, {
                method: "DELETE"
                , headers: {

                    'Authorization': `Bearer ${ cookie.token }`
                }
            } );
            return data.json();
        } else {
            return null;
        }
    }

    async update ( product, id ) {
        const cookie = await generateNewToken();
        if ( cookie ) {


            const data = await fetch( `/product/${ id }`, {
                method: "PATCH",
                headers: {
                    'content-Type': 'application/json'
                    , 'Authorization': `Bearer ${ cookie.token }`
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
